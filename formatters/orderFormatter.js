export const formatOrder = (order) => { 
  return {
    id : order.idOrder,
    createdAt : order.creationdate,
    user : {
      id : order.users.idusers,
      name : order.users.firstname,
      lastName : order.users.lastname
    },
    applicant: {
      id: order.applicant.idperson,
      name: order.applicant.name,
      lastName : order.applicant.lastname
    },
    managingPerson: {
      id: order.manager.idperson,
      name: order.manager.name,
      lastName : order.manager.lastname
    },
    faculty: {
      id: order.facultyRel.idfaculty,
      name: order.facultyRel.name,
    },
    debtAmount: order.debtamount,
    state: order.state,
    bills: order.bill ? order.bill.map(bill => ({
      id: bill.id,
      idBill: bill.idbill,
      billdate: bill.billdate,
      sate: bill.sate
    })) : []
  }
}
