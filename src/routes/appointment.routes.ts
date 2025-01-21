import { Router } from 'express';
import { AppointmentController } from '../controllers/appointment.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { appointmentSchema } from '../validators/appointment.validator';

const router = Router();
const controller = new AppointmentController();

router.post('/', validateRequest(appointmentSchema), (req, res) => void controller.createAppointment(req, res));
router.get('/', (req, res) => void controller.getAppointments(req, res));
router.get('/:id', (req, res) => void controller.getAppointmentById(req, res));
router.put('/:id', validateRequest(appointmentSchema), (req, res) => void controller.updateAppointment(req, res));
router.delete('/:id', (req, res) => void controller.deleteAppointment(req, res));

export default router;

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     tags: [Appointments]
 *     summary: Get all appointments
 *     responses:
 *       200:
 *         description: List of appointments retrieved successfully
 * 
 *   post:
 *     tags: [Appointments]
 *     summary: Create new patient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, PENDING,CANCELLED]
 *               date:
 *                 type: string
 *                 format: date
 * 
 * /api/appointments/{id}:
 *   get:
 *     tags: [Appointments]
 *     summary: Get patient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *   
 *   put:
 *     tags: [Appointments]
 *     summary: Update patient
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *   
 *   delete:
 *     tags: [Appointments]
 *     summary: Delete patient
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */

