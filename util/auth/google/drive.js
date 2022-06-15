const { google } = require('googleapis');
const path = require('path');

const getDriveAuth = () => {
  const KEYFILEPATH = path.join(__dirname, './service.json');
  const SCOPES = ['https://www.googleapis.com/auth/drive'];

  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });
  return auth;
};

module.exports = getDriveAuth;