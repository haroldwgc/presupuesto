const express = require('express');
const operationSchema = require("../models/operation");
const router = express.Router();
const validateToken = require('../helper')


/**
 * @swagger
 * components:
 *  schemas:
 *      Operation:
 *          type: object
 *          properties: 
 *              name:
 *                  type: string
 *                  description: the operation id
 *              idUser:
 *                  type: string
 *                  description: the user Id
 *              created:
 *                  type: string
 *                  description: the entry id             
 *          required:
 *              - name
 *              - idUser
 *              - created
 *          example:
 *              name: "Mes Agosto"
 *              idUser: "6307959f24b3447744302df4"
 *              created: '2022-03-02'
 *                    
 */

//Crear gasto
/**
 * @swagger
 * /api/operation:
 *  post:
 *      summary: create a new operation
 *      tags:   [Operation]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Operation'
 *      responses:
 *          200:
 *              description: new operation created
 *                 
 */
router.post("/operation", validateToken, express.json(), function (req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    const operation = operationSchema(req.body);
    operation.created = new Date();
    operation.save().then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

//obtener operation
/**
 * @swagger
 * /api/operation/{id}:
 *  get:
 *      summary: return expense by id
 *      tags:   [Operation]
 *      parameters:
 *      -   in: path
 *      name: id
 *      type: string
 *      description: The id of operation 
 *      responses:
 *          '200':
 *              description: the expense
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                               $ref: '#/components/schemas/Operation'
 *          404: 
 *              description: operation not exist  
 */
router.get("/operation/:id", validateToken, function (req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    const { id } = req.params;
    operationSchema.findById(id).then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

//listar gastos
/**
 * @swagger
 * /api/operationByUser/{id}:
 *  get:
 *   summary: return all operation
 *   tags:   [Operation]
 *   parameters:
 *   -   in: path
 *   name: id
 *   type: string
 *   description: The id of operation 
 *   responses:
 *    200:
 *     description: new operation created
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Operation'  
 */
router.get("/operationByUser/:id", function (req, res) {
    const { id } = req.params;
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    operationSchema.find({idUser:id}).then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

//actualizar operation
/**
 * @swagger
 * /api/operation/{id}:
 *  put:
 *      summary: operation update
 *      tags:   [Operation]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *      description: The id of operation 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Operation'
 *      responses:
 *          '200':
 *             updated a expense
 *          404: 
 *              description: operation not exist  
 */
router.put("/operation/:id", validateToken, express.json(), function (req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    const { id } = req.params;
    const { name } = req.body;
    operationSchema.updateOne({ _id: id }, { $set: { name } }).then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

//eliminar gasto
/**
 * @swagger
 * /api/operation/{id}:
 *  delete:
 *      summary: delete a operation
 *      tags:   [Operation]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *      description: The id of operation 
 *      responses:
 *          '200':
 *             description: deleted a operation
 *          '404': 
 *             description: operation not exist
 */
router.delete("/operation/:id", validateToken, function (req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    const { id } = req.params;
    operationSchema.deleteOne({ _id: id }).then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

module.exports = router;