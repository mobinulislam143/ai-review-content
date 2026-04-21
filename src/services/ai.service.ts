// src/services/ai.service.ts
import OpenAI from "openai";
import { env } from "../config/env";

const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export const analyzeContent = async (caption: string) => {
  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Return ONLY JSON: { score:number, issues:string[], improved:string }",
      },
      {
        role: "user",
        content: caption,
      },
    ],
    temperature: 0.2,
  });

  const raw = res.choices[0]?.message?.content || "{}";
  return JSON.parse(raw);
};