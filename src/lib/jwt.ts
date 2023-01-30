import * as jwt from 'jsonwebtoken'
import * as crypto from 'crypto';

export const signLocalToken = (email: string, id: string): string => {
    const signRandomToken = crypto.randomBytes(13).toString();
    const sign = jwt.sign({
        id: id,
        email: email,
        randomValue: signRandomToken,
    }, 'password')

    return sign
}


export const signCookieToken = (id: string, email: string) => {
    const signRandomToken = crypto.randomBytes(30).toString();
    const sign = jwt.sign({
        id: id,
        email: email,
        randomValue: signRandomToken + new Date().toISOString(),
    }, 'passwordeiodikjdedc')

    return sign
}

