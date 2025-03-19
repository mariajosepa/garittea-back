import prisma from  '../prisma/client.js'

//Get all users
export const getUsers = async (req, res) => {

  try{
    const users = await prisma.post.findMany();
    res.json(users);
  }
  catch{
    res.status(500).json({error: "Something went wrong!"});

  }
}