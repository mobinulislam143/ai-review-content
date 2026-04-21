// src/validators/review.validator.ts
import { z } from "zod";

export const reviewSchema = z.object({
  caption: z.string().min(1),
  platform: z.string(),
  name: z.string(),
});