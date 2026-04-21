// app.ts
import express from "express";
import cors from "cors";
import reviewRoutes from "./routes/review.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", reviewRoutes);

export default app;