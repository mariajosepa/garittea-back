export const formatCreditNote = (creditNote) => {
  return {
    id: creditNote.idcreditNote,
    amount: creditNote.amount,
    reason: creditNote.reason,
    initialBill: creditNote.initialBill
      ? {
          id: creditNote.initialBill.idbill,
          date: creditNote.initialBill.billdate,
          state: creditNote.initialBill.state,
        }
      : null,
    finalBill: creditNote.finalBill
      ? {
          id: creditNote.finalBill.idbill,
          date: creditNote.finalBill.billdate,
          state: creditNote.finalBill.state,
        }
      : null,
  };
};
