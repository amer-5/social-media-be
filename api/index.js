import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "../routes/index.js";
import cookieParser from "cookie-parser";
import serverless from "serverless-http";

const app = express();

app.use(helmet());
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", routes);

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ⬇️ Ključna promjena — mora biti NAMED export
export const handler = serverless(app);
