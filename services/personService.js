import prisma from '../prisma/client.js';

export const getAllPeople = async () => {

  return await prisma.person.findMany();
}