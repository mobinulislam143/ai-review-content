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
          Status: ["pending"],
          Score: Number(data.score),
          Feedback: data.improved,

          // ✅ STORE IT IN AIRTABLE
          RecordId: "temp" // placeholder first
        },
      },
    ],
    { typecast: true }
  );

  const recordId = records[0].id;

  // 🔥 update same record with its own ID
  await base("tblYgE5qwQg4uZhLd").update([
    {
      id: recordId,
      fields: {
        RecordId: recordId,
      },
    },
  ]);

  return recordId;
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