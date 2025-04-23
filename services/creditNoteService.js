import prisma from '../prisma/client.js';

export const getAllCreditNotes = async () => {
    return await prisma.creditNote.findMany({
        include: {
            
            initialBill: true,
            finishBill: true
        }
    });
}