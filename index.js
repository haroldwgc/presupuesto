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
const userRoutes = require('./src/routes/user')
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

const whitlist=[
    "https://haroldwgc.github.io","http://127.0.0.1"
]

const cosrOptions={
    origin:function(origin, callback){
        if(whitlist.indexOf(origin)!==-1 || !origin){
            callback(null,true)
        }else{
           callback(new Error("Not Allowed by CORS"))
        }
    }
}

app.use(cors(cosrOptions))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerSpec)));

//Middleware
app.use('/api', expenseRoutes);
app.use('/api', categoryRoutes);
app.use('/api', entryRoutes);
app.use('/api', operationRoutes);
app.use('/api', budgetRoutes);
app.use('/api', userRoutes);

app.use(express.json())
app.use(require('body-parser').urlencoded({ extended: false }));


 // Use this after the variable declaration
//mongodb connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('conectado a bd de mongo local'))
    .catch((error) => console.error(error));

app.listen(port, () => console.log('Servidor escuchando en el puerto', port));