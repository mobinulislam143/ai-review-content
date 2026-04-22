import { updateAirtableStatus } from "../services/airtable.service";

export default async function handler(req:any, res:any) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    // 🔥 Vercel already parses body
    if (!req.body || !req.body.payload) {
      console.log("BAD BODY:", req.body);
      return res.status(400).send("Missing payload");
    }

    const payload = JSON.parse(req.body.payload);

    const actionData = JSON.parse(payload.actions[0].value);
    const { action, recordId } = actionData;

    // ⚡ respond instantly (critical)
    res.status(200).end();

    // async work AFTER response
    await updateAirtableStatus(recordId, action);

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).end();
  }
}