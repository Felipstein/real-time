'use client'

import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { USERNAME_COOKIE_KEY } from '@/app/page'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const loginSchema = z.object({
  username: z.string().nonempty('Username is required'),
})

type LoginData = z.infer<typeof loginSchema>

export function LoginForm() {
  const { push } = useRouter()

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
    },
  })

  function setUsername({ username }: LoginData) {
    document.cookie = `${USERNAME_COOKIE_KEY}=${username}`

    push('/')
  }

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(setUsername)}
        className="space-y-4"
      >
        <FormField
          control={loginForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>

              <FormControl>
                <Input placeholder="Your username" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="ghost"
          className="flex items-center gap-2"
        >
          Login
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Form>
  )
}
