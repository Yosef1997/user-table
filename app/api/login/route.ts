import { NextResponse } from 'next/server'
import { generateToken } from '@/lib/auth'

export async function POST(req: Request) {
  const { username, password } = await req.json()

  if (username === 'testuser' && password === 'testpass') {
    const token = await generateToken({ username })
    const res = NextResponse.json({ success: true })
    res.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 2 * 60 * 60,
    })
    return res
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
}
