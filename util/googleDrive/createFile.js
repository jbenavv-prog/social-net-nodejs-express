const { google } = require('googleapis');
const getDriveAuth = require('../auth/google/drive');
const stream = require('stream');

const auth = getDriveAuth();

const createFile = async (parent, file) => {

    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);

    const fileMetadata = {
        'name': file.originalname,
        parents: [parent]
    };

    const media = {
        mimeType: file.mimeType,
        body: bufferStream
    };

    const drive = google.drive({ version: 'v3', auth });

    const { data } = await new Promise((resolve, reject) => {
        drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: '*'
        }, function (err, file) {
            if (err) {
                reject(err);
            } else {
                resolve(file);
            }
        });
    })

    return data;
}

module.exports = createFile;