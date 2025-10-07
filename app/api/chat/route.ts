import { NextRequest, NextResponse } from 'next/server';

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
    if (!groqApiKey) {
      console.log('No API key found');
      return NextResponse.json(
        { error: 'GROQ_API_KEY not configured' },
        { status: 500 }
      );
    }

    const systemPrompt = `You are an AI assistant for Miles Waite's portfolio website.

ABOUT MILES:
- Certified by Santa Fe Institute of Complex Science
- Expert in complex, adaptive systems
- 20+ years experience designing, implementing & testing large-scale real-time systems
- Specializes in automating company-wide processes
- Focus areas: Robust, Antifragile, Emergent systems
- Tech stack: Next.js, Tailwind CSS, Three.js, TypeScript, Vercel

Answer questions about Miles's work, expertise, and background professionally and accurately. Be helpful, concise, and knowledgeable.`;

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

    return NextResponse.json({ message: aiMessage });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
