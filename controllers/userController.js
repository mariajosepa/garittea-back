import { createUser } from '../services/userService.js'

export const createUsers = async (req, res) => {
  try {
    const user = await createUser(req.body)
    res.status(201).json({ id: user.idusers, email: user.email })
  } catch (err) {
    res.status(err.status||500).json({ message: err.message })
  }
}