import { USERNAME_COOKIE_KEY } from '@/app/page'
import { cookies } from 'next/dist/client/components/headers'
import { LogOut } from './components/LogOut'

export function Header() {
  const cookiesStore = cookies()

  const usernameCookie = cookiesStore.get(USERNAME_COOKIE_KEY)

  if (!usernameCookie?.value) {
    return null
  }

  return (
    <header className="flex justify-end p-6">
      <LogOut />
    </header>
  )
}
