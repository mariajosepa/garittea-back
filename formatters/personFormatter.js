export const formatPerson = (person) => {
    try {
      return {
        id: person.idperson, // Removemos el toString()
        firstname: person.name || '',
        lastname: person.lastname || '',
        cellphone: person.cellphone || '',
        email: person.email ? person.email.email : '',
        faculty: Array.isArray(person.faculty) 
          ? person.faculty.map(f => ({
              id: f.idfaculty,
              name: f.name || '',
              phone: f.phone || ''
            }))
          : []
      };
    } catch (error) {
      console.error('Error formatting person:', error, person);
      return { 
        id: person?.idperson || 0, // Cambiamos a número
        firstname: person?.name || '',
        lastname: person?.lastname || '',
        cellphone: '',
        email: '',
        faculty: []
      };
    }
  };