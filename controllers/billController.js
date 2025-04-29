import { createBill } from '../services/billService.js';
import { getCreditById } from '../services/creditService.js';

export const massiveCreateBill = async (req, res) => {
  try {
    const { creditId, billDate } = req.body;

    if (!creditId) {
      return res.status(400).json({ error: 'El creditId es obligatorio.' });
    }

    // Verificamos que el crédito exista
    const credit = await getCreditById(creditId);

    if (!credit) {
      return res.status(404).json({ error: 'Crédito no encontrado.' });
    }

    // Verificamos que no tenga ya factura
    if (credit.bill) {
      return res.status(400).json({ error: 'Este crédito ya tiene una factura asociada.' });
    }

    // Creamos la factura
    const bill = await createBill({
      creditId,
      billDate: billDate ? new Date(billDate) : undefined, // Si viene fecha, usamos esa; si no, fecha actual
    });

    res.status(201).json({
      message: 'Factura creada exitosamente.',
      bill,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno al crear la factura.', details: error.message });
  }
};
