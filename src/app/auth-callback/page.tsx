'use client'
import { Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { trpc } from '@/trpc/client'

const Page = () => {
  const { push } = useRouter()
  const { get } = useSearchParams()
  const origin = get('origin')

  const { data } = trpc.authCallback.useQuery()

  useEffect(() => {
    if (data?.success) push(origin ? `/${origin}` : '/dashboard')
    else push(`/api/auth/login?post_login_redirect_url=${origin ? `/${origin}` : '/dashboard'}`)
  }, [data?.success, origin, push])

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
