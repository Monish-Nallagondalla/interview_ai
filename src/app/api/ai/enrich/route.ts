import { SYSTEM_PROMPTS } from "@/lib/prompts";

export async function POST(request: Request) {
  const { messages, resumeText } = await request.json();

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ message: "API key not configured. The enrichment conversation will use fallback responses." }, { status: 200 });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.7,
        max_tokens: 500,
        messages: [
          { role: "system", content: SYSTEM_PROMPTS.enrichment + `\n\nCandidate's resume:\n${resumeText}` },
          ...messages.map((m: { role: string; content: string }) => ({ role: m.role, content: m.content })),
        ],
      }),
    });

    const data = await response.json();
    return Response.json({ message: data.choices[0].message.content });
  } catch {
    return Response.json({ message: "Could not reach AI service. Please try again." }, { status: 500 });
  }
}
