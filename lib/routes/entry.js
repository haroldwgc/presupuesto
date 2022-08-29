const express = require('express');

const entrySchema = require("../models/entry");

const router = express.Router();

const validateToken = require('../helper');
/**
 * @swagger
 * components:
 *  schemas:
 *      Entry:
 *          type: object
 *          properties: 
 *              idOperation:
 *                  type: string
 *                  description: the operation id
 *              name:
 *                  type: string
 *                  description: the entry id
 *              amount:
 *                  type: number
 *                  description: the amount
 *              created:
 *                  type: date
 *                  description: created date
 *              updated: 
 *                  type: date
 *                  description: created date  
 *          required:
 *              - idOperation
 *              - name
 *              - created 
 *          example:
 *              idOperation: "2342342656g46h4h"
 *              name: "asasaef"
 *              created: '2022-05-02'  
 *              updated: '2022-05-02'          
 */
//Crear gasto

/**
 * @swagger
 * /api/entry:
 *  post:
 *      summary: create a new entry
 *      tags:   [Entry]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Entry'
 *      responses:
 *          200:
 *              description: new entry created
 *                 
 */


router.post("/entry", validateToken, express.json(), function (req, res) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  const entry = entrySchema(req.body);
  entry.save().then(data => res.json(data)).catch(error => res.json({
    message: error
  }));
}); //obtener gasto

/**
 * @swagger
 * /api/entry/{id}:
 *  get:
 *      summary: return entry by id
 *      tags:   [Entry]
 *      parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         description: The id of operation 
 *      responses:
 *          '200':
 *              description: the entry
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                               $ref: '#/components/schemas/Entry'
 *          '404': 
 *              description: entry not exist  
 */

router.get("/entry/:id", validateToken, function (req, res) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  const {
    id
  } = req.params;
  entrySchema.findById(id).then(data => res.json(data)).catch(error => res.json({
    message: error
  }));
}); //obtener gasto

/**
 * @swagger
 * /api/entry/byIdOperation/{id}:
 *  get:
 *      summary: return entry by id
 *      tags:   [Entry]
 *      parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         description: The id of operation 
 *      responses:
 *          '200':
 *              description: the entry
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                               $ref: '#/components/schemas/Entry'
 *          '404': 
 *              description: entry not exist  
 */

router.get("/entry/byIdOperation/:id", validateToken, function (req, res) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  const {
    id
  } = req.params;
  entrySchema.find({
    idOperation: id
  }).then(data => res.json(data)).catch(error => res.json({
    message: error
  }));
}); //listar entry

/**
 * @swagger
 * /api/entry:
 *  get:
 *   summary: return all budget
 *   tags:   [Entry]
 *   responses:
 *    200:
 *     description: new budget created
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Entry'  
 */

router.get("/entry", validateToken, function (req, res) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  entrySchema.find().then(data => res.json(data)).catch(error => res.json({
    message: error
  }));
}); //actualizar entry

/**
 * @swagger
 * /api/entry/{id}:
 *  put:
 *      summary: entry update
 *      tags:   [Entry]
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
 *                      $ref: '#/components/schemas/Entry'
 *      responses:
 *          '200':
 *             updated a entry
 *          404: 
 *              description: entry not exist  
 */

router.put("/entry/:id", validateToken, express.json(), function (req, res) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  const {
    id
  } = req.params;
  const {
    idOperation,
    name,
    origin,
    type
  } = req.body;
  entrySchema.updateOne({
    _id: id
  }, {
    $set: {
      idOperation,
      name,
      origin,
      type
    }
  }).then(data => res.json(data)).catch(error => res.json({
    message: error
  }));
}); //eliminar entry

/**
 * @swagger
 * /api/entry/{id}:
 *  delete:
 *      summary: delete a category
 *      tags:   [Entry]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *      description: The id of operation 
 *      responses:
 *          '200':
 *             description: deleted a entry
 *          '404': 
 *             description: entry not exist
 */

router.delete("/entry/:id", validateToken, function (req, res) {
  const {
    id
  } = req.params;
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  entrySchema.deleteOne({
    _id: id
  }).then(data => res.json(data)).catch(error => res.json({
    message: error
  }));
});
module.exports = router;