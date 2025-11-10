import { Router } from "express";
import userRoutes from "./users/index.js";
import postsRoutes from "./posts/index.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/posts", postsRoutes);

export default router;
