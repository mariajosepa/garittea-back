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