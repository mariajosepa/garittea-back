import prisma from '../prisma/client.js';

export const getAllUsers = async () => {
    return await prisma.users.findMany({
        orderBy: { idusers: 'desc' }
    });
};

export const getUserById = async (id) => {
    return await prisma.users.findUnique({
        where: { idusers: Number(id) }
    });
};

export const createUser = async (userData) => {
    const { email, password, firstname, lastname, role } = userData;
    
    if (!email || !password || !firstname || !lastname || !role) {
        throw new Error('Todos los campos son requeridos');
    }

    return await prisma.users.create({
        data: {
            email,
            password, // Nota: Deberías hashear la contraseña antes
            firstname,
            lastname,
            role: Number(role)
        }
    });
};

export const searchUsers = async (firstname) => {
    return await prisma.users.findMany({
        where: {
            firstname: {
                contains: firstname,
                mode: 'insensitive'
            }
        }
    });
};