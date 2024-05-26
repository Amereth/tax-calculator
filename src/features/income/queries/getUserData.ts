import { collections } from '@/collections'
import { getUserEmail } from '@/utils/getUserEmail'
import { redirect } from 'next/navigation'

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
    console.log('esv not found')
    redirect('/error')
  }

  if (!userData) {
    console.log('user not found')
    redirect('/error')
  }

  return { ...userData, esv: esv[0] }
}
