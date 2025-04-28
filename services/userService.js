import bcrypt from 'bcrypt';
import prisma from '../prisma/client.js';

export async function createUser(email, password, firstname, lastname) {
  if (!email || !password) {
    const err = new Error('Email y contraseña son obligatorios');
    err.status = 400;
    throw err;
  }

  const existingUser = await prisma.users.findUnique({ where: { email } });
  if (existingUser) {
    const err = new Error('El email ya está en uso');
    err.status = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.users.create({
    data: {
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: passwordHash,
    },
  });

  return user;
}