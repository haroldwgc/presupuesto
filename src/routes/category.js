const express = require('express');
const categorySchema = require("../models/category");
const router = express.Router();
const validateToken = require('../helper')

/**
 * @swagger
 * components:
 *  schemas:
 *      Category:
 *          type: object
 *          properties: 
 *              type:
 *                  type: string
 *                  description: the operation id
 *              name:
 *                  type: string
 *                  description: the category id
 *              description:
 *                  type: number
 *                  description: the amount
 *              icon:
 *                  type: number
 *                  description: the amount
 *              created:
 *                  type: date
 *                  description: created date
 *              updated: 
 *                  type: date
 *                  description: created date  
 *          required:
 *              - type
 *              - name
 *              - description  
 *              - icon 
 *              - created 
 *              - updated 
 *          example:
 *              type: "Fijo"
 *              name: "asdfadf"
 *              description: "sadfasf"
 *              icon: "sdfasfasfasf"   
 *              created: '2022-05-02'  
 *              updated: '2022-05-02'          
 */

//add category
/**
 * @swagger
 * /api/category:
 *  post:
 *      summary: create a new category
 *      tags:   [Category]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Category'
 *      responses:
 *          200:
 *              description: new category created
 *                 
 */

router.post("/category", validateToken, express.json(), function (req, res) {

    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
   

    const category = categorySchema(req.body);
    category.save().then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

//obtener category
/**
 * @swagger
 * /api/category/{id}:
 *  get:
 *      summary: return budget by id
 *      tags:   [Category]
 *      parameters:
 *      -   in: path
 *      name: id
 *      type: string
 *      description: The id of operation 
 *      responses:
 *          '200':
 *              description: the category
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                               $ref: '#/components/schemas/Category'
 *          404: 
 *              description: budget not exist  
 */
router.get("/category/:id", validateToken, function (req, res) {
    const { id } = req.params;
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  

    categorySchema.findById(id).then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

//listar gastos
/**
 * @swagger
 * /api/category:
 *  get:
 *   summary: return all Category
 *   tags:   [Category]
 *   responses:
 *    200:
 *     description: new category created
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Category'  
 */
router.get("/category", validateToken, function (req, res) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    

    categorySchema.find().then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

//actualizar gasto
/**
 * @swagger
 * /api/category/{id}:
 *  put:
 *      summary: category update
 *      tags:   [Category]
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
 *                      $ref: '#/components/schemas/Category'
 *      responses:
 *          '200':
 *             updated a category
 *          '404': 
 *              description: budget not exist
 *           
 *      
 */
router.put("/category/:id", validateToken, express.json(), function (req, res) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    

    const { id } = req.params;
    const { name, description, icon } = req.body;
    categorySchema.updateOne({ _id: id }, { $set: { name, description, icon } }).then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

//eliminar category
/**
 * @swagger
 * /api/category/{id}:
 *  delete:
 *      summary: delete a category
 *      tags:   [Category]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *      description: The id of operation 
 *      responses:
 *          '200':
 *             description: deleted a category
 *          '404': 
 *             description: category not exist
 */
router.delete("/category/:id", validateToken, function (req, res) {

    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  

    const { id } = req.params;
    categorySchema.deleteOne({ _id: id }).then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

module.exports = router;