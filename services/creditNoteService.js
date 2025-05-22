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

export const createNoteCredit = async ({ initialBillId, finalBillId, idcreditNote, amount, reason }) => {
  try {
    console.log(initialBillId, finalBillId, idcreditNote, amount, reason);

    const initialBill = await prisma.bill.findUnique({
      where: { idbill: initialBillId },
    });

    if (!initialBill) {
      throw new Error(`La factura con ID ${initialBillId} no está registrada en el sistema.`);
    }
     if (initialBill.state === 'anulado') {
      throw new Error(`No se puede generar una nota crédito para una factura anulada (ID ${initialBillId}).`);
    }
    if (finalBillId && finalBillId === initialBillId) {
      throw new Error('La factura final no puede ser la misma que la factura inicial.');
    }

    let finalBillRecord = null;

    if (finalBillId) {
      // Se crea directamente la factura nueva
      try {
        finalBillRecord = await prisma.bill.create({
          data: {
            idbill: finalBillId,
            orderId: initialBill.orderId,
          },
        });
      } catch (err) {
        if (err.code === 'P2002') {
          throw new Error(`Ya existe una factura con ID ${finalBillId}.`);
        }
        throw err;
      }

      // Se anula la factura original
      await prisma.bill.update({
        where: { idbill: initialBillId },
        data: { state: 'anulado' },
      });
    } else {
      await prisma.bill.update({
        where: { idbill: initialBillId },
        data: { state: 'nota' },
      });
    }

    // Crear la nota crédito
    return await prisma.creditNote.create({
      data: {
        idcreditNote,
        initialBillId: initialBill.idbill,
        amount,
        reason,
        ...(finalBillRecord ? { finalBillId: finalBillRecord.idbill } : {}),
      },
    });
  } catch (error) {
    console.error('❌ Error creating credit note:', error);
    throw new Error(error.message || 'Error creating credit note');
  }
};







