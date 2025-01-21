import { Router } from 'express';
import { PatientController } from '../controllers/patient.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { patientSchema } from '../validators/patient.validator';

const router = Router();
const controller = new PatientController();

router.post('/', validateRequest(patientSchema), (req, res) => void controller.createPatient(req, res));
router.get('/', (req, res) => void controller.getPatients(req, res));
router.get('/:id', (req, res) => void controller.getPatientById(req, res));
router.put('/:id', validateRequest(patientSchema), (req, res) => void controller.updatePatient(req, res));
router.delete('/:id', (req, res) => void controller.deletePatient(req, res));

export default router;

/**
 * @swagger
 * /api/patients:
 *   get:
 *     tags: [Patients]
 *     summary: Get all patients
 *     responses:
 *       200:
 *         description: List of patients retrieved successfully
 * 
 *   post:
 *     tags: [Patients]
 *     summary: Create new patient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [MALE, FEMALE]
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               address:
 *                 type: string
 *               medicalHistory:
 *                 type: object
 * 
 * /api/patients/{id}:
 *   get:
 *     tags: [Patients]
 *     summary: Get patient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *   
 *   put:
 *     tags: [Patients]
 *     summary: Update patient
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *   
 *   delete:
 *     tags: [Patients]
 *     summary: Delete patient
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */

