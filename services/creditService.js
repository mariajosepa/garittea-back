import prisma from '../prisma/client.js';


export const getAllCredits = async () => {
  return await prisma.credit.findMany({
    include: {
      users: true,
      person_credit_applicantpersonToperson: true,
      person_credit_managingpersonToperson: true,
      faculty_credit_facultyTofaculty: true,
    },
  });
}

export const getCreditsByDates = async (startDate, endDate) => {
  if (!startDate || !endDate) {
    throw new Error('Start date and end date are required');
  }
  if (new Date(startDate) > new Date(endDate)) {
    throw new Error('Start date must be before end date');
  }
  
  return await prisma.credit.findMany({
    where: {
      creationdate: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
    include: {
      users: true,
      person_credit_applicantpersonToperson: true,
      person_credit_managingpersonToperson: true,
      faculty_credit_facultyTofaculty: true,
    },
  });
}

export const getCreditById = async (id) => {
  return await prisma.credit.findUnique({
    where: {
      idcredit: Number(id),
    },
    include: {
      person_credit_applicantpersonToperson: true,
      person_credit_managingpersonToperson: true,
      faculty_credit_facultyTofaculty: true,
      users: true,
    },
  });
}

