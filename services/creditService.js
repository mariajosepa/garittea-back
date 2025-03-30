import prisma from '../prisma/client.js';


export const getAllCredits = async () => {

  return await prisma.credit.findMany({ 
    include: {
    person_credit_applicantpersonToperson: true,
    person_credit_managingpersonToperson: true,
    faculty_credit_facultyTofaculty: true,
    users: true,
  }});

}