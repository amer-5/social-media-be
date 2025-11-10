import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "../routes/index.js";
import cookieParser from "cookie-parser";
import serverless from "serverless-http";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/", routes);

// 404 handler
app.use((_req, res) => {
  res.status(404).send("Route not found");
});

// Export serverless handler
export const handler = serverless(app);
