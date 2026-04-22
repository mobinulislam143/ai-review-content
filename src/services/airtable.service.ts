// src/services/airtable.service.ts
import Airtable from "airtable";
import { env } from "../config/env";

const base = new Airtable({ apiKey: env.AIRTABLE_API_KEY }).base(
  env.AIRTABLE_BASE_ID
);

export const saveReview = async (data: any) => {
  const records = await base("tblYgE5qwQg4uZhLd").create(
    [
      {
        fields: {
          Name: data.name,
          Platform: data.platform,
          Status: ["Pending"],
          Score: Number(data.score),
          Feedback: data.improved,
        },
      },
    ],
    { typecast: true }
  );

  return records[0].id; // 🔥 REQUIRED
};

export const updateAirtableStatus = async (
  recordId: string,
  status: string
) => {
  await base("tblYgE5qwQg4uZhLd").update(
    [
      {
        id: recordId,
        fields: {
          Status: [status], // must be array
        },
      },
    ],
    { typecast: true }
  );
};