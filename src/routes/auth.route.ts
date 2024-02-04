import express from "express";
import passport from 'passport';
const router = express.Router();

router.post("/login", passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        res.send("Login by Local");
    }
);

router.post("/login/google", passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        res.send("Login by Google");
    }
)

export default router;