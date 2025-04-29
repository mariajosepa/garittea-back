import prisma from '../prisma/client.js';

export const getAllPeople = async () => {

  return await prisma.person.findMany();
}

export const getPersonIdByName = async (name, lastname) => {
  return await prisma.person.findFirst({
    where: {
      name,
      lastname,
    },
    select: {
      idperson: true,
    },
  });
};
