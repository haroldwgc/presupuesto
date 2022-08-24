const express = require('express');
const expenseSchema = require("../models/expense");
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Expense:
 *          type: object
 *          properties: 
 *              idOperation:
 *                  type: string
 *                  description: the operation id
 *              nameCategory:
 *                  type: string
 *                  description: name of category
 *              dateAmount: 
 *                  type: date
 *                  description: date of amount
 *              iconCategory:
 *                  type: string
 *                  description: icon of category
 *              name:
 *                  type: string
 *                  description: the name of expense
 *              type:
 *                  type: string
 *                  description: the type of expense
 *              amount:
 *                  type: number
 *                  description: amount
 *              created: 
 *                  type: date
 *                  description: created date  
 *              updated: 
 *                  type: date
 *                  description: updated date  
 *          required:
 *              - idOperation
 *              - nameCategory
 *              - iconCategory  
 *              - name 
 *              - type 
 *              - amount
 *              - dateAmount
 *          example:
 *              idOperation: "62f6b6e8f36ea81003e6a8c1"
 *              dateAmount: "2022-08-19T12:42:25.226+00:00"
 *              nameCategory: "Servicios"
 *              iconCategory: "https://img.icons8.com/hands/344/experimental-home-hands.png" 
 *              name: "Agua" 
 *              type: "Fijos Variable" 
 *              amount: 27800
 *               
 */

//Crear gasto
/**
 * @swagger
 * /api/expense:
 *  post:
 *      summary: create a new expense
 *      tags:   [Expense]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Expense'
 *      responses:
 *          200:
 *              description: new expense created
 *                 
 */
router.post("/expense", express.json(), function (req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    const expense = expenseSchema(req.body);
    expense.created = new Date();
    expense.updated = new Date();
    expense.save().then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

/**
 * @swagger
 * /api/expense/byIdOperation/{id}:
 *  get:
 *      summary: return entry by id
 *      tags:   [Expense]
 *      parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         description: The id of operation 
 *      responses:
 *          '200':
 *              description: the expense
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                               $ref: '#/components/schemas/Expense'
 *          '404': 
 *              description: entry not exist  
 */
router.get("/expense/byIdOperation/:id", express.json(), function (req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    const { id } = req.params;
    expenseSchema.find({ idOperation: id }).then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

//obtener gasto
/**
 * @swagger
 * /api/expense/{id}:
 *  get:
 *      summary: return expense by id
 *      tags:   [Expense]
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
 *                               $ref: '#/components/schemas/Expense'
 *          404: 
 *              description: expense not exist  
 */
router.get("/expense/:id", express.json(), function (req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    const { id } = req.params;
    expenseSchema.findById(id).then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

//listar expense
/**
 * @swagger
 * /api/expense:
 *  get:
 *   summary: return all expenses
 *   tags:   [Expense]
 *   responses:
 *    200:
 *     description: new expense created
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Expense'  
 */
router.get("/expense", express.json(), function (req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');


    expenseSchema.find().then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});


//actualizar expense
/**
 * @swagger
 * /api/expense/{id}:
 *  put:
 *      summary: expense update
 *      tags:   [Expense]
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
 *                      $ref: '#/components/schemas/Expense'
 *      responses:
 *          '200':
 *             updated a expense
 *          '404': 
 *             description: expense not exist  
 */
router.put("/expense/:id", express.json(), function (req, res) {
    const { id } = req.params;
    const { idOperation, nameCategory, iconCategory, name,type,amount,dateAmount } = req.body;
    expenseSchema.updateOne({ _id: id }, { $set: { idOperation, nameCategory, iconCategory, name,type,amount, dateAmount } }).then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

//eliminar gasto
/**
 * @swagger
 * /api/expense/{id}:
 *  delete:
 *      summary: delete a expense
 *      tags:   [Expense]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *      description: The id of operation 
 *      responses:
 *          '200':
 *             description: deleted a expense
 *          '404': 
 *             description: expense not exist
 */
router.delete("/expense/:id", express.json(), function (req, res) {
    const { id } = req.params;
    expenseSchema.deleteOne({ _id: id }).then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

module.exports = router;