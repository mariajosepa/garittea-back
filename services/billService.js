import prisma from '../prisma/client.js';

export const createBill = async ({ idbill, orderId, billDate = new Date() }) => {
  return await prisma.bill.create({
    data: {
      idbill,           // ID externo (consecutivo)
      orderId,
      billdate: billDate,
      state: 'activo'
    }
  });
};

export const createBillForOrder = async (orderId, idbill) => {
  return await prisma.bill.create({
    data: {
      idbill,            // Debe venir generado
      orderId,
      billdate: new Date(),
      state: 'activo'
    }
  });
};

export const updateBillStateById = async (idbill, newState) => {
  return await prisma.bill.updateMany({
    where: { idbill },
    data: { state: newState }
  });
};

export const findAssociatedNotes = async (consecutivos) => {
  const parsedIds = consecutivos
    .map(c => parseInt(c.replace(/\D/g, ''), 10))
    .filter(Boolean);

  const bills = await prisma.bill.findMany({
    where: {
      idbill: { in: parsedIds }
    },
    include: {
      initialNotes: {
        include: {
          finalBill: true
        }
      }
    }
  });

  const result = bills.map(bill => {
    const latestNote = bill.initialNotes.length > 0
      ? bill.initialNotes[bill.initialNotes.length - 1]
      : null;

    return {
      idbill: bill.idbill,
      stateBill: bill.state,
      hasNote: latestNote ? 'sí' : 'no',
      idNote: latestNote?.idcreditNote ?? null,
      amountNote: latestNote?.amount ?? null,
      reasonNote: latestNote?.reason ?? null,
      wasReplaced: latestNote?.finalBill? 'sí' : 'no',
      replacedBy: latestNote?.finalBill?.idbill ?? null
    };
  });

  return result;
};


