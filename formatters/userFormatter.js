export function formatUser(user) {
    if (!user) {
        console.error('formatUser recibió un usuario nulo o indefinido');
        return null;
    }

    try {
        return {
            id: user.idusers,
            email: user.email || '',
            nombre: user.firstname && user.lastname 
                ? `${user.firstname} ${user.lastname}`
                : 'Sin nombre',
            rol: getRoleName(user.role)
        };
    } catch (error) {
        console.error('Error al formatear usuario:', error);
        return null;
    }
}

function getRoleName(roleNumber) {
    switch (Number(roleNumber)) {
        case 1:
            return 'Superusuario';
        case 2:
            return 'Administrador';
        case 3:
            return 'Colaborador';
        default:
            return 'Rol desconocido';
    }
}

export function formatUserList(users) {
    if (!Array.isArray(users)) {
        console.error('formatUserList recibió:', typeof users);
        return [];
    }

    try {
        return users
            .map(user => formatUser(user))
            .filter(user => user !== null);
    } catch (error) {
        console.error('Error al formatear lista de usuarios:', error);
        return [];
    }
}