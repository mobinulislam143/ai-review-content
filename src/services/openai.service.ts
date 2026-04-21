import dotenv from "dotenv";
dotenv.config();

// CommonJS-safe import (fixes "Unexpected identifier OpenAI")
const OpenAI = require("openai").default;

// validate env early (prevents silent crash)
if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is missing in .env");
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeContent = async (caption: string) => {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Return ONLY valid JSON. No extra text.",
      },
      {
        role: "user",
        content: `
Analyze this content:

${caption}

Return JSON:
{
  "score": number,
  "issues": string[],
  "improved": string
}
        `,
      },
    ],
    temperature: 0.3,
  });

  const raw = response.choices[0]?.message?.content || "{}";

  return JSON.parse(raw);
};