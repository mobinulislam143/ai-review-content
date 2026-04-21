// src/config/env.ts
import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT || 5070,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
  SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL!,
  AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY!,
  AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID!,
};