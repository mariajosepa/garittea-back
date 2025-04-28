import { getAllCredits, getCreditsByDates, getCreditById, getCreditsByIdManagingPerson, postCredit, deleteCreditById, getCreditsByFacultyAndState } from '../services/creditService.js';
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

export const GetCreditsByDates = async (req,res) => {
  const { startDate, endDate } = req.query;
  try{
    const credits = await getCreditsByDates(startDate, endDate);
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

export const DeleteCredit = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteCreditById(Number(id));
    res.status(200).json({
      message: 'Crédito eliminado correctamente',
      deletedId: Number(id),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const GetCreditsByIdManagingPerson = async (req,res) => {
  const { id } = req.query;
  try{
    const credits = await getCreditsByIdManagingPerson(id);
    const formattedCredits = credits.map(formatCredit);
    res.status(200).json(formattedCredits);
  }
  catch(error){
    res.status(500).json({error: error.message});
  }
}


export const PostCredit = async (req,res) => {
  const { userId, applicantId, managingPersonId, facultyId, debtAmount } = req.body;
  try{
    const credit = await postCredit({
      userId,
      applicantId,
      managingPersonId,
      facultyId,
      debtAmount,
    });
    res.status(201).json(formatCredit(credit));
  }
  catch(error){
    res.status(500).json({error: error.message});
  }
}

export const GetCreditsByFacultyAndState = async (req, res) => {
  const { faculty, state } = req.query;
  try {
    const credits = await getCreditsByFacultyAndState(faculty, state);
    const formattedCredits = credits.map(formatCredit);
    res.status(200).json(formattedCredits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}