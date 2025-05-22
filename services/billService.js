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

  const notes = await prisma.creditNote.findMany({
    where: {
      initialBill: {
        idbill: { in: parsedIds },
      },
    },
    include: {
      initialBill: true,
      finalBill: true,
    },
  });

  return notes.map(note => ({
    idNote: note.idcreditNote,
    idInitialBill: note.initialBill?.idbill ?? null,
    idFinalBill: note.finalBill?.idbill ?? null,
    reason: note.reason,
    amount: note.amount,
  }));
};

