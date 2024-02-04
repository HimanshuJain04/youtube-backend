import { Strategy as googleStrategy } from "passport-google-oauth20";
import { Strategy as localStrategy } from "passport-local";
import passport from 'passport';


// Google Authentication
passport.use(new googleStrategy(
    {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
        console.log("Google Auth")
    }
));

// Local Authentication
passport.use(new localStrategy(
    (username, password, done) => {
        console.log("Local Auth")
    }
));


