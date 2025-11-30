import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';



export const runtime = 'edge'; 

export async function POST(req: Request) {
    try {
         const prompt = `
      Generate 3 friendly open-ended questions separated by '||'.
      Avoid sensitive topics.
    `;

        const result = streamText({
            model: openai('gpt-4o-mini'),
            prompt,
            maxOutputTokens: 200,
            
        });

        // Stream back the text in real time 
        return result.toTextStreamResponse();
             

    } catch (error) {
  console.error("Error registering user:", error);
  return Response.json(
    {
      success: false,
      message: "Error registering user",
    },
    { status: 500 }
  );
}

}