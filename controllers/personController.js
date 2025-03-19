const prisma =  require('../prisma/client.js')

//Get people
const getPeople = async (req, res) => {

  try{
    const people = await prisma.person.findMany();
    res.json(people);
  }
  catch{
    res.status(500).json({error: "Something went wrong!"});

  }
}

module.exports = { getPeople }