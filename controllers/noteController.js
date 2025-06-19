import pool from '../config/db.js';

// Hämta alla anteckningar för inloggad användare
export async function getNotes(req, res) {
  try {
    const result = await pool.query(
      'SELECT * FROM notes WHERE user_id = $1',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Kunde inte hämta anteckningar' });
  }
}

// Skapa ny anteckning
export async function createNote(req, res) {
  const { title, text } = req.body;

  if (!title || !text) {
    return res.status(400).json({ message: 'Titel och text krävs' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO notes (title, text, user_id) 
       VALUES ($1, $2, $3) RETURNING *`,
      [title, text, req.user.id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Kunde inte spara anteckning' });
  }
}

// Ändra anteckning
export async function updateNote(req, res) {
  const { id, title, text } = req.body;

  try {
    const result = await pool.query(
      `UPDATE notes 
       SET title = $1, text = $2, modified_at = CURRENT_TIMESTAMP 
       WHERE id = $3 AND user_id = $4 
       RETURNING *`,
      [title, text, id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Anteckning hittades inte' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Kunde inte uppdatera anteckning' });
  }
}

// Ta bort anteckning
export async function deleteNote(req, res) {
  const { id } = req.body;

  try {
    const result = await pool.query(
      `DELETE FROM notes 
       WHERE id = $1 AND user_id = $2 
       RETURNING *`,
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Anteckning hittades inte' });
    }

    res.json({ message: 'Anteckning borttagen' });
  } catch (err) {
    res.status(500).json({ message: 'Kunde inte ta bort anteckning' });
  }
}
// Sök anteckningar baserat på titel
export const searchNotes = async (req, res) => {
  const userId = req.user.id;
  const searchQuery = req.query.q;

  if (!searchQuery) {
    return res.status(400).json({ error: 'Sökterm saknas' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM notes WHERE user_id = $1 AND title ILIKE $2',
      [userId, `%${searchQuery}%`]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Fel vid sökning:', err);
    res.status(500).json({ error: 'Internt serverfel' });
  }
};