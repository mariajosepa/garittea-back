import prisma from '../prisma/client.js';

export const getAllCreditNotes = async () => {
    return await prisma.creditNote.findMany({
        include: {
            initialBill: true,
            finishBill: true
        }
    });
}
export const createNoteCredit = async ({idcreditNote, idInicialBill, idFinishBill}) => {
  return await prisma.creditNote.create({
    data : {
      idcreditNote,
      idInicialBill,
      ...(idFinishBill !== undefined && { idFinishBill })
    }
  })
}