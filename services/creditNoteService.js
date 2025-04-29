import prisma from '../prisma/client.js';

export const getAllCreditNotes = async () => {
  try {
    return await prisma.creditNote.findMany({
      include: {
        bill: true, // Include the associated bill
      },
    });
  } catch (error) {
    console.error('❌ Error fetching credit notes:', error);
    throw new Error('Failed to fetch credit notes from the database.');
  }
};



export const createNoteCredit = async ({ idBill, amount, reason }) => {
  try {
    const billExists = await prisma.bill.findUnique({
      where: { idbill: idBill },
    });
  
    if (!billExists) {
      throw new Error('Lo sentimos, no encontramos esa factura en el sistema.');
    }
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
