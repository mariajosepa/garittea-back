import { getAllPeople } from '../services/personService.js';
import { getPersonIdByName } from "../services/personService.js";

//Get people
const GetPeople = async (req, res) => {

  try{
    const people = await getAllPeople();
    res.json(people);
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

    res.status(200).json({ id: person.idperson });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export default GetPeople