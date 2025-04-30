import prisma from '../prisma/client.js';

// services/creditNoteService.js
export const getAllCreditNotes = async () => {
  try {
    return await prisma.creditNote.findMany({
      include: {
        initialBill: true,
        finalBill: true,
      },
    });
  } catch (error) {
    console.error('❌ Error fetching credit notes:', error);
    throw new Error('Error fetching credit notes');
  }
};

export const createNoteCredit = async ({ initialBillId, finalBillId, amount, reason }) => {
  try {
    return await prisma.creditNote.create({
      data: {
        initialBillId,
        finalBillId,
        amount,
        reason,
      },
    });
  } catch (error) {
    console.error('❌ Error creating credit note:', error);
    throw new Error('Error creating credit note');
  }
};

