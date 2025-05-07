import prisma from '../prisma/client.js';

export const getAllFaculties = async () => {
    return await prisma.faculty.findMany({
      orderBy: {
        idfaculty: 'asc',
      },
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

export const createFaculty = async (facultyData) => {
  const { inchargeperson, facultyEmail, ...baseData } = facultyData;
  
  const createData = {
    ...baseData,
    associatedemails: ''  // Añadir este campo requerido con un valor por defecto
  };
  
  // Si hay una persona a cargo, conectarla usando la relación person
  if (inchargeperson && inchargeperson.id) {
    createData.person = {
      connect: { idperson: Number(inchargeperson.id) }
    };
  }
  
  // Si hay un email, crearlo
  if (facultyEmail && facultyEmail.email) {
    createData.facultyEmail = {
      create: { email: facultyEmail.email }
    };
  }
  
  return await prisma.faculty.create({
    data: createData,
    include: {
      person: true,
      facultyEmail: true
    }
  });
};

export const updateFaculty = async (id, facultyData) => {
  try {
    const { inchargeperson, facultyEmail, ...baseData } = facultyData;
    
    // Obtener la facultad actual para verificar su estado
    const currentFaculty = await prisma.faculty.findUnique({
      where: { idfaculty: Number(id) },
      include: { facultyEmail: true }
    });
    
    if (!currentFaculty) {
      throw new Error(`Faculty with ID ${id} not found`);
    }
    
    const updateData = { ...baseData };
    
    // Manejar la relación person de forma más robusta
    if (inchargeperson !== undefined) {
      if (inchargeperson && inchargeperson.id && inchargeperson.id !== '0') {
        updateData.person = {
          connect: { idperson: Number(inchargeperson.id) }
        };
      } else {
        // Solo desconectar si explícitamente se proporciona null/vacío
        updateData.person = { disconnect: true };
      }
    }
    
    // Manejar el email usando una transacción para garantizar consistencia
    if (facultyEmail && facultyEmail.email) {
      if (currentFaculty.facultyEmail) {
        // Si ya existe un email, actualizarlo directamente
        await prisma.facultyEmail.update({
          where: { idEmail: currentFaculty.facultyEmail.idEmail },
          data: { email: facultyEmail.email }
        });
      } else {
        // Si no existe email, crear uno nuevo
        updateData.facultyEmail = {
          create: { email: facultyEmail.email }
        };
      }
    }
    
    // Realizar la actualización principal de la facultad
    return await prisma.faculty.update({
      where: { idfaculty: Number(id) },
      data: updateData,
      include: {
        person: true,
        facultyEmail: true
      }
    });
  } catch (error) {
    console.error('Error updating faculty:', error);
    throw error;
  }
};

export const deleteFaculty = async (id) => {
  const numericId = Number(id);
  
  try {
    // Primero verificamos si hay órdenes relacionadas
    const relatedOrders = await prisma.order.findMany({
      where: {
        faculty: numericId
      },
      select: {
        idOrder: true
      }
    });
    
    if (relatedOrders.length > 0) {
      throw new Error('No se puede eliminar esta facultad porque está asociada con órdenes existentes');
    }
    
    // Eliminar emails relacionados usando el nombre correcto del campo
    await prisma.facultyEmail.deleteMany({
      where: { 
        facultyId: numericId  // Corregido: facultyId con 'I' mayúscula
      }
    });
    
    // Ahora eliminar la facultad
    return await prisma.faculty.delete({
      where: { idfaculty: numericId },
    });
  } catch (error) {
    console.error('Error deleting faculty:', error);
    throw error;
  }
};