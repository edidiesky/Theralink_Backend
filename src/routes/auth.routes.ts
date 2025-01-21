import { Router, Request, Response } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { signupSchema, loginSchema, forgotPasswordSchema,resetPasswordSchema } from '../validators/auth.validator';


const router = Router();
const controller = new AuthController();

router.post('/signup', 
    validateRequest(signupSchema), 
    (req: Request, res: Response): void => {
        void controller.signup(req, res);
    }
);

router.post('/login', 
    validateRequest(loginSchema), 
    (req: Request, res: Response): void => {
        void controller.login(req, res);
    }
);

router.post(
    '/forgot-password', 
    validateRequest(forgotPasswordSchema), 
    (req: Request, res: Response): void => {
        void controller.forgotPassword(req, res);
    }
);

router.post(
    '/reset-password', 
    validateRequest(resetPasswordSchema), 
    (req: Request, res: Response): void => {
        void controller.resetPassword(req, res);
    }
);


export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         email:
 *           type: string
 *           format: email
 *         username:
 *           type: string
 *         role:
 *           type: string
 *           enum: [ADMIN, CLIENT]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * /api/auth/signup:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     description: |
 *       Creates new user and sends credentials via email.
 *       
 *       Email Template:
 *       Subject: "Your Theralink Account Credentials"
 *       
 *       Format:
 * 
 *       Welcome to Theralink!
 * 
 *       Your account has been created successfully.
 * 
 *       Username: {username}
 * 
 *       Password: {password}
 * 
 *       Please login and change your password for security purposes.
 * 
 *       Best regards,
 * 
 *       Theralink Team
 *  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               role:
 *                 type: string
 *                 enum: [ADMIN, CLIENT]
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 credentials:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     password:
 *                       type: string
 *                 token:
 *                   type: string
 * 
 * /api/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Authenticate user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 */

// Add new endpoints

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     tags: [Authentication]
 *     summary: Request password reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Reset email sent successfully
 * 
 * /api/auth/reset-password:
 *   post:
 *     tags: [Authentication]
 *     summary: Reset password with token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *                 example: "reset-token"
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: "newSecurepassword1"
 *     responses:
 *       200:
 *         description: Password updated successfully
 */
