const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config();
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express');
const expenseRoutes = require('./src/routes/expense');
const categoryRoutes = require('./src/routes/category')
const entryRoutes = require('./src/routes/entry')
const operationRoutes = require('./src/routes/operation')
const budgetRoutes = require('./src/routes/budget')
const cors = require('cors');


const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Api presupuestoi",
            version: "1.0.0"
        }
    },
    apis: [`${path.join(__dirname, "./src/routes/*.js")}`]
}
//const calculateRoutes = require('./src/routes/calculate');
const app = express();
const port = process.env.PORT || 9000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerSpec)));

//Middleware
app.use('/api', expenseRoutes);
app.use('/api', categoryRoutes);
app.use('/api', entryRoutes);
app.use('/api', operationRoutes);
app.use('/api', budgetRoutes);

app.use(express.json())
app.use(require('body-parser').urlencoded({ extended: false }));

const config = {
    application: {
        cors: {
            server: [
                {
                    origin: "*", //servidor que deseas que consuma o (*) en caso que sea acceso libre
                    credentials: true
                }
            ]
        }
    }
}
var whiteList = ['http:192.168.3.11:8080']
var corsOption = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) == -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allow by cors'))
        }
    }
}
app.use(cors(
    //config.application.cors.server
));
//mongodb connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('conectado a bd de mongo local'))
    .catch((error) => console.error(error));

app.listen(port, () => console.log('Servidor escuchando en el puerto', port));