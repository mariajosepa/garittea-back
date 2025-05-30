import {
    getAllUsers,
    getUserById,
    createUser,
    searchUsers,
    updateUser,
    deleteUser
} from '../services/userService.js';
import { formatUser } from '../formatters/userFormatter.js';

export const getAllUsersHandler = async (req, res) => {
    try {
        const users = await getAllUsers();
        const formatted = users.map(formatUser);
        res.status(200).json(formatted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.status(200).json(formatUser(user));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createUserHandler = async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(formatUser(user));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const searchUsersHandler = async (req, res) => {
    const { firstname } = req.query;
    try {
        const users = await searchUsers(firstname);
        const formatted = users.map(formatUser);
        res.status(200).json(formatted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUserHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await updateUser(id, req.body);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.status(200).json(formatUser(user));
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(500).json({ error: error.message });
    }
};

export const deleteUserHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await deleteUser(id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.status(200).json({ 
            message: 'Usuario eliminado exitosamente',
            user: formatUser(user)
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(500).json({ error: error.message });
    }
};