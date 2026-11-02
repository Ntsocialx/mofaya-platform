import express from "express";
import cors from "cors";
import { config, isAllowedOrigin, reportMissingConfig } from "./config.js";
import { recruitmentRouter } from "./routes/recruitment.js";

reportMissingConfig();

const app = express();

// Render terminates TLS at its proxy; trust it so req.ip / req.protocol are the client's.
app.set("trust proxy", 1);

app.use(
  cors({
    // No Origin header = server-to-server or health checks; allow those.
    origin: (origin, callback) => callback(null, !origin || isAllowedOrigin(origin)),
  }),
);
app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/recruitment", recruitmentRouter);

app.listen(config.port, () => {
  console.log(`MoFaya server listening on port ${config.port}`);
  console.log(`[config] Allowed origins: ${config.allowedOrigins.join(", ")}`);
});
