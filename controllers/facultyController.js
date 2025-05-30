import { FormatFaculty } from "../formatters/facultyFormatter.js";
import { getAllFaculties, getFacultyIdByName, createFaculty, updateFaculty, deleteFaculty } from "../services/facultyService.js";

export const GetAllFaculties = async (req, res) => {
    try {
        const faculties = await getAllFaculties();
        const formattedFaculties = faculties.map(FormatFaculty);
        res.status(200).json(formattedFaculties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const GetFacultyIdByName = async (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ error: 'Faculty name is required' });

  try {
    const faculty = await getFacultyIdByName(name);
    if (!faculty) return res.status(404).json({ error: 'Faculty not found' });

    res.status(200).json({ id: faculty.idfaculty });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const CreateFaculty = async (req, res) => {
  console.log('CreateFaculty', req.body);
  
  // Extraer datos con la estructura correcta enviada desde el frontend
  const { name, phone, facultyEmail, inchargeperson, associatedemails = '' } = req.body;
  
  // Validación de campos requeridos con la nueva estructura
  if (!name) return res.status(400).json({ error: 'El nombre de la facultad es requerido' });
  if (!inchargeperson || !inchargeperson.id) return res.status(400).json({ error: 'La persona a cargo es requerida' });
  if (!facultyEmail || !facultyEmail.email) return res.status(400).json({ error: 'El correo electrónico es requerido' });

  try {
    const facultyData = {
      name,
      phone,
      associatedemails, // Agregar este campo
      inchargeperson: {
        id: inchargeperson.id
      },
      facultyEmail: {
        email: facultyEmail.email
      }
    };
    
    const faculty = await createFaculty(facultyData);
    res.status(201).json(FormatFaculty(faculty));
  } catch (error) {
    console.error('Error creating faculty:', error);
    res.status(500).json({ error: error.message });
  }
}

export const UpdateFaculty = async (req, res) => {
  const { id } = req.params;
  const { name, phone, facultyEmail, inchargeperson, associatedemails = '' } = req.body;
  
  if (!id) return res.status(400).json({ error: 'Faculty ID is required' });
  if (!name) return res.status(400).json({ error: 'El nombre de la facultad es requerido' });

  try {
    const facultyData = {
      name,
      phone,
      associatedemails,
      ...(inchargeperson && { inchargeperson: { id: inchargeperson.id } }),
      ...(facultyEmail && { facultyEmail: { email: facultyEmail.email } })
    };

    const faculty = await updateFaculty(id, facultyData);
    console.log('Updated faculty:', faculty);
    res.status(200).json(FormatFaculty(faculty));
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

export const DeleteFaculty = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: 'Faculty ID is required' });
  try {
    await deleteFaculty(id);
    res.status(200).json({ message: 'Facultad eliminada exitosamente' });
  } catch (error) {
    if (error.message.includes('asociada con órdenes existentes')) {
      return res.status(400).json({ error: error.message });
    }
    console.error('Error deleting faculty:', error);
    res.status(500).json({ error: 'Error al eliminar la facultad' });
  }
};
