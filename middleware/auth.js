import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  // Tokenen måste skickas som "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Ingen token. Åtkomst nekad.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // sparar decoded info i request-objektet
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Ogiltig eller utgången token.' });
  }
}
