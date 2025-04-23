import { formatCreditNote } from "../formatters/creditNoteFormatter.js";
import { getAllCreditNotes } from "../services/creditNoteService.js";


export const GetAllCreditNotes = async (req, res) => {
    try {
        const creditNotes = await getAllCreditNotes();
        const formattedCreditNotes = creditNotes.map(formatCreditNote);
        res.status(200).json(formattedCreditNotes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}