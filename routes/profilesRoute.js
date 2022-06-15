const express = require('express');
const multer = require('multer');
const createFile = require('../util/googleDrive/createFile');
const ProfileService = require('../services/profileService');
const PublicationService = require('../services/publicationService');
const { use } = require('express/lib/application');

const profileService = new ProfileService();
const publicationService = new PublicationService();

const upload = multer();

const profilesApi = (app) => {
    const router = express.Router();

    app.use('/api/profiles', router);

    router.post('/getProfile', getProfile);
    router.post('/updatePhotoProfile', upload.any(), updatePhotoProfile);
    router.post('/updateDetails', updateDetails);

}

async function getProfile(req, res, next) {
    const { body: user } = req;

    try {
        const profile = await profileService.getByUser(user) || {};

        return res.status(200).json({
            ok: true,
            message: `success`,
            data: profile
        });

    } catch (err) {
        console.log(err)
    }
}

async function updatePhotoProfile(req, res, next) {
    const { query: user, files: images, body: formData } = req;
    let imageURL = '';
    const rootFolder = '11BkDnukd_PgtX_Cft-t4Iv-2UXeakEn0';
    try {

        if (images[0]) {
            const { id: idImage, webViewLink, webContentLink } = await createFile(rootFolder, images[0]);
            imageURL = webContentLink;
        }

        const { id: idProfile } = await profileService.updatePhotoProfile(imageURL, user) || {};

        if (idProfile) {
            const { id: idPublication } = await publicationService.create(user, formData, imageURL) || {};

            if (!idPublication) {
                return res.status(200).json({
                    ok: false,
                    message: `No se pudo crear la publicación`,
                });
            }
        }

        return res.status(200).json({
            ok: true,
            message: `success`
        });

    } catch (err) {
        console.log(err)
    }
}

async function updateDetails(req, res, next) {
    const { formData, user } = req.body;

    try {
        const { id: idPublication } = await profileService.updateDetails(formData, user) || {};

        if (!idPublication) {
            return res.status(false).json({
                ok: true,
                message: `success`
            });
        }

        return res.status(200).json({
            ok: true,
            message: `success`
        });

    } catch (err) {
        console.log(err)
    }
}

module.exports = profilesApi;