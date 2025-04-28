export const FormatUser = (user) => {
  return {
    id: user.idusers,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
  };
}