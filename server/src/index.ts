import express from "express";
import cors from "cors";
import { recruitmentRouter } from "./routes/recruitment.js";

const app = express();
const PORT = Number(process.env.PORT ?? 4000);

app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? "http://localhost:3000" }));
app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/recruitment", recruitmentRouter);

app.listen(PORT, () => {
  console.log(`MoFaya server listening on http://localhost:${PORT}`);
});
