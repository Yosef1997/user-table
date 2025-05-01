'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useState } from 'react'

const LoginSchema = z.object({
  username: z.string().nonempty('Username required'),
  password: z.string().nonempty('Password required'),
})

const Login = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(values),
      })

      setIsLoading(false)
      if (res.ok) {
        router.push('/')
      } else {
        const data = await res.json()
        toast(data.message || 'Login failed')
      }
    } catch (error) {
      console.error(error)
      toast('Something wrong with login')
    }
    setIsLoading(false)
  }

  return (
    <div className='flex items-center justify-center px-5 min-h-screen'>
      <div className='w-full max-w-md p-8 space-y-6 rounded-lg shadow-2xl dark:shadow-white'>
        <h1 className='text-2xl font-bold text-center'>Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Username<span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password<span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' variant={'default'} disabled={isLoading}>
              {isLoading ? 'loading...' : 'Login'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
export default Login
