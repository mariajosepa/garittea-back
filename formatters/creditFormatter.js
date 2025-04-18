export const formatCredit = (credit) => { 
  return {
    id : credit.idcredit,
    createdAt : credit.creationdate,
    user : {
      id : credit.users.idusers,
      name : credit.users.firstname,
      lastName : credit.users.lastname
    },
    applicant: {
      id: credit.person_credit_applicantpersonToperson.idperson,
      name: credit.person_credit_applicantpersonToperson.name,
      lastName : credit.person_credit_applicantpersonToperson.lastname
    },
    managingPerson: {
          id: credit.person_credit_managingpersonToperson.idperson,
          name: credit.person_credit_managingpersonToperson.name,
          lastName : credit.person_credit_applicantpersonToperson.lastname
    },
    faculty: {
      id: credit.faculty_credit_facultyTofaculty.idfaculty,
      name: credit.faculty_credit_facultyTofaculty.name,
    },
    debtAmount: credit.debtamount,
    state: credit.state,

  }
}