import { Router } from "express";
import { nanoid } from "nanoid";

const router = Router();
const idLength = 8;

/**
 * @swagger
 * components:
 *   schemas:
 *     Route:
 *       type: object
 *       required:
 *         - route_name
 *         - bus_id
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the route
 *         route_name:
 *           type: string
 *           description: The name of the route
 *         bus_id:
 *           type: number
 *           description: The origin of the route
 *       example:
 *         route_name: GISOZI
 *         bus_id: 234353545
 */

/**
 * @swagger
 * tags:
 *   name: Routes
 *   description: The routes managing API
 */

/**
 * @swagger
 * /routes:
 *   get:
 *     summary: Returns the list of all the routes
 *     tags: [Routes]
 *     responses:
 *       200:
 *         description: The list of the routes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Route'
 */

router.get("/", (req, res) => {
  const routes = req.app.db.get("routes");

  res.send(routes);
});

/**
 * @swagger
 * /routes/{id}:
 *   get:
 *     summary: Get the route by id
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The route id
 *     responses:
 *       200:
 *         description: The route description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       404:
 *         description: The route was not found
 */

router.get("/:id", (req, res) => {
  const route = req.app.db.get("routes").find({ id: req.params.id }).value();

  if (!route) {
    res.sendStatus(404);
  }

  res.send(route);
});

/**
 * @swagger
 * /routes:
 *   post:
 *     summary: Create a new route
 *     tags: [Routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Route'
 *     responses:
 *       200:
 *         description: The route was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       500:
 *         description: Some server error
 */

// eslint-disable-next-line consistent-return
router.post("/", (req, res) => {
  try {
    const route = {
      id: nanoid(idLength),
      ...req.body,
    };

    req.app.db.get("routes").push(route).write();

    res.send(route);
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /routes/{id}:
 *  put:
 *    summary: Update the routes by the id
 *    tags: [Routes]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The route id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Route'
 *    responses:
 *      200:
 *        description: The routes was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Route'
 *      404:
 *        description: The route was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", (req, res) => {

    try {
        req.app.db
          .get("routes")
          .find({ id: req.params.id })
          .assign(req.body)
          .write();
    
        res.send(req.app.db.get("routes").find({ id: req.params.id }));
      } catch (error) {
        return res.status(500).send(error);
      }
  });

/**
 * @swagger
 * /routes/{id}:
 *   delete:
 *     summary: Remove the route by id
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The route id
 *
 *     responses:
 *       200:
 *         description: The route was deleted
 *       404:
 *         description: The route was not found
 */

router.delete("/:id", (req, res) => {
    req.app.db.get("routes").remove({ id: req.params.id }).write();
  
    res.sendStatus(200);
  });
  
  export default router;
  