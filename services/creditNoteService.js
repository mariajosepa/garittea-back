import prisma from '../prisma/client.js';

export const getAllCreditNotes = async () => {
    return await prisma.creditNote.findMany({
        include: {
            initialBill: true,
            finishBill: true
        }
    });
}
export const createNoteCredit = async ({ idBill, amount, reason }) => {
  return await prisma.creditNote.create({
    data : {
      idBill,
      amount,
      reason
    }
  })
}