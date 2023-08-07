import { cookies } from 'next/dist/client/components/headers'
import { LoginForm } from './components/LoginForm'
import { USERNAME_COOKIE_KEY } from '../page'
import { redirect } from 'next/navigation'

export default function Login() {
  const cookiesStore = cookies()

  const usernameCookie = cookiesStore.get(USERNAME_COOKIE_KEY)

  if (usernameCookie?.value) {
    redirect('/')
  }

  return (
    <div className="flex h-full items-center justify-center">
      <main className="flex flex-col gap-8">
        <h1 className="text-4xl font-semibold">Login</h1>

        <LoginForm />
      </main>
    </div>
  )
}
