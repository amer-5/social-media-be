import express from "express";
import serverless from "serverless-http";
import routes from "../routes/index.js";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";
import timeoutMiddleware from "../middleware/timeout.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Serve static files from /public (favicon, images, etc.)
app.use(express.static(path.join(process.cwd(), "public")));

// Global request timeout middleware (default 25s, override with PROCESS env)
app.use(
  timeoutMiddleware(
    process.env.REQUEST_TIMEOUT_MS
      ? Number(process.env.REQUEST_TIMEOUT_MS)
      : 25000,
  ),
);

app.use("/", routes);

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Default export serverless handler
export default serverless(app);
