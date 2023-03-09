import express from 'express'
const busRouter = express.Router()
import { nanoid } from 'nanoid'

const idLength = 8

/**
 * @swagger
 * components:
 *   schemas:
 *     Bus:
 *       type: object
 *       required:
 *         - plate
 *         - driver
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the bus
 *         plate:
 *           type: string
 *           description: The bus plate number
 *         driver:
 *           type: string
 *           description: The bus driver
 *       example:
 *         id: d5fE_asz
 *         plate: RDF 5KM3H
 *         driver: Mary Mutishibi
 */

/**
  * @swagger
  * tags:
  *   name: Buses
  *   description: The Buses managing API
  */

/**
 * @swagger
 * /buses:
 *   get:
 *     summary: Returns the list of all the buses
 *     tags: [Buses]
 *     responses:
 *       200:
 *         description: The list of the buses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bus'
 */

busRouter.get('/', (req, res) => {
    // const buses = req.app.db.get('buses')

    // res.send(buses)
    res.send([{id: '1', plateNumber: 'RAB 05734 KXH'},{id: '2', plateNumber: 'RAB 05734 KXH'}])
})

/**
 * @swagger
 * /buses/{id}:
 *   get:
 *     summary: Get the bus by id
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The bus id
 *     responses:
 *       200:
 *         description: The bus description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       404:
 *         description: The bus was not found
 */

busRouter.get('/:id', (req, res) => {
    // const bus = req.app.db.get('buses').find({ id: req.params.id }).value()

    // if(!bus){
    //     res.sendStatus(404)
    // }

    // res.send(bus)
    res.send([{id: '1', plateNumber: 'RAB 05734 KXH'},])
})

/**
 * @swagger
 * /buses:
 *   post:
 *     summary: Create a new bus
 *     tags: [Buses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       200:
 *         description: The bus was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       500:
 *         description: Some server error
 */

busRouter.post('/', (req, res) => {
    try {
        // const bus = {
        //     id: nanoid(idLength),
        //     ...req.body,
        // }

        // req.app.db.get('buses').push(bus).write()
    
        // res.send(bus)

        res.send([{success: true, data: {id: '3', plateNumber: 'RAB 05734 KXH'}}])
    } catch (error) {
        return res.status(500).send(error)
    }
})

/**
 * @swagger
 * /buses/{id}:
 *  put:
 *    summary: Update the bus by the id
 *    tags: [Buses]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The bus id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Bus'
 *    responses:
 *      200:
 *        description: The bus was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Bus'
 *      404:
 *        description: The bus was not found
 *      500:
 *        description: Some error happened
 */

busRouter.put('/:id', (req, res) => {
    try {
        // req.app.db
        //     .get('buses')
        //     .find({ id: req.params.id })
        //     .assign(req.body)
        //     .write()

        // res.send(req.app.db.get('buses').find({ id: req.params.id }))
        res.send([{id: '1', plateNumber: 'RAB 05734 KXH'},{id: '2', plateNumber: 'RAB 05734 KXH'}])
    } catch (error) {
        return res.status(500).send(error)
    }
})

/**
 * @swagger
 * /buses/{id}:
 *   delete:
 *     summary: Remove the bus by id
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The bus id
 * 
 *     responses:
 *       200:
 *         description: The bus was deleted
 *       404:
 *         description: The bus was not found
 */

busRouter.delete('/:id', (req, res) => {
    // req.app.db.get('buses').remove({ id: req.params.id }).write();

    res.sendStatus(200)
})

export default busRouter