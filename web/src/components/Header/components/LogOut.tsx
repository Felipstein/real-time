'use client'

import { USERNAME_COOKIE_KEY } from '@/app/page'
import { Button } from '@/components/ui/button'
import { LogOut as LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function LogOut() {
  const { push } = useRouter()

  function logOut() {
    document.cookie = `${USERNAME_COOKIE_KEY}=`
    push('/login')
  }

  return (
    <Button
      type="button"
      variant="ghost"
      className="flex items-center gap-2"
      onClick={logOut}
    >
      Log Out
      <LogOutIcon className="h-4 w-4" />
    </Button>
  )
}
