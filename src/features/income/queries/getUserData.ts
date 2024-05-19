import { collections } from '@/collections'
import { getUserEmail } from '@/utils/getUserEmail'

export const getUserData = async () => {
  const email = getUserEmail()

  const data = await Promise.all([
    collections.users.db.findOne({
      email,
    }),
    collections.esv.db.find().toArray(),
  ])

  const [userData, esv] = data

  if (!esv) {
    throw new Error('esv not found')
  }

  if (!userData) {
    throw new Error('user not found')
  }

  return { ...userData, esv: esv[0] }
}
