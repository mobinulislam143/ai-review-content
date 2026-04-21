// src/services/slack.service.ts
import { env } from "../config/env";

export const sendSlackMessage = async (data: any) => {
  await fetch(env.SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `
🚀 AI Review

Score: ${data.score}

Issues:
${data.issues?.join("\n")}

Improved:
${data.improved}
      `,
    }),
  });
};