import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
  // 1) Mira si viene en Authorization
  let token = null;
  const auth = req.headers.authorization;
  if (auth?.startsWith('Bearer ')) {
    token = auth.split(' ')[1];
  }
  // 2) Si no, busca en cookies (cookie-parser llenó req.cookies)
  else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.userId = payload.userId;
    next();
  });
};