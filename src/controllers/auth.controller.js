import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { createAccessToken } from "../middlewares/jwt.js";

export const register = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const userFound = await User.findOne({ where: { email: email } });

        if (userFound) {
            return res.status(400).json(['The email already exists']);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: passwordHash,
            username
        });

        const token = await createAccessToken({ id: newUser.id });
        res.json({
            id: newUser.id,
            username: newUser.username,
            rol: newUser.rol,
            email: newUser.email,
            token: token
        });

    } catch (error) {
        console.error(`Error during registration: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ where: { email: email } });
        if (!userFound) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log(userFound)

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = await createAccessToken({ id: userFound.id });
        return res.json({
            id: userFound.id,
            username: userFound.username,
            rol: userFound.rol,
            email: userFound.email,
            token: token
        });

    } catch (error) {
        console.error(`Error during login: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    return res.sendStatus(200);
};

export const profile = (req, res) => {
    return res.send('profile');
};

export const verify = (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    jwt.verify(token, '123456789', async (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const userFound = await User.findOne({ where: { id: user.id } });
        if (!userFound) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        return res.json({
            id: userFound.id,
            username: userFound.username,
            rol: userFound.rol,
            email: userFound.email,
            token: token
        });
    });
};