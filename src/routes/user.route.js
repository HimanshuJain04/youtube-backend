import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js"

const router = express.Router();

// router.use(isAuthenticated);

// Example of a protected route
router.get('/protected-route', isAuthenticated, (req, res) => {
    // Access protected resource
    res.send("Proteced Route");
});

export default router;