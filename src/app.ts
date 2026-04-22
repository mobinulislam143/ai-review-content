// app.ts
import express from "express";
import cors from "cors";
import reviewRoutes from "./routes/review.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", reviewRoutes);
app.get("/", (req, res) => {
  res.send("AI Reviewer Backend is running!");
});

export default app;