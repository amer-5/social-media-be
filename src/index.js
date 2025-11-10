import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "../routes/index.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/", routes);

// 404 Handler
app.use((_req, res) => {
  res.status(404).send("Route not found");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
