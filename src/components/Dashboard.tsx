'use client'

import 'react-loading-skeleton/dist/skeleton.css'

import { format } from 'date-fns'
import { Ghost, Loader2, MessageSquare, Plus, Trash } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'

// import { getUserSubscriptionPlan } from '@/lib/stripe'
import { trpc } from '@/trpc/client'

import { Button } from './ui/button'
import UploadButton from './UploadButton'

interface PageProps {
  // subscriptionPlan?: Awaited<ReturnType<typeof getUserSubscriptionPlan>>
  subscriptionPlan?: boolean
}

const Dashboard = ({ subscriptionPlan }: PageProps) => {
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<string | null>(null)

  const utils = trpc.useUtils()

  const { data: files, isLoading } = trpc.getUserFiles.useQuery()

  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate()
    },
    onMutate({ id }) {
      setCurrentlyDeletingFile(id)
    },
    onSettled() {
      setCurrentlyDeletingFile(null)
    },
  })

  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-gray-900">My Files</h1>

        <UploadButton
        // isSubscribed={subscriptionPlan.isSubscribed}
        />
      </div>

      {/* display all user files */}
      {isLoading ? (
        <div className="mt-8 mx-6 md:mx-0 lg:mx-0 grid grid-cols-1 gap-0 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Skeleton height={133.6} className="mb-6 rounded-lg" count={3} />
          </div>
          <div>
            <Skeleton height={133.6} className="mb-6 rounded-lg" count={3} />
          </div>
          <div>
            <Skeleton height={133.6} className="mb-6 rounded-lg" count={3} />
          </div>
        </div>
      ) : files && files?.length !== 0 ? (
        <ul className="mt-8 mx-6 md:mx-0 lg:mx-0 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {files
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map(file => (
              <li
                key={file.id}
                className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
              >
                <Link href={`/dashboard/${file.id}`} className="flex flex-col gap-2">
                  <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-secondary to-foreground" />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-lg font-medium text-zinc-900">{file.name}</h3>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    {format(new Date(file.createdAt), 'MMM yyyy')}
                  </div>

                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    mocked
                  </div>

                  <Button
                    onClick={() => deleteFile({ id: file.id })}
                    size="sm"
                    className="group w-full hover:bg-destructive/80"
                    variant="ghost"
                  >
                    {currentlyDeletingFile === file.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <div className="flex items-center gap-2 text-destructive group-hover:text-destructive-foreground">
                        <Trash className="h-4 w-4 " />
                        Delete
                      </div>
                    )}
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <Ghost className="h-8 w-8 text-zinc-800" />
          <h3 className="font-semibold text-xl">Pretty empty around here</h3>
          <p>Let&apos;s upload your first PDF.</p>
        </div>
      )}
    </main>
  )
}

export default Dashboard
