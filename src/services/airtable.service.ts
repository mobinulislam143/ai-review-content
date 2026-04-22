import Airtable from "airtable";
import { env } from "../config/env";

const base = new Airtable({ apiKey: env.AIRTABLE_API_KEY }).base(
  env.AIRTABLE_BASE_ID
);

const TABLE_NAME = "tblYgE5qwQg4uZhLd";

export const saveReview = async (data: any) => {
  const records = await base(TABLE_NAME).create(
    [
      {
        fields: {
          Name: data.name,
          Platform: data.platform,
          Status: ["pending"],
          Score: Number(data.score),
          Feedback: data.improved,
          RecordId: "temp",
        },
      },
    ],
    { typecast: true }
  );

  const recordId = records[0].id;

  // update record with its own ID
  await base(TABLE_NAME).update([
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
  if (!recordId) throw new Error("Missing recordId");

  await base(TABLE_NAME).update(
    [
      {
        id: recordId,
        fields: {
          Status: [status], // Airtable multi-select format
        },
      },
    ],
    { typecast: true }
  );
};