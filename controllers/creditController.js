import prisma from '../prisma/client.js'

//Get all credits
export const getAllCredits = async (req,res) => {
  try{
    credits = await prisma.credit.findMany();
    res.status(200).json(credits);
  }
  catch(error){
    res.status(500).json({error: error.message});
  }

}
