import prisma from '../prisma/client.js';

export const getAllFaculties = async () => {
    return await prisma.faculty.findMany({
        include: {
            person: true,
            facultyEmail: true
        },
    });
}

export const getFacultyIdByName = async (name) => {
  return await prisma.faculty.findUnique({
    where: { name },
    select: { idfaculty: true },
  });
};
