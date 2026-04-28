import { SYSTEM_PROMPTS } from "@/lib/prompts";

export async function POST(request: Request) {
  const { messages, mode, jdText } = await request.json();

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ message: "API key not configured." }, { status: 200 });
  }

  const modeInstructions = mode === "stress"
    ? "Be challenging. Ask rapid follow-ups. Push back on vague answers. Interrupt politely if answers are too long."
    : mode === "simulation"
    ? "Be professional and realistic. No hints. Natural pacing."
    : "Be encouraging but still probing. If the candidate struggles, offer a gentle hint.";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.7,
        max_tokens: 400,
        messages: [
          { role: "system", content: `${SYSTEM_PROMPTS.mockInterview}\n\nMode: ${mode}. ${modeInstructions}\n\nJob Description: ${jdText}` },
          ...messages.map((m: { role: string; content: string }) => ({ role: m.role, content: m.content })),
        ],
      }),
    });

    const data = await response.json();
    return Response.json({ message: data.choices[0].message.content });
  } catch {
    return Response.json({ message: "Could not reach AI service." }, { status: 500 });
  }
}
