// src/controllers/review.controller.ts
import { Request, Response } from "express";
import { analyzeContent } from "../services/ai.service";
import { sendSlackMessage } from "../services/slack.service";
import { saveReview } from "../services/airtable.service";

export const reviewContent = async (req: Request, res: Response) => {
  try {
    const { caption, name, platform } = req.body;
    

    const aiResult = await analyzeContent(caption);

    const finalData = {
      ...aiResult,
      name,
      platform,
    };
console.log("Final Data to Save and Send:", finalData);
    await saveReview(finalData);


const recordId = await saveReview(finalData);

await sendSlackMessage(finalData, recordId);
    return res.json({
      success: true,
      data: finalData,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};