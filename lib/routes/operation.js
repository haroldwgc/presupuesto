const express = require('express');

const operationSchema = require("../models/operation");

const router = express.Router();
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
 *              created:
 *                  type: string
 *                  description: the entry id             
 *          required:
 *              - name
 *              - created
 *          example:
 *              name: "Mes Agosto"
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

router.post("/operation", express.json(), function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  const operation = operationSchema(req.body);
  operation.created = new Date();
  operation.save().then(data => res.json(data)).catch(error => res.json({
    message: error
  }));
}); //obtener operation

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

router.get("/operation/:id", express.json(), function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  const {
    id
  } = req.params;
  operationSchema.findById(id).then(data => res.json(data)).catch(error => res.json({
    message: error
  }));
}); //listar gastos

/**
 * @swagger
 * /api/operation:
 *  get:
 *   summary: return all operation
 *   tags:   [Operation]
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

router.get("/operation", express.json(), function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  operationSchema.find().then(data => res.json(data)).catch(error => res.json({
    message: error
  }));
}); //actualizar operation

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

router.put("/operation/:id", express.json(), function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  const {
    id
  } = req.params;
  const {
    name
  } = req.body;
  operationSchema.updateOne({
    _id: id
  }, {
    $set: {
      name
    }
  }).then(data => res.json(data)).catch(error => res.json({
    message: error
  }));
}); //eliminar gasto

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

router.delete("/operation/:id", express.json(), function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  const {
    id
  } = req.params;
  operationSchema.remove({
    _id: id
  }).then(data => res.json(data)).catch(error => res.json({
    message: error
  }));
});
module.exports = router;