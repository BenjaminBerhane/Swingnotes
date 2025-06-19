import express from 'express';
import { signup, login } from '../controllers/userController.js';

const router = express.Router();

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Skapa ett nytt konto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Konto skapat
 *       400:
 *         description: Fel i inskickad data
 */
router.post('/signup', signup);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Logga in och få JWT-token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inloggning lyckades
 *       401:
 *         description: Fel e-post eller lösenord
 */
router.post('/login', login);

export default router;

