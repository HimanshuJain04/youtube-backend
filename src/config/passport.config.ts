import { Strategy as googleStrategy } from "passport-google-oauth20";
import { Strategy as localStrategy } from "passport-local";
import passport from 'passport';

export const passportInitialize = () => {


    // Google Authentication
    passport.use(new googleStrategy(
        {
            clientID: process.env.REACT_APP_CLIENT_ID,
            clientSecret: process.env.REACT_APP_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/login/google",
            passReqToCallback: true
        },
        (request, accessToken, refreshToken, profile, done) => {
            console.log("Google Auth");
            done(null, profile);
        }
    ));

    // Local Authentication
    passport.use(new localStrategy({ usernameField: 'email', passwordField: 'password' }, function (username, password, done) {

        console.log("Local Auth");
        console.log("username: ", username)
        console.log("password: ", password)

        done(null, { username, password });
    }
    ));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user)
    });

    console.log("Passport Initial")

};

