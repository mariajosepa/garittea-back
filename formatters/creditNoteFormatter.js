export const formatCreditNote = (creditNote) => {
    return {
        id: creditNote.idcreditNote,
        initialBill: {
            id: creditNote.initialBill.id,
            date: creditNote.initialBill.date,
            amount: creditNote.finishBill.amount,
            state: creditNote.initialBill.state,
        },
        finalBill: {
            id: creditNote.initialBill.id,
            date: creditNote.finishBill.date,
            amount: creditNote.finishBill.amount,
            state: creditNote.finishBill.state,
        }
    }
}