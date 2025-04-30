import { formatCreditNote } from "../formatters/creditNoteFormatter.js";
import { getAllCreditNotes, createNoteCredit } from "../services/creditNoteService.js";


// controllers/creditNoteController.js
export const GetAllCreditNotes = async (req, res) => {
  try {
    const notes = await getAllCreditNotes();
    const formatted = notes.map(formatCreditNote);
    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const CreateNoteCredit = async (req, res) => {
  try {
    const { initialBillId, finalBillId, amount, reason } = req.body;
    if (!initialBillId || !finalBillId || !amount || !reason) {
      return res.status(400).json({ error: 'Campos obligatorios faltantes' });
    }
    const created = await createNoteCredit({ initialBillId, finalBillId, amount, reason });
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
