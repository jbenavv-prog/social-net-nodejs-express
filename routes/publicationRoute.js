const express = require('express');
const PublicationService = require('../services/publicationService');
const multer = require('multer');
const createFile = require('../util/googleDrive/createFile');
const ReactionService = require('../services/reactionService');
const { cookie } = require('express/lib/response');
const CommentService = require('../services/commentService');

const publicationService = new PublicationService();
const reactionService = new ReactionService();
const commentService = new CommentService();

const upload = multer();

const publicationApi = (app) => {
    const router = express.Router();

    app.use('/api/publication', router);

    router.post('/create', upload.any(), create);
    router.post('/getPublications', getPublications);
    router.post('/createReaction', createReaction);
    router.post('/createComment', createComment);
    router.post('/getPublicationsByUser', getPublicationsByUser);
}

async function create(req, res, next) {

    const {files: images, body: formData } = req
    let imageURL = '';
    const rootFolder = '11BkDnukd_PgtX_Cft-t4Iv-2UXeakEn0';

    try {
        if (images[0]) {
            const { webContentLink } = await createFile(rootFolder, images[0]);
            imageURL = webContentLink;
        }

        const { id: idPublication } = await publicationService.create(formData, imageURL) || {};

        if (!idPublication) {
            return res.status(200).json({
                ok: false,
                message: `No se pudo crear la publicación`,
            });
        }

        return res.status(200).json({
            ok: true,
            message: `success`,
            data: {
                idPublication
            }
        });

    } catch (error) {
        console.log(error);
    }
}

async function getPublications(req, res, next) {
    try {
        const result = await publicationService.getPublications() || {};

        return res.status(200).json({
            ok: true,
            message: `success`,
            data: {
                result
            }
        });
    } catch (error) {
        console.log(error);
    }
}

async function getPublicationsByUser(req, res, next) {
    const { body: user } = req;
    try {
        const result = await publicationService.getPublicationsByUser(user) || {};

        return res.status(200).json({
            ok: true,
            message: `success`,
            data: {
                result
            }
        });
    } catch (error) {
        console.log(error);
    }
}

async function createReaction(req, res, next) {
    const { reaction, user } = req.body;
    try {

        const { id: idPreviousReaction } = await reactionService.getByPublication(reaction, user) || {}

        if (idPreviousReaction) {
            await reactionService.update(reaction, user);
        } else {
            await reactionService.create(reaction, user);
        }

        return res.status(200).json({
            ok: true,
            message: `success`
        });
    } catch (error) {
        console.log(error);
    }
}

async function createComment(req, res, next) {
    console.log
    const { comment, user } = req.body;
    try {
        const { id: idComment } = await commentService.create(comment, user) || {};

        return res.status(200).json({
            ok: true,
            message: `success`,
            data: {
                idComment
            }
        });

    } catch (error) {
        console.log(err);
    }

}

module.exports = publicationApi;