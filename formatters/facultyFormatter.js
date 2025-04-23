export const FormatFaculty = (faculty) => {
    return {
        id: faculty.idfaculty,
        name: faculty.name,
        lastName: faculty.phone,
        emails: {
            id: faculty.facultyEmail.idEmail,
            email: faculty.facultyEmail.email
        },
        inchargeperson: {
            id: faculty.person.idperson,
            name: faculty.person.name,
            lastName: faculty.person.lastname,
            phone: faculty.person.cellphone,
            email: faculty.person.email
        }
    }
}