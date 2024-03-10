import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const Page = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || !user.id) redirect('/auth-callback?origin=dashboard')
  return (
    <div>
      {user.email} {user.family_name} {user.given_name}
      <Image src={user.picture || ''} alt={user.given_name || 'profile'} height={24} width={24} />
    </div>
  )
}

export default Page
