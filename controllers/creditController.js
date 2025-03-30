import { getAllCredits } from '../services/creditService.js';
import { formatCredit } from '../formatters/creditFormatter.js';

//Get all credits
export const GetAllCredits = async (req,res) => {
  try{
    const credits = await getAllCredits();
    const formattedCredits = credits.map(formatCredit);
    res.status(200).json(formattedCredits);
  }
  catch(error){
    res.status(500).json({error: error.message});
  }

}
