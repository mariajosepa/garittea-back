import { FormatFaculty } from "../formatters/facultyFormatter.js";
import { getAllFaculties } from "../services/facultyService.js";

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