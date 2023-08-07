import { Content } from '@/components/Content'
import { Header } from '@/components/Header'
import { cookies } from 'next/dist/client/components/headers'
import { redirect } from 'next/navigation'

export const USERNAME_COOKIE_KEY = 'real-time.username'

export default function Home() {
  const cookiesStore = cookies()

  const usernameCookie = cookiesStore.get(USERNAME_COOKIE_KEY)

  if (!usernameCookie?.value) {
    redirect('/login')
  }

  return (
    <div className="flex h-full flex-col">
      <Header />

      <Content username={usernameCookie.value} />
    </div>
  )
}
