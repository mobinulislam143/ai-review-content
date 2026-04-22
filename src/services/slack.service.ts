// src/services/slack.service.ts
import { env } from "../config/env";

export const sendSlackMessage = async (data: any, recordId: string) => {
  await fetch(process.env.SLACK_WEBHOOK_URL as string, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `🚀 *AI Review*
            
          👤 ${data.name}
          📱 ${data.platform}
          📊 Score: ${data.score}/100
          Issues:
${data.issues?.join("\n")}

Improved:
${data.improved}
          `,
          },
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: { type: "plain_text", text: "Approve" },
              style: "primary",
              value: JSON.stringify({
                action: "Approved",
                recordId,
              }),
            },
            {
              type: "button",
              text: { type: "plain_text", text: "Reject" },
              style: "danger",
              value: JSON.stringify({
                action: "Rejected",
                recordId,
              }),
            },
          ],
        },
      ],
    }),
  });
};