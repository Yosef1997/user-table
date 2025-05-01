import { Metadata } from 'next'
import UserDetail from './_components/UserDetail'
import { User } from '@/types/user'

type Props = {
  params: Promise<{
    id: number
  }>
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/users/${(await params).id}`
  )

  if (!response.ok) {
    return {
      title: `${(await params).id}`,
    }
  }

  const result: User = await response.json()
  return {
    title: `${result?.name}`,
  }
}

const Users: React.FC<Props> = async ({ params }) => {
  return <UserDetail userId={(await params).id} />
}
export default Users
