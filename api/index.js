import express from "express";
import serverless from "serverless-http";
import routes from "../routes/index.js";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/", routes);

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Default export serverless handler
export default serverless(app);
