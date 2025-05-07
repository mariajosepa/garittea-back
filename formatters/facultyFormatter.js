export const FormatFaculty = (faculty) => {
    return {
        id: faculty.idfaculty,
        name: faculty.name,
        phone: faculty.phone,
        facultyEmail: {
            id: faculty.facultyEmail.idEmail,
            email: faculty.facultyEmail.email
        },
        inchargeperson: {
            id: faculty.person.idperson,
            firstname: faculty.person.name,
            lastname: faculty.person.lastname,
            phone: faculty.person.cellphone,
            email: faculty.person.email
        }
    }
}