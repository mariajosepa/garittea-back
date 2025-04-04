import prisma from '../prisma/client.js';


export const getAllCredits = async () => {

  return await prisma.credit.findMany({
    select: {
      idcredit: true,
      debtamount: true,
      users: {
        select: {
          firstname: true,
          lastname: true,
        },
      },
      person_credit_applicantpersonToperson: {
        select: {
          name: true,
          lastname: true,
        }
      },
      person_credit_managingpersonToperson: {
        select: {
          name: true,
          lastname: true,
        }
      },
      faculty_credit_facultyTofaculty: {
        select: {
          name: true,
        },
      },
    }
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

