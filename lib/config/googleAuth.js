const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserDAO = require("../persistence/dao/UserDAO");
const userDAO = new UserDAO();

const googleAuthOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/oauth2/redirect/google",
    scope: [ "profile", "email" ]
}

// registering google auth
passport.use(new GoogleStrategy(
    googleAuthOptions,
    verifyGoogleAuth
));

async function verifyGoogleAuth(accessToken, refreshToken, profile, done) {
    try {
        const primaryEmail = profile.emails?.[0].value || null;
        if (!primaryEmail) return done(new Error("Google account has no email"));
        let user = await userDAO.getByEmail(primaryEmail);
        if (user && !user.googleId) {
            // associate googleId with this email
            await userDAO.update(user.id, {
                googleId: profile.id
            });
        } else if (!user) {
            user = await userDAO.create({
                googleId: profile.id,
                email: primaryEmail,
                displayName: profile.displayName
            });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}

passport.serializeUser((user, done) => {
    process.nextTick(() => {
        done(null, {
            id: user.id,
            email: user.email
        });
    });
});

passport.deserializeUser((user, done) => {
    process.nextTick(() => {
        done(null, user);
    });
});