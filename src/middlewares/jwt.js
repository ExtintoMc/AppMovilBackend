import jwt from 'jsonwebtoken'

export const createAccessToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            '123456789',
            {
                expiresIn: "1d"
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        )
    })
}