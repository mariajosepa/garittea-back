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
  // Extraer información de facultad si existe
  const numericId = Number(id);

  // Preparar objeto para la actualización
  const updateData = {
    ...otherData,
    name: firstname,
    email: {
      update: {
        email: data.email,
      },
    },
  };

  // Si se proporciona una facultad, conectar con ella usando su ID
  if (faculty && Array.isArray(faculty) && faculty.length > 0) {
    updateData.faculty = {
      // Desconectar facultades anteriores
      set: [],
      // Conectar con la(s) nueva(s) facultad(es)
      connect: faculty
        .filter(fac => fac && fac.id) // Filtrar facultades válidas
        .map(fac => ({ 
          idfaculty: Number(fac.id)
        }))
    };
  } else {
    // Si no hay facultades, desconectar todas
    updateData.faculty = {
      set: []
    };
  }

return await prisma.person.update({
    where: { idperson: numericId },
    data: updateData,
    include: {
      email: true,
      faculty: true,
    }
  });
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
  const { faculty, firstname, id, ...otherData } = data; // Añadir 'id' aquí para eliminarlo

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
}