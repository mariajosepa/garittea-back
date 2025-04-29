import { formatCreditNote } from "../formatters/creditNoteFormatter.js";
import { getAllCreditNotes, createNoteCredit } from "../services/creditNoteService.js";


export const GetAllCreditNotes = async (req, res) => {
    try {
        const creditNotes = await getAllCreditNotes();
        const formattedCreditNotes = creditNotes.map(formatCreditNote);
        res.status(200).json(formattedCreditNotes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const CreateNoteCredit = async (req, res) => {
  try {
    const { idBill, amount, reason } = req.body;

    if (!idBill || !amount || !reason) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const createdCreditNote = await createNoteCredit(req.body);
    res.status(201).json(createdCreditNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
