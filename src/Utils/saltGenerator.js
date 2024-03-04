import bcrypt from 'bcrypt'

export const saltGenerator = async (password) => {
  const hashPassword = await bcrypt.hash(password, 10)

  return hashPassword
}
