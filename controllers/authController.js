import { authenticateUser, generateToken } from '../services/authService.js';

export const login = async (req, res) => {
  console.log('🔐 Login endpoint hit');
  try {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
    const token = generateToken(user.idusers);
    return res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        secure: true,
        maxAge: 1000 * 60 * 60 * 2, // 2 horas
      })
      .json({ ok: true });
  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({ message: error.message });
  }
};

export const me = (req, res) => {
  // authenticateJWT ya puso req.userId si la cookie es buena
  res.json({ userId: req.userId });
};

export const logout = (req, res) => {
  return res
    .clearCookie('token', { httpOnly: true, sameSite: 'strict' })
    .json({ ok: true });
};

export const checkAuth = (req, res) => {
  return res.json({ ok: true });
};

export const checkAuthAdmin = (req, res) => {
  if (req.userId !== 1) {
    return res.status(403).json({ message: 'No tienes permisos para acceder a esta ruta' });
  }
  return res.json({ ok: true });
}