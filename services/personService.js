import prisma from '../prisma/client.js';

export const getAllPeople = async () => {
  return await prisma.person.findMany({
    orderBy: {
      idperson: 'asc',
    },
    include: {
      email: true,
      faculty: true,
    }
  });
};

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

export const updatePerson = async (id, data) => {
  const numericId = Number(id);

  // Desestructurar los campos que vienen del frontend
  // Asegúrate de que 'data' contenga 'firstname', 'lastname', 'cellphone', 'email'
  const { firstname, lastname, cellphone, email, faculty } = data; //

  // Prepara los datos para la actualización en Prisma
  const updateData = {
    // Mapea 'firstname' a 'name' si tu columna en la DB es 'name'
    name: firstname,
    lastname: lastname,
    cellphone: cellphone,
    email: {
      update: {
        email: email, // El campo 'email' de la tabla 'email' se actualiza con el 'email' de los datos recibidos
      },
    },
  };

  // Lógica para manejar la relación de facultad
  if (faculty && Array.isArray(faculty) && faculty.length > 0) {
    updateData.faculty = {
      // Primero, desconecta todas las facultades existentes
      set: [],
      // Luego, conecta las nuevas facultades
      connect: faculty
        .filter(fac => fac && fac.id) // Asegura que fac y fac.id existan
        .map(fac => ({
          idfaculty: Number(fac.id) // Convierte a número y usa idfaculty, como espera tu DB
        }))
    };
  } else {
    // Si no se proporciona facultad o está vacía, desconecta todas las facultades existentes
    updateData.faculty = {
      set: []
    };
  }

  try {
    return await prisma.person.update({
      where: { idperson: numericId },
      data: updateData,
      include: { // Incluye las relaciones para devolver la persona completa y actualizada
        email: true,
        faculty: true,
      }
    });
  } catch (error) {
    console.error('Error updating person:', error);
    throw error; // Propaga el error para que el frontend pueda manejarlo
  }
};

export const deletePerson = async (id) => {
  try {
    const numericId = Number(id);

    // Verificar si la persona está relacionada como aplicante o administrador en alguna orden
    const relatedOrders = await prisma.order.findMany({
      where: {
        OR: [
          { applicantperson: numericId },
          { managingperson: numericId }
        ]
      },
      select: {
        idOrder: true
      }
    });

    // Si hay órdenes relacionadas, impedir la eliminación
    if (relatedOrders.length > 0) {
      throw new Error('No se puede eliminar esta persona porque está asociada con órdenes existentes');
    }

    // Si no hay órdenes relacionadas, procedemos con la eliminación

    // Primero, eliminar emails relacionados
    await prisma.email.deleteMany({
      where: { personId: numericId }
    });

    // Desconectar de facultades (si es necesario)
    await prisma.person.update({
      where: { idperson: numericId },
      data: {
        faculty: {
          set: []
        }
      }
    });

    // Finalmente, eliminar la persona
    return await prisma.person.delete({
      where: { idperson: numericId }
    });
  } catch (error) {
    console.error('Error deleting person:', error);
    throw error;
  }
};

export const createPerson = async (data) => {
  // Extraer y descartar el campo id, junto con otra información
  const { faculty, firstname, id, ...otherData } = data; //

  // Preparar objeto para la creación
  const createData = {
    ...otherData,
    name: firstname,
    email: {
      create: {
        email: data.email,
      },
    },
  };

  // Si se proporciona una facultad, conectar con ella usando su ID
  if (faculty && Array.isArray(faculty) && faculty.length > 0) {
    createData.faculty = {
      connect: faculty
        .filter(fac => fac && fac.id) // Filtrar facultades válidas
        .map(fac => ({
          idfaculty: Number(fac.id)
        }))
    };
  }

  return await prisma.person.create({
    data: createData,
    include: {
      email: true,
      faculty: true,
    }
  });
};