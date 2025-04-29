export const formatCreditNote = (creditNote) => {
  return {
    id: creditNote.idcreditNote,
    amount: creditNote.amount,
    reason: creditNote.reason,
    bill: creditNote.bill
      ? {
          idbill: creditNote.bill.idbill,
          billdate: creditNote.bill.billdate,
          state: creditNote.bill.state,
        }
      : null,
  };
};
