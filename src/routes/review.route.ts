// src/routes/review.routes.ts
import express from "express";
import { reviewContent } from "../controllers/review.controller";
import { validate } from "../middlewares/validate.middleware";
import { reviewSchema } from "../validators/review.validator";
import { handleSlackAction } from "../controllers/slack.controller";

const router = express.Router();

router.post(
  "/review-content",
  validate(reviewSchema),
  reviewContent
);
router.post("/slack-action", handleSlackAction);


export default router;