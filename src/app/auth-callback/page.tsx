'use client'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/dist/types/components'
import { Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

import { trpc } from '@/trpc/client'

const Page = () => {
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const origin = searchParams.get('origin')

  const { isSuccess, error, isError } = trpc.authCallback.useQuery()

  if (isSuccess) push(origin ? `/${origin}` : '/dashboard')
  if (isError)
    error?.data?.code === 'UNAUTHORIZED' &&
      push('/api/auth/login?post_login_redirect_url=/dashboard')

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
        <h3 className="font-semibold text-xl">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  )
}

export default Page
