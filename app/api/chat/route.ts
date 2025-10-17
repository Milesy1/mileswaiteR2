import { NextRequest, NextResponse } from 'next/server';
import { searchKnowledge } from '@/lib/search';
import { track } from '@vercel/analytics/server';

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
    track('chat_message', {
      message_length: lastUserMessage.length,
      session_length: messages.length,
      timestamp: new Date().toISOString()
    });
    
    // SEARCH for relevant context using RAG
    const context = searchKnowledge(lastUserMessage);
    
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
      track('chat_project_discussion', {
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
      track('chat_expertise_discussion', {
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
      track('chat_theorist_discussion', {
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
      track('chat_emergence_discussion', {
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

    // Track successful response
    track('chat_response_success', {
      response_length: aiMessage.length,
      context_relevance: context.relevanceScore,
      projects_found: context.projects.length,
      expertise_found: context.expertise.length,
      theorists_found: context.complexSystemsTheorists.length,
      emergence_concepts_found: context.emergenceConcepts.length
    });

    return NextResponse.json({ message: aiMessage });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Track errors
    track('chat_error', {
      error_type: error instanceof Error ? error.message : 'unknown',
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
