import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { IUserEntityService } from '@/services/UserEntityService';
import JwtCookieStrategy from 'passport-jwt-cookiecombo';
import container from '@/config/inversify.config';
import { TYPES } from '@/types/inversify.types';

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
(email: string, password: string, done: (...args: any[]) => any) => {
    const userService = container.get<IUserEntityService>(TYPES.IUserEntityService);
    userService.authenticateUser(email, password).then(user => {
        if (!user) {
            return done(null, false, {message: 'Incorrect email or password.'});
        }
        return done(null, user, {message: 'Logged In Successfully'});
    }).catch(err => done(err));
}
));

passport.use(new JwtCookieStrategy({
    secretOrPublicKey: process.env.JWT_SECRET
}, (payload, done) => {
    // Might not need to do anything here
    done(null, payload.user);
}
));
