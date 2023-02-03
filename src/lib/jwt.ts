import * as jwt from 'jsonwebtoken'
import * as crypto from 'crypto';

export const signLocalToken = (email: string, id: string): string => {
    const key = process.env.JWT_AUTH_KEY;
    const signRandomToken = crypto.randomBytes(13).toString();
    const sign = jwt.sign({
        id: id,
        email: email,
        randomValue: signRandomToken,
    }, key)
    return sign
}

export const signCookieToken = (email: string, id: string,) => {
    const key = process.env.JWT_COOKIE_KEY;
    const signRandomToken = crypto.randomBytes(30).toString();
    const sign = jwt.sign({
        id: id,
        email: email,
        randomValue: signRandomToken + new Date().toISOString(),
    }, key)
    return sign
}

