import prisma from '../prisma/client.js';
import bcrypt from 'bcrypt';

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

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return await prisma.users.create({
        data: {
            email,
            password: hashedPassword,
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

export const updateUser = async (id, userData) => {
    const { email, password, firstname, lastname, role } = userData;
    
    if (!email || !firstname || !lastname || !role) {
        throw new Error('Los campos email, firstname, lastname y role son requeridos');
    }

    const updateData = {
        email,
        firstname,
        lastname,
        role: Number(role)
    };

    // Si se proporciona password, hashearlo antes de actualizar
    if (password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(password, salt);
    }

    return await prisma.users.update({
        where: { idusers: Number(id) },
        data: updateData
    });
};

export const deleteUser = async (id) => {
    return await prisma.users.delete({
        where: { idusers: Number(id) }
    });
};