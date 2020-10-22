import jwt from 'jsonwebtoken';
import User from '@/data/entity/User';
import { AnyObject } from '@/types/generic.types';

export class AuthHelper {

    static secret: string = process.env.JWT_SECRET;
    static options: jwt.SignOptions = {
        expiresIn: '2h'
    }

    public static createJWT(user: User, callback?: (err: any, token: string) => void) {
        if(user.password) delete user.password;
        return jwt.sign({user}, this.secret, this.options, callback);
    }

    public static refreshJWT(token): string {
        // https://gist.github.com/ziluvatar/a3feb505c4c0ec37059054537b38fc48
        const payload = jwt.verify(token, this.secret) as AnyObject;
        const jwtSignOptions = Object.assign({}, this.options);
        delete payload.iat;
        delete payload.exp;
        delete payload.nbf;
        delete payload.jti;
        return jwt.sign(payload, this.secret, jwtSignOptions);
    }
}
