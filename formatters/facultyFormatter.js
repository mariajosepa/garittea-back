export const FormatFaculty = (faculty) => {
    return {
        id: faculty.idfaculty,
        name: faculty.name,
        phone: faculty.phone,
        facultyEmail: faculty.facultyEmail
            ? {
                id: faculty.facultyEmail.idEmail,
                email: faculty.facultyEmail.email
            }
            : null,
        inchargeperson: faculty.person
            ? {
                id: faculty.person.idperson,
                firstname: faculty.person.name,
                lastname: faculty.person.lastname,
                phone: faculty.person.cellphone,
                email: faculty.person.email
            }
            : null
    }
}