const express = require('express');
const LoginService = require('../services/loginService');
const ProfileService = require('../services/profileService');

const loginService = new LoginService();
const profileService = new ProfileService();

const loginApi = (app) => {
    const router = express.Router();

    app.use('/api/auth', router);

    router.post('/authenticate', authenticate)
    router.post('/register', register);
}

async function authenticate(req, res, next) {
    const { body: user } = req;

    try {
        const userDB = await loginService.getUser(user) || {};

        if (!userDB) {
            return res.status(200).json({
                ok: false,
                message: `Esta cuenta no existe`,
            });
        }

        const token = await loginService.authenticate(user, userDB) || {};

        if (!token) {
            return res.status(200).json({
                ok: false,
                message: `Autenticación Fallida`,
            });
        }

        return res.status(200).json({
            ok: true,
            message: `success`,
            data: {
                ...userDB,
                token
            }
        });
    } catch (err) {
        console.log(err);
    }
}

async function register(req, res, next) {
    const { body: user } = req;
    try {
        const { id: idPreviousUser } = await loginService.getUser(user) || {};

        if (idPreviousUser) {
            return res.status(200).json({
                ok: false,
                message: `Usuario ya está registrado`,
            });
        }

        const { id: idNewUser } = await loginService.createUser(user) || {}

        if (!idNewUser) {
            return res.status(200).json({
                ok: false,
                message: `Falló la creación de usuario`,
            });
        }

        await profileService.create(idNewUser, user) || {}

        return res.status(200).json({
            ok: true,
            message: `success`,
        });
    } catch (err) {
        console.log(err);
        return res.status(200).json({
            ok: false,
            message: new Error(err),
        });
    }
}

module.exports = loginApi;
