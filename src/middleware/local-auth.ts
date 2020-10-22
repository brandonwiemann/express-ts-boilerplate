import passport from 'passport';

const auth = passport.authenticate('local', { session: false });
export default auth;
