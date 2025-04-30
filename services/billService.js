import prisma from '../prisma/client.js';

export const createBill = async ({ creditId, billDate = new Date() }) => {
  return await prisma.bill.create({
    data: {
      creditId,
      billdate: billDate,
    }
  });
};


export const createBillForOrder = async (orderId) => {
  return await prisma.bill.create({
    data: {
      orderId,
      billdate: new Date(),
      state: 'activo'
    }
  });
};

export const updateBillStateById = async (idbill, newState) => {
  return await prisma.bill.update({
    where: { idbill },
    data: {
      state: newState
    }
  });
};

export const findAssociatedNotes = async (consecutivos) => {
  // Convierte a número los consecutivos (ej: "FEG 2684" → 2684)
  const parsedIds = consecutivos.map(c => parseInt(c.replace(/\D/g, ''), 10)).filter(Boolean);

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
    idInitialBill: note.initialBillId,
    idFinalBill: note.finalBillId || null,
    reason: note.reason,
    amount: note.amount,
  }));
};
