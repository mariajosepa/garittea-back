import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client.js';

export async function authenticateUser(email, password) {
  if (!email || !password) {
    const err = new Error('Email y contraseña son obligatorios');
    err.status = 400;
    throw err;
  }
  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) {
    const err = new Error('Credenciales inválidas');
    err.status = 401;
    throw err;
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    const err = new Error('Credenciales inválidas');
    err.status = 401;
    throw err;
  }
  return user;
}

export function generateToken(userId) {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '168h' }
  );
}