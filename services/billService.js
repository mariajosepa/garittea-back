import prisma from '../prisma/client.js';

export const createBill = async ({ creditId, billDate = new Date() }) => {
  return await prisma.bill.create({
    data: {
      creditId,
      billdate: billDate,
    }
  });
};

// NOTA: A futuro podrías aquí también crear una creditNote si detectas diferencias de montos.
