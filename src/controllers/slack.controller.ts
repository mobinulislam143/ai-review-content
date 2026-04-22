import { updateAirtableStatus } from "../services/airtable.service";

export const handleSlackAction = async (req:any, res:any) => {
  try {
    const payload = JSON.parse(req.body.payload);

    const actionData = JSON.parse(payload.actions[0].value);

    const { action, recordId } = actionData;

    await updateAirtableStatus(recordId, action);

    res.status(200).send(); // must respond fast
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
};