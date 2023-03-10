const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const idLength = 8;

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
 *           description: The bus plate
 *         driver:
 *           type: string
 *           description: The bus driver
 *       example:
 *         plate: KL3MS
 *         driver: Kellia Umuhire
 */

 /**
  * @swagger
  * tags:
  *   name: Buses
  *   description: The buses managing API
  */

/**
 * @swagger
 * /buses:
 *   get:
 *     summary: Returns the list of all the buses
 *     tags: [Buses]
 *     responses:
 *       200:
 *         description: The list of the Buses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bus'
 */

router.get("/", (req, res) => {
	const buses = req.app.db.get("buses");

	res.send(buses);
});

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

router.get("/:id", (req, res) => {
  const bus = req.app.db.get("buses").find({ id: req.params.id }).value();

  if(!bus){
    res.sendStatus(404)
  }

	res.send(bus);
});

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

router.post("/", (req, res) => {
	try {
		const bus = {
			id: nanoid(idLength),
			...req.body,
		};

    req.app.db.get("buses").push(bus).write();
    
    res.send(bus)
	} catch (error) {
		return res.status(500).send(error);
	}
});

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

router.put("/:id", (req, res) => {
	try {
		req.app.db
			.get("buses")
			.find({ id: req.params.id })
			.assign(req.body)
			.write();

		res.send(req.app.db.get("buses").find({ id: req.params.id }));
	} catch (error) {
		return res.status(500).send(error);
	}
});

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

router.delete("/:id", (req, res) => {
	req.app.db.get("buses").remove({ id: req.params.id }).write();

	res.sendStatus(200);
});

module.exports = router;
