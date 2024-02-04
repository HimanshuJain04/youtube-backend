import express from "express";
import passport from 'passport';
const router = express.Router();

// Login Route
router.post("/login", passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        res.send("Login by Local");
    }
);

router.get("/login/google", passport.authenticate('google', { scope: ['profile', "email"] }),
    (req, res) => {
        console.log("googleee")
        res.send("get by Google");
    }
);

router.post("login/google", passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/"
}),
    (req, res) => {
        res.send("Login By Google");
    }
);

export default router;