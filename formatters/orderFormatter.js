export const formatOrder = (order) => { 
  return {
    id: order.idOrder,
    createdAt: order.creationdate,
    user: {
      id: order.users.idusers,
      name: order.users.firstname,
      lastname: order.users.lastname
    },
    applicant: {
      id: order.applicant.idperson,
      name: order.applicant.name,
      lastname: order.applicant.lastname
    },
    managingPerson: {
      id: order.manager.idperson,
      name: order.manager.name,
      lastname: order.manager.lastname
    },
    faculty: {
      id: order.facultyRel.idfaculty,
      name: order.facultyRel.name,
    },
    debtAmount: order.debtamount,
    state: order.state,
    observaciones: order.observaciones || null, // Nuevo campo
    bill: order.bill ? {  // Cambiado de bills a bill (singular)
      id: order.bill.id,
      idBill: order.bill.idbill,
      billdate: order.bill.billdate,
      state: order.bill.state
    } : null
  }
}