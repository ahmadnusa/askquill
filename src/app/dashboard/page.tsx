import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import Dashboard from '@/components/Dashboard'
import { db } from '@/db'

const Page = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) redirect('/api/auth/login?post_login_redirect_url=/dashboard')

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  })

  if (!dbUser) redirect('/auth-callback?origin=dashboard')
  return <Dashboard />
}

export default Page
