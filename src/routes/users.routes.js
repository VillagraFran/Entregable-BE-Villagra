import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt, { genSaltSync } from "bcrypt"

import { userModel } from '../DAO/mongo/models/user.model.js';

import { config } from 'dotenv';
config();

import privateRoutes from '../middlewares/privateRoutes.js';


const router = Router();

router.post('/login', 
    passport.authenticate("login", {failureRedirect: "/fail" }), 
    async (req, res) => {

        const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.cookie("token", token, {
            maxAge: 100000,
            httpOnly: true
        })
        res.redirect("/api/current")
    }
)

router.post('/singup', 
    passport.authenticate("register", {failureRedirect: "/fail" }), 
    async (req, res) => {
        res.redirect("/login")
    }
)

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect("/login");
});

router.get('/github', 
    passport.authenticate("github", { scope: ["user:email"] })
);

router.get('/githubcallback', 
    passport.authenticate("github", { failureRedirect: "/fail" }), 
    async (req, res) => {
        const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/products");
    }
);

router.get('/current',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        res.redirect("/products");
    }
);

router.post('/recoverPassword', async(req, res) => {
    const newPassword = req.body;
    const newUser = await userModel.updateOne({email: {$eq: req.user.email}}, {$set: {password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10))}})
    
    res.status(200).send({message: "contraseña cambiada exitosamente"})
});

export default router;