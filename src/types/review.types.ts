// src/types/review.types.ts
export interface ReviewRequest {
  caption: string;
  platform: string;
  name: string;
}

export interface ReviewResult {
  score: number;
  issues: string[];
  improved: string;
}