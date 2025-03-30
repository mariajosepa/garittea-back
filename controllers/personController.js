import { getAllPeople } from '../services/personService.js';

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

export default GetPeople