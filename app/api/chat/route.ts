import { NextRequest, NextResponse } from 'next/server';
import { searchKnowledge, limitContextSize, isPortfolioRelated, validateContextQuality } from '@/lib/search';
import { milesKnowledge } from '@/data/knowledge-base';
import { trackServerEvent } from '@/lib/posthog';

export async function POST(request: NextRequest) {
  try {
    console.log('Chat API called');
    const { messages } = await request.json();
    console.log('Messages received:', messages);

    if (!messages || !Array.isArray(messages)) {
      console.log('Invalid messages format');
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    console.log('API Key exists:', !!groqApiKey);
    console.log('API Key value:', groqApiKey ? groqApiKey.substring(0, 10) + '...' : 'null');
    console.log('All env vars:', Object.keys(process.env).filter(key => key.includes('GROQ') || key.includes('AXIOM')));
    if (!groqApiKey) {
      console.log('No API key found');
      return NextResponse.json(
        { error: 'GROQ_API_KEY not configured' },
        { status: 500 }
      );
    }

    // Get the last user message
    const lastUserMessage = messages[messages.length - 1]?.content;
    
    // Log to Axiom (async - won't slow down response)
    if (process.env.AXIOM_TOKEN && process.env.AXIOM_DATASET) {
      console.log('Logging to Axiom:', process.env.AXIOM_DATASET);
      fetch(`https://api.axiom.co/v1/datasets/${process.env.AXIOM_DATASET}/ingest`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.AXIOM_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([{
          _time: new Date().toISOString(),
          page: 'unknown',
          project: 'none',
          question: lastUserMessage,
          type: 'chatbot_question'
        }])
      }).then(response => {
        console.log('Axiom response status:', response.status);
        return response.text();
      }).then(data => {
        console.log('Axiom response:', data);
      }).catch(err => console.error('Axiom logging error:', err));
    } else {
      console.log('Axiom logging skipped - missing env vars:', {
        hasToken: !!process.env.AXIOM_TOKEN,
        hasDataset: !!process.env.AXIOM_DATASET
      });
    }
    
    // Track chat interaction
    trackServerEvent('chat_message', {
      message_length: lastUserMessage.length,
      session_length: messages.length,
    });
    
    // OFF-TOPIC DETECTION: Check if query is portfolio-related
    const isPortfolioQuery = isPortfolioRelated(lastUserMessage);
    
    let context;
    let contextLimiterResult;
    
    if (!isPortfolioQuery) {
      // Create empty context for off-topic queries
      context = {
        bio: milesKnowledge.bio,
        techStack: milesKnowledge.techStack,
        projects: [],
        expertise: [],
        philosophy: milesKnowledge.philosophy,
        musicInspirations: [],
        complexSystemsTheorists: [],
        emergenceConcepts: [],
        relevanceScore: 0,
        fallbackStrategy: 'none' as const
      };
      contextLimiterResult = {
        context,
        wasTruncated: false,
        originalCount: 0,
        finalCount: 0
      };
      
      // Track off-topic query detection
      trackServerEvent('off_topic_query_detected', {
        query: lastUserMessage.substring(0, 100), // First 100 chars for privacy
      });
    } else {
      // SEARCH for relevant context using RAG
      const searchResult = searchKnowledge(lastUserMessage);
      
      // VALIDATE context quality before processing
      const qualityValidation = validateContextQuality(searchResult);
      
      // Track quality issues if validation fails
      if (!qualityValidation.valid) {
        trackServerEvent('context_quality_issue', {
          issue: qualityValidation.issue,
          action: qualityValidation.action,
          query: lastUserMessage.substring(0, 100), // First 100 chars for privacy
        });
        
        // TODO: Future enhancement - use validation.action for automated responses
        // Example: if (qualityValidation.action === 'use_fallback') { /* trigger fallback */ }
        // Example: if (qualityValidation.action === 'limit_context') { /* apply stricter limits */ }
      }

      // ANALYTICS: Track RAG retrieval summary for every query
      // Fires: After context retrieval, before any processing
      trackServerEvent('rag_retrieval_summary', {
        projects_count: searchResult.projects.length,
        expertise_count: searchResult.expertise.length,
        music_count: searchResult.musicInspirations.length,
        keywords_count: lastUserMessage.split(/\s+/).filter((word: string) => word.length > 2).length,
        query_length: lastUserMessage.length,
      });

      // ANALYTICS: Track empty results when no entities match
      // Fires: When initial search returns zero results across all categories
      const totalEntities = searchResult.projects.length + 
                           searchResult.expertise.length + 
                           searchResult.musicInspirations.length + 
                           searchResult.complexSystemsTheorists.length + 
                           searchResult.emergenceConcepts.length;
      
      if (totalEntities === 0) {
        trackServerEvent('rag_empty_results', {
          query: lastUserMessage.substring(0, 100), // First 100 chars for privacy
          keywords_extracted: lastUserMessage.split(/\s+/).filter((word: string) => word.length > 2),
        });
      }
      
      // LIMIT context size to prevent token limit exceeded errors
      contextLimiterResult = limitContextSize(searchResult, { maxEntities: 15 });
      context = contextLimiterResult.context;
    }
    
    // BUILD enhanced system prompt with relevant context
    let systemPrompt = `You are an AI assistant for Miles Waite's portfolio website.

ABOUT MILES:
${context.bio}

TECH STACK:
Frontend: ${context.techStack.frontend.join(', ')}
Backend: ${context.techStack.backend.join(', ')}
Deployment: ${context.techStack.deployment.join(', ')}
Specialties: ${context.techStack.specialties.join(', ')}
`;

    // Add off-topic query note if applicable
    if (!isPortfolioQuery) {
      systemPrompt += `\n\nNOTE: This query seems off-topic. Politely guide conversation back to portfolio work.\n`;
    }

    // Add fallback strategy note to system prompt if applicable
    if (context.fallbackStrategy !== 'none') {
      const fallbackNote = context.fallbackStrategy === 'broader_search' 
        ? 'Note: Using broader search strategy due to limited initial results.'
        : 'Note: Using comprehensive fallback strategy - returning all available content due to no specific matches found.';
      systemPrompt += `\n\n${fallbackNote}\n`;
    }

    // Add context truncation note if applicable
    if (contextLimiterResult.wasTruncated) {
      systemPrompt += `\n\nNote: Context has been optimized for token efficiency (${contextLimiterResult.originalCount} → ${contextLimiterResult.finalCount} entities).\n`;
    }

    // Add relevant projects if found
    if (context.projects.length > 0) {
      systemPrompt += `\n\nRELEVANT PROJECTS:\n`;
      context.projects.forEach(project => {
        systemPrompt += `
${project.title}:
- Description: ${project.description}
- Technologies: ${project.technologies.join(', ')}
- Challenge: ${project.challenge}
- Solution: ${project.solution}
`;
      });
      
      // Track which projects are being discussed
      trackServerEvent('chat_project_discussion', {
        projects_count: context.projects.length,
        query: lastUserMessage.substring(0, 100) // First 100 chars for privacy
      });
    }
    
    // Add relevant expertise if found
    if (context.expertise.length > 0) {
      systemPrompt += `\n\nRELEVANT EXPERTISE:\n`;
      context.expertise.forEach(exp => {
        systemPrompt += `
${exp.area}:
${exp.description}
Examples: ${exp.examples.join(', ')}
`;
      });
      
      // Track which expertise areas are being discussed
      trackServerEvent('chat_expertise_discussion', {
        expertise_count: context.expertise.length,
        query: lastUserMessage.substring(0, 100)
      });
    }
    
    // Add relevant complex systems theorists if found
    if (context.complexSystemsTheorists.length > 0) {
      systemPrompt += `\n\nRELEVANT COMPLEX SYSTEMS THEORISTS:\n`;
      context.complexSystemsTheorists.forEach(theorist => {
        systemPrompt += `
${theorist.name}:
${theorist.description}
Key Contributions: ${theorist.keyContributions.join(', ')}
Institutions: ${theorist.institutions.join(', ')}
Publications: ${theorist.publications.join(', ')}
Relevance to Miles's work: ${theorist.relevance}
`;
      });
      
      // Track which theorists are being discussed
      trackServerEvent('chat_theorist_discussion', {
        theorists_count: context.complexSystemsTheorists.length,
        query: lastUserMessage.substring(0, 100)
      });
    }
    
    // Add relevant emergence concepts if found
    if (context.emergenceConcepts.length > 0) {
      systemPrompt += `\n\nRELEVANT EMERGENCE CONCEPTS:\n`;
      context.emergenceConcepts.forEach(concept => {
        systemPrompt += `
${concept.name}:
${concept.description}
Types: ${concept.types.join(', ')}
Examples: ${concept.examples.join(', ')}
Characteristics: ${concept.characteristics.join(', ')}
Relevance to Miles's work: ${concept.relevance}
`;
      });
      
      // Track which emergence concepts are being discussed
      trackServerEvent('chat_emergence_discussion', {
        emergence_concepts_count: context.emergenceConcepts.length,
        query: lastUserMessage.substring(0, 100)
      });
    }
    
    // Add philosophy
    systemPrompt += `\n\nPHILOSOPHY & APPROACH:
${context.philosophy.approach}

Key Principles:
${context.philosophy.principles.map(p => `- ${p}`).join('\n')}
`;

    systemPrompt += `\n\nAnswer questions using the specific information provided above. Be conversational, helpful, and reference actual projects and expertise when relevant. Keep responses concise but informative.`;

    console.log('Making request to Groq API...');
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    console.log('Groq API response status:', response.status);
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Groq API error:', errorData);
      return NextResponse.json(
        { error: `Failed to get response from AI: ${response.status} ${errorData}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content;

    if (!aiMessage) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      );
    }

    // ANALYTICS: Track fallback strategy if used
    // Fires: When fallback strategies are activated (broader_search or return_all)
    if (context.fallbackStrategy !== 'none') {
      trackServerEvent('rag_fallback_triggered', {
        fallback_type: context.fallbackStrategy,
        original_query: lastUserMessage.substring(0, 100), // First 100 chars for privacy
      });
    }

    // ANALYTICS: Track context size warning when context exceeds threshold
    // Fires: When context size exceeds the limit and gets truncated
    if (contextLimiterResult.wasTruncated) {
      trackServerEvent('context_size_warning', {
        total_entities: contextLimiterResult.originalCount,
        truncated: true,
        final_count: contextLimiterResult.finalCount,
        max_entities: 15,
        query: lastUserMessage.substring(0, 100), // First 100 chars for privacy
      });
    }

    // Track successful response
    trackServerEvent('chat_response_success', {
      response_length: aiMessage.length,
      context_relevance: context.relevanceScore,
      projects_found: context.projects.length,
      expertise_found: context.expertise.length,
      theorists_found: context.complexSystemsTheorists.length,
      emergence_concepts_found: context.emergenceConcepts.length,
      fallback_strategy: context.fallbackStrategy
    });

    return NextResponse.json({ message: aiMessage });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Track errors
    trackServerEvent('chat_error', {
      error_type: error instanceof Error ? error.message : 'unknown',
    });
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
