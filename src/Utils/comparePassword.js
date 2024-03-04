import bcrypt from 'bcrypt'

export const comparePassword = async (requestPassword, userPassword) => {
  const compared = await bcrypt.compare(requestPassword, userPassword)

  return compared
}
