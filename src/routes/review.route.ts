// src/routes/review.routes.ts
import express from "express";
import { reviewContent } from "../controllers/review.controller";
import { validate } from "../middlewares/validate.middleware";
import { reviewSchema } from "../validators/review.validator";

const router = express.Router();

router.post(
  "/review-content",
  validate(reviewSchema),
  reviewContent
);

export default router;