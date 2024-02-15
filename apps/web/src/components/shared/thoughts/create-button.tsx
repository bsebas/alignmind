'use client'

import { createThought } from '@/app/actions/thoughts'
import { Template } from '@/types/template'
import { Button, toast } from '@mindfulyze/ui'
import { PencilIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export async function handleCreateThought(templateSelect?: Template) {
  try {
    toast.message('The thought is being created.')

    const response = await createThought(templateSelect?.id)

    if (response.status === 201) {
      toast.success('Thought was created.')
    } else {
      toast.error("The thought couldn't be created, try again anew.")
    }
  } catch (e) {
    toast.error("The thought couldn't be created, try again anew.")
  }
}

export function CreateButton({ templates }: { templates: Template[] }) {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  return (
    <Button
      className="w-full rounded-r-none px-3"
      onClick={async () => {
        await handleCreateThought(templates?.find((value) => value.default) || undefined)

        const params = new URLSearchParams(searchParams)

        params.set('page', '1')

        replace(`${pathname}?${params.toString()}`)
      }}
    >
      <PencilIcon className="w-4 h-4" />
      <span>New thought</span>
    </Button>
  )
}
