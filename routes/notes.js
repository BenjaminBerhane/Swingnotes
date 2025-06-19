import express from 'express';
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  searchNotes
} from '../controllers/noteController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Alla routes kräver inloggning

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Hämta alla anteckningar för inloggad användare
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista med anteckningar
 *       401:
 *         description: Obehörig (saknar token)
 */
router.get('/', authenticateToken, getNotes);

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Skapa en ny anteckning
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, text]
 *             properties:
 *               title:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Anteckning skapad
 *       400:
 *         description: Fel i inskickad data
 */
router.post('/', authenticateToken, createNote);

/**
 * @swagger
 * /api/notes:
 *   put:
 *     summary: Uppdatera en anteckning
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, title, text]
 *             properties:
 *               id:
 *                 type: integer
 *               title:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Anteckning uppdaterad
 *       404:
 *         description: Anteckning hittades inte
 */
router.put('/', authenticateToken, updateNote);

/**
 * @swagger
 * /api/notes:
 *   delete:
 *     summary: Ta bort en anteckning
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id]
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Anteckning borttagen
 *       404:
 *         description: Anteckning hittades inte
 */
router.delete('/', authenticateToken, deleteNote);

/**
 * @swagger
 * /api/notes/search:
 *   get:
 *     summary: Sök efter anteckningar baserat på titel (VG-krav)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Sökterm (titel)
 *     responses:
 *       200:
 *         description: Lista med matchande anteckningar
 *       400:
 *         description: Ingen sökterm angiven
 */
router.get('/search', authenticateToken, searchNotes);

export default router;
