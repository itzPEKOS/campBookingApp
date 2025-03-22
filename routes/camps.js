const express = require('express');
const {getCamps, getCamp, createCamp, updateCamp, deleteCamp} = require('../controllers/camps');

//Include other resource routers
const bookingRouter = require('./bookings');

const router = express.Router();

const {protect,authorize} = require('../middleware/auth');

//Re-route into other resource router
router.use('/:campId/bookings/',bookingRouter);

router.route('/').get(getCamps).post(protect, authorize('admin'), createCamp);
router.route('/:id').get(getCamp).put(protect, authorize('admin'), updateCamp).delete(protect, authorize('admin'), deleteCamp);

module.exports = router;


//Camp model
/**
 * @swagger
 * components:
 *   schemas:
 *     Camp:
 *       type: object
 *       required:
 *         - name
 *         - address
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the camp
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         ลำดับ:
 *           type: string
 *           description: Ordinal number
 *         name:
 *           type: string
 *           description: Camp number
 *         address:
 *           type: string
 *           description: House No., Street, Road
 *         district:
 *           type: string
 *           description: District
 *         province:
 *           type: string
 *           description: province
 *         postalcode:
 *           type: string
 *           description: 5-digit postal code
 *         tel:
 *           type: string
 *           description: telephone number
 *         region:
 *           type: string
 *           description: region
 *         picture:
 *           type: string
 *         example:
 *           id: 609bda561452242d88d36e37
 *           ลำดับ: 121
 *           name: Happy Camp
 *           address: 121 ถ.สุขุมวิท
 *           district: บางนา
 *           province: กรุงเทพมหานคร
 *           postalcode: 10110
 *           tel: 02-2187000
 *           region: กรุงเทพมหานคร(Bangkok)
 *           picture: https://xxxxxxx.com
 */

//Camp tag
/**
 * @swagger
 * tags:
 *   name: Camps
 *   description: The camps managing API
 */

//Get all camps
/**
 * @swagger
 * /camps:
 *   get:
 *     summary: Returns the list of all the camps
 *     tags: [Camps]
 *     responses:
 *       200:
 *         description: The list of the camps
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Camp'
 */

//Get one camp
/**
 * @swagger
 * /camps/{id}:
 *   get:
 *     summary: Get the camp by id
 *     tags: [Camps]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The camp id
 *     responses:
 *       200:
 *         description: The camp description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Camp'
 *       404:
 *         description: The camp was not found
 */

//Add one camp
/**
 * @swagger
 * /camps:
 *   post:
 *     summary: Create a new camp
 *     tags: [Camps]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Camp'
 *     responses:
 *       201:
 *         description: The camp was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Camp'
 *       500:
 *         description: Some server error
 */

//Update the camp
/**
 * @swagger
 * /camps/{id}:
 *   put:
 *     summary: Update the camp by the id
 *     tags: [Camps]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The camp id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Camp'
 *     responses:
 *       200:
 *         description: The camp was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Camp'
 *       404:
 *         description: The camp was not found
 *       500:
 *         description: Some error happened
 */

//Delete the camp
/**
 * @swagger
 * /camps/{id}:
 *   delete:
 *     summary: Remove the camp by id
 *     tags: [Camps]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The camp id
 * 
 *     responses:
 *       200:
 *         description: The camp was deleted
 *       404:
 *         description: The camp was not found
 */