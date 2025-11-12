import express from 'express'
import http from 'http'
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';

import homeRoute from './api/home.js'
import indexRoute from './api/index.js'
import dataRoute from './api/data.js'

var app = express()

const swaggerDocument = YAML.load('./swagger/swagger.yaml');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors({
  origin: ['https://editor.swagger.io', 'http://localhost:3000']
}));


app.use("/", homeRoute);
app.use("/index", indexRoute);
app.use("/data", dataRoute);

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

var server = http.createServer(app);

export default app
