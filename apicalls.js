import express from 'express'
import http from 'http'
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';

import homeRoute from './api/home.js'
import indexRoute from './api/index.js'
import loginRoute from './api/login.js'

import dataRoute from './databases/data.js'

import {verifyToken} from './middleware/verifytoken.js'
import {rateLimiter} from './middleware/ratelimiter.js'

var app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/", homeRoute);
app.use("/login", loginRoute);
app.use("/index", indexRoute);
app.use("/data", verifyToken, rateLimiter, dataRoute);


const swaggerDocument = YAML.load('./swagger/swagger.yaml');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: ['https://editor.swagger.io', 'http://localhost:3000']
}));

//var server = http.createServer(app);

export default app
