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

export const getCreditsByIdManagingPerson = async (id) => {
  if (!id) {
    throw new Error('Managing person ID is required');
  }

  return await prisma.credit.findMany({
    where: {
      managingperson: {
        idperson: Number(id),
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

export const postCredit = async (creditData) => {
  const { userId, applicantId, managingPersonId, facultyId, debtAmount } = creditData;
  if (!userId || !applicantId || !managingPersonId || !facultyId || !debtAmount) {
    throw new Error('All fields are required');
  }
  if (isNaN(debtAmount)) {
    throw new Error('Debt amount must be a number');
  }

  const userExists = await prisma.users.findUnique({
    where: { idusers: userId },
  });
  if (!userExists) {
    throw new Error('User does not exist');
  }

  const applicantExists = await prisma.person.findUnique({
    where: { idperson: applicantId },
  });
  if (!applicantExists) {
    throw new Error('Applicant does not exist');
  }

  const managingExists = await prisma.person.findUnique({
    where: { idperson: managingPersonId },
  });
  if (!managingExists) {
    throw new Error('Managing person does not exist');
  }

  const facultyExists = await prisma.faculty.findUnique({
    where: { idfaculty: facultyId },
  });
  if (!facultyExists) {
    throw new Error('Faculty does not exist');
  }

  return await prisma.credit.create({
    data: {
      users: {
        connect: {
          idusers: userId,
        },
      },
      person_credit_applicantpersonToperson: {
        connect: {
          idperson: applicantId,
        },
      },
      person_credit_managingpersonToperson: {
        connect: {
          idperson: managingPersonId,
        },
      },
      faculty_credit_facultyTofaculty: {
        connect: {
          idfaculty: facultyId,
        },
      },
      debtamount: debtAmount,
    },
    include: {
      users: true,
      person_credit_applicantpersonToperson: true,
      person_credit_managingpersonToperson: true,
      faculty_credit_facultyTofaculty: true,
    },
  });
}
