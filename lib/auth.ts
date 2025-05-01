import { SignJWT, jwtVerify } from 'jose'

const secret = process.env.NEXT_PUBLIC_JWT_SECRET
if (!secret) throw new Error('Missing JWT_SECRET in environment variables')
const key = new TextEncoder().encode(secret)

export interface JWTPayload {
  username: string
  [key: string]: unknown
}

export async function generateToken(payload: JWTPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(key)
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key)
    return payload as JWTPayload
  } catch {
    return null
  }
}
