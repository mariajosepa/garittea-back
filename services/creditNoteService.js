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
  try {
    const note = await prisma.creditNote.create({
      data: {
        idBill,
        amount,
        reason,
      },
    });
    return note;
  } catch (error) {
    console.error('❌ Error creating credit note:', error);
    throw new Error('Error creating credit note'); // you can throw custom error
  }
};
