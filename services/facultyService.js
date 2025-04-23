import prisma from '../prisma/client.js';

export const getAllFaculties = async () => {
    return await prisma.faculty.findMany({
        include: {
            person: true,
            facultyEmail: true
        },
    });
}