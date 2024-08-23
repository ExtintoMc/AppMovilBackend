import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {

    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' })
    }

    jwt.verify(token, '123456789', (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" })
        }

        console.log(user)
        next()
    })
}