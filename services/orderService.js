import prisma from '../prisma/client.js';

// Get all orders
export const getAllOrders = async () => {
  return await prisma.order.findMany({
    orderBy: { idOrder: 'desc' },
    include: {
      users: true,
      applicant: true,
      manager: true,
      facultyRel: true,
    },
  });
};

// Get orders by dates
export const getOrdersByDates = async (startDate, endDate) => {
  if (!startDate || !endDate) {
    throw new Error('Start date and end date are required');
  }
  if (new Date(startDate) > new Date(endDate)) {
    throw new Error('Start date must be before end date');
  }

  return await prisma.order.findMany({
    where: {
      creationdate: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
    include: {
      users: true,
      applicant: true,
      manager: true,
      facultyRel: true,
    },
  });
};

// Get order by id
export const getOrderById = async (id) => {
  return await prisma.order.findUnique({
    where: { idOrder: Number(id) },
    include: {
      users: true,
      applicant: true,
      manager: true,
      facultyRel: true,
    },
  });
};

// Delete order by id
export const deleteOrderById = async (id) => {
  const numericId = Number(id);

  const order = await prisma.order.findUnique({
    where: { idOrder: numericId },
    include: {
      bill: true,
    },
  });

  if (!order) {
    throw new Error('Pedido no encontrado');
  }

  if (order.bill) {
    throw new Error('No se puede eliminar un pedido que ya tiene una factura asociada.');
  }

  await prisma.order.delete({
    where: { idOrder: numericId },
  });

  return { deletedId: numericId };
};

// Update order by id
export const updateOrderById = async (id, data) => {
  const numericId = Number(id);

  const order = await prisma.order.findUnique({
    where: { idOrder: numericId },
    include: {
      bill: true,
    },
  });

  if (!order) {
    throw new Error('Pedido no encontrado.');
  }

  const updateData = {};

  if (data.managingPersonId) {
    updateData.manager = {
      connect: { idperson: data.managingPersonId },
    };
  }

  if (data.debtAmount !== undefined) {
    updateData.debtamount = data.debtAmount;
  }

  if (data.state !== undefined) {
    updateData.state = data.state;
  }

  const updatedOrder = await prisma.order.update({
    where: { idOrder: numericId },
    data: updateData,
    include: {
      users: true,
      applicant: true,
      manager: true,
      facultyRel: true,
    },
  });

  return updatedOrder;
};

// Get orders by managing person
export const getOrdersByIdManagingPerson = async (id) => {
  if (!id) {
    throw new Error('Managing person ID is required');
  }

  return await prisma.order.findMany({
    where: {
      managingperson: Number(id),
    },
    include: {
      users: true,
      applicant: true,
      manager: true,
      facultyRel: true,
    },
  });
};

// Post a new order
export const postOrder = async (orderData) => {
  const { userId, applicantId, managingPersonId, facultyId, debtAmount } = orderData;
  if (!userId || !applicantId || !managingPersonId || !facultyId || !debtAmount) {
    throw new Error('All fields are required');
  }
  if (isNaN(debtAmount)) {
    throw new Error('Debt amount must be a number');
  }

  const userExists = await prisma.users.findUnique({ where: { idusers: userId } });
  const applicantExists = await prisma.person.findUnique({ where: { idperson: applicantId } });
  const managerExists = await prisma.person.findUnique({ where: { idperson: managingPersonId } });
  const facultyExists = await prisma.faculty.findUnique({ where: { idfaculty: facultyId } });

  if (!userExists || !applicantExists || !managerExists || !facultyExists) {
    throw new Error('User, applicant, manager or faculty does not exist');
  }

  return await prisma.order.create({
    data: {
      users: { connect: { idusers: userId } },
      applicant: { connect: { idperson: applicantId } },
      manager: { connect: { idperson: managingPersonId } },
      facultyRel: { connect: { idfaculty: facultyId } },
      debtamount: debtAmount,
      state:4,
    },
    include: {
      users: true,
      applicant: true,
      manager: true,
      facultyRel: true,
    },
  });
};

// Get orders by faculty and state
export const getOrdersByFacultyAndState = async (facultyId, state) => {
  const whereClause = {};

  if (facultyId) {
    whereClause.faculty = Number(facultyId);
  }
  if (state && state.trim() !== '') {
    whereClause.state = Number(state);
  }

  return await prisma.order.findMany({
    where: whereClause,
    orderBy: { idOrder: 'desc' },
    include: {
      users: true,
      applicant: true,
      manager: true,
      facultyRel: true,
    },
  });
};
