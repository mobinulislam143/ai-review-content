// src/services/airtable.service.ts
import Airtable from "airtable";
import { env } from "../config/env";

const base = new Airtable({ apiKey: env.AIRTABLE_API_KEY }).base(
  env.AIRTABLE_BASE_ID
);

export const saveReview = async (data: any) => {
  return base("tblYgE5qwQg4uZhLd").create([
    {
      fields: {
        Name: data.name,
        Platform: data.platform, 
        Status: ["Pending"], // Must be an array for Multiple Select
        Score: Number(data.score), // Ensure this is a number, not a string
        Feedback: data.improved,
      },
    },
  ],
{ typecast: true }
);
};