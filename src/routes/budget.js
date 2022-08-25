const express = require('express');
const budgetSchema = require("../models/budget");
const expenseSchema = require("../models/expense");
const router = express.Router();
const validateToken = require('../helper')
//Crear budget
/**
 * @swagger
 * components:
 *  schemas:
 *      Budget:
 *          type: object
 *          properties: 
 *              idOperation:
 *                  type: string
 *                  description: the operation id
 *              idCategory:
 *                  type: string
 *                  description: the category id
 *              type:
 *                  type: string
 *                  description: the amount
 *              amount:
 *                  type: number
 *                  description: the amount
 *          required:
 *              - idOperation
 *              - idCategory
 *              - type
 *              - amount  
 *          example:
 *              idOperation: "wqerqwerqwrq"
 *              idCategory: "waerawerawr"
 *              type: "No Variable"
 *              amount: 40000                
 */

/**
 * @swagger
 * /api/budget:
 *  post:
 *      summary: create a new budget
 *      tags:   [Budget]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Budget'
 *      responses:
 *          '200':
 *              description: new budget created
 *           
 *      
 */
router.post("/budget", validateToken, express.json(), async function (req, res) {
    const budget = budgetSchema(req.body);
    await budget.save().then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

//obtener budget
/**
 * @swagger
 * /api/budget/{id}:
 *  get:
 *      summary: return budget by id
 *      tags:   [Budget]
 *      parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         description: The id of operation 
 *      responses:
 *          '200':
 *              description: the budget
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                               $ref: '#/components/schemas/Budget'
 *          '404': 
 *              description: budget not exist  
 */

router.get("/budget/:id", validateToken, async function (req, res) {
    const { id } = req.params;
    await budgetSchema.findById(id).then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

/**
 * @swagger
 * /api/budget/byIdOperation/{id}:
 *  get:
 *      summary: return entry by id
 *      tags:   [Budget]
 *      parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         description: The id of operation 
 *      responses:
 *          '200':
 *              description: the budget
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                               $ref: '#/components/schemas/Budget'
 *          '404': 
 *              description: entry not exist  
 */
router.get("/budget/byIdOperation/:id", validateToken, function (req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    const { id } = req.params;
    budgetSchema.find({ idOperation: id }).then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

/**
 * @swagger
 * /api/budget:
 *  get:
 *   summary: return all Budgets
 *   tags:   [Budget]
 *   responses:
 *    200:
 *     description: new budget created
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Budget'
 */
//listar budget
router.get("/budget", validateToken, async function (req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    await budgetSchema.find().then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

/**
 * @swagger
 * /api/budgetByExpense:
 *  get:
 *   summary: return all Budgets
 *   tags:   [Budget]
 *   responses:
 *    200:
 *     description: new budget created
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Budget'
 */
//listar budget
router.get("/budgetByExpense", validateToken, async function (req, res) {


    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    let totalBudgetList = [];
    const expenseList = await expenseSchema.find().lean();

    const budgetList = await budgetSchema.find().lean();


    if (budgetList.length > 0)
        budgetList.map(x => {
            let total = 0;
            const filterExpenseList = expenseList.filter(y => y.nameCategory === x.idCategory.split("|")[0]);
            if (typeof (filterExpenseList) !== 'undefined') {
                filterExpenseList.map(z => {
                    total += z.amount;

                })
                totalBudgetList.push({ name: x.idCategory.split("|")[0], budgetAmount: x.amount, type: x.type, amount: total, exceeded: x.amount < total ? true : false })
            }

        })
    totalBudgetList = totalBudgetList.sort((a, b) => (a.type > b.type) ? 1 : -1)

    res.send(totalBudgetList)

});


//update budget
/**
 * @swagger
 * /api/budget/{id}:
 *  put:
 *   summary: update
 *   tags: [Budget]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *   description: The id of operation 
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Budget'
 *   responses:
 *        '200':
 *           description: updated a budget
 *        '404': 
 *           description: budget not exist 
 */
//actualizar budget
router.put("/budget/:id", validateToken, express.json(), async function (req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    const { id } = req.params;
    const { idOperation, idCategory, type, amount } = req.body;
    await budgetSchema.updateOne({ _id: id }, { $set: { idOperation, idCategory, type, amount } }).then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

//eliminar budget
/**
 * @swagger
 * /api/budget/{id}:
 *  delete:
 *   summary: update
 *   tags: [Budget]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *   description: The id of operation 
 *   responses:
 *        '200':
 *           description: updated a budget
 *        '404': 
 *           description: budget not exist 
 */
router.delete("/budget/:id", express.json(), async function (req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    const { id } = req.params;
    await budgetSchema.deleteOne({ _id: id }).then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

module.exports = router;