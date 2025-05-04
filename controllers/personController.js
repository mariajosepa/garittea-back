import { getAllPeople, getPersonIdByName, updatePerson, deletePerson, createPerson } from '../services/personService.js';
import { formatPerson } from '../formatters/personFormatter.js';

//Get people
export const GetPeople = async (req, res) => {

  try{
    const people = await getAllPeople();
    const formatted = people.map(formatPerson);
    res.status(200).json(formatted);
  }
  catch{
    res.status(500).json({error: "Something went wrong!"});
  }
}

export const GetPersonIdByName = async (req, res) => {
  const { name, lastname } = req.query;
  if (!name || !lastname) return res.status(400).json({ error: 'Name and lastname are required' });

  try {
    const person = await getPersonIdByName(name, lastname);
    if (!person) return res.status(404).json({ error: 'Person not found' });
    const formatted = people.map(formatPerson);
    res.status(200).json(formatted.idperson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const UpdatePerson = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!id) return res.status(400).json({ error: 'ID is required' });

  try {
    const updatedPerson = await updatePerson(id, data);
    if (!updatedPerson) return res.status(404).json({ error: 'Person not found' });
    const formatted = formatPerson(updatedPerson);
    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const DeletePerson = async (req, res) => {
  const { id } = req.params;
  
  try {
    await deletePerson(id);
    res.status(200).json({ message: 'Persona eliminada con éxito' });
  } catch (error) {
    if (error.message.includes('asociada con órdenes existentes')) {
      // Error específico cuando la persona tiene órdenes relacionadas
      return res.status(400).json({ 
        error: error.message,
        type: 'CONSTRAINT_ERROR'
      });
    }
    // Otros tipos de errores
    res.status(500).json({ error: "Error al eliminar la persona", details: error.message });
  }
};

export const CreatePerson = async (req, res) => {
  const data = req.body;
  if (!data) return res.status(400).json({ error: 'Data is required' });

  try {
    const newPerson = await createPerson(data);
    const formatted = formatPerson(newPerson);
    res.status(201).json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}