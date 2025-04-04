import { getAllCredits, getCreditById } from '../services/creditService.js';
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

export const GetCreditById = async (req,res) => {
  const { id } = req.params;
  try{
    const credit = await getCreditById(id);
    if(!credit){
      return res.status(404).json({error: 'Credit not found'});
    }
    res.status(200).json(formatCredit(credit));
  }
  catch(error){
    res.status(500).json({error: error.message});
  }
}
