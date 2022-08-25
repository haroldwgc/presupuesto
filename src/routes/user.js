const express = require('express');
const userSchema = require("../models/user");
const router = express.Router();
const validateToken = require('../helper');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { use } = require('./budget');

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties: 
 *              user:
 *                  type: string
 *                  description: user login
 *              name:
 *                  type: string
 *                  description: name user
 *              email:
 *                  type: string
 *                  description: email login
 *              password:
 *                  type: string
 *                  description: password login
 *              created:
 *                  type: string
 *                  description: created date           
 *          required:
 *              - user
 *              - name
 *              - mail
 *              - password
 *              - created
 *          example:
 *              user: "harold"
 *              name: "harold williams guerra"
 *              mail: "haroldwgc@gmail.com"
 *              password: "sdtwertweret"
 *              created: '2022-03-02'
 *                    
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Login:
 *          type: object
 *          properties: 
 *              user:
 *                  type: string
 *                  description: user login
 *              password:
 *                  type: string
 *                  description: password login
 *              created:
 *                  type: string
 *                  description: created date           
 *          required:
 *              - user
 *              - password
 *              - created
 *          example:
 *              user: "harold"
 *              password: "sdtwertweret"
 *              created: '2022-03-02'
 *                    
 */

//Autenticar
/**
 * @swagger
 * /api/auth:
 *  post:
 *      summary: create a new operation
 *      tags:   [Login]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: new operation created
 *                 
 */
router.post("/auth", express.json(),async function (req, res) {

    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
 

    const body = req.body;

    const user=await userSchema.findOne({user:body.user});

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
        const username = { username: user }
        const accessToken = generateAccesToken(username)
        res.header('authorization', accessToken).json({ user: user, token: accessToken })
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
   
});


function generateAccesToken(user) {
    return jwt.sign(user, process.env.SECRET, { expiresIn: process.env.TIMEEXPIRED})
}

//Crear usuario
/**
 * @swagger
 * /api/user:
 *  post:
 *      summary: create a new usuario
 *      tags:   [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          '200':
 *              description: new user created
 *           
 *      
 */
 router.post("/user", express.json(), async function (req, res) {
    const salt = await bcrypt.genSalt(10);
    const user = userSchema(req.body);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save().then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

//obtener user
/**
 * @swagger
 * /api/user/{id}:
 *  get:
 *      summary: return user by id
 *      tags:   [User]
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
 *                               $ref: '#/components/schemas/User'
 *          '404': 
 *              description: user not exist  
 */

router.get("/user/:id", validateToken, async function (req, res) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
 
    const { id } = req.params;
    await userSchema.findById(id).then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});


/**
 * @swagger
 * /api/user:
 *  get:
 *   summary: return all User
 *   tags:   [User]
 *   responses:
 *    200:
 *     description: get users 
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/User'
 */
//listar budget
router.get("/user", validateToken, async function (req, res) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
   

    await userSchema.find().then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

//update user
/**
 * @swagger
 * /api/user/{id}:
 *  put:
 *   summary: update
 *   tags: [User]
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
 *           $ref: '#/components/schemas/User'
 *   responses:
 *        '200':
 *           description: updated a user
 *        '404': 
 *           description: user not exist 
 */
//actualizar user
router.put("/user/:id", validateToken, express.json(), async function (req, res) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
   

    const { id } = req.params;
    const { user, password} = req.body;
    await userSchema.updateOne({ _id: id }, { $set: { user, idCategory, password} }).then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

//eliminar user
/**
 * @swagger
 * /api/yuser/{id}:
 *  delete:
 *   summary: update
 *   tags: [User]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *   description: The id of operation 
 *   responses:
 *        '200':
 *           description: updated a user
 *        '404': 
 *           description: user not exist 
 */
router.delete("/user/:id", express.json(), async function (req, res) {

    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  

    const { id } = req.params;
    await userSchema.deleteOne({ _id: id }).then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});



module.exports = router;