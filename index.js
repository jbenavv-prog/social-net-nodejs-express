const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
require('dotenv').config()

const loginApi = require('./routes/loginRoute');
const profilesApi = require('./routes/profilesRoute');
const publicationApi = require('./routes/publicationRoute');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    let allowedOrigins = [
        "http://localhost:4200",
        "http://localhost:8080",
    ];

    let origin = req.headers.origin;

    console.log(chalk.red.bgBlue.bold(`origin: ${origin}`));

    if (allowedOrigins.includes(origin)) {
        console.log(chalk.bgRed.white(`origin includes`, origin))
        res.header("Access-Control-Allow-Origin", origin);
    }

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, token, authorization, apiKeyToken, responseType, content-type"
    );

    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

// Routes
loginApi(app);
profilesApi(app);
publicationApi(app);

app.listen(process.env.PORT, () => {
    console.log(chalk.blueBright(
        `Escuchando por el puerto http://localhost:${process.env.PORT}/api/`));
});