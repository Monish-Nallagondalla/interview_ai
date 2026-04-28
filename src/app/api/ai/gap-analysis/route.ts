import { SYSTEM_PROMPTS } from "@/lib/prompts";

export async function POST(request: Request) {
  const { resumeText, jdText } = await request.json();

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "No API key" }, { status: 500 });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0,
        max_tokens: 1000,
        messages: [
          { role: "system", content: SYSTEM_PROMPTS.gapAnalysis },
          { role: "user", content: `CANDIDATE PROFILE:\n${resumeText}\n\nJOB DESCRIPTION:\n${jdText}\n\nProvide the gap analysis in the specified JSON format.` },
        ],
      }),
    });

    const data = await response.json();
    const content = data.choices[0].message.content;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return Response.json(JSON.parse(jsonMatch[0]));
    }
    return Response.json({ error: "Could not parse response" }, { status: 500 });
  } catch {
    return Response.json({ error: "API error" }, { status: 500 });
  }
}
