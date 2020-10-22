import passport from 'passport';

const jwtAuth = passport.authenticate('jwt-cookiecombo', {session: false});
export default jwtAuth;
