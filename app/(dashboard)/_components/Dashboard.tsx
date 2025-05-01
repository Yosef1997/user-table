'use client'
import { UserTable } from '@/components/UserTable'
import { fetchUsers } from '@/lib/api'
import { User } from '@/types/user'
import { useQuery } from '@tanstack/react-query'

const Dashboard = () => {
  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ['posts'],
    queryFn: fetchUsers,
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading posts.</p>
  return (
    <div className='flex flex-col space-y-4 p-4 md:p-8 lg:p-10'>
      <h1 className='text-2xl font-bold'>User Table</h1>
      <UserTable data={data ?? []} />
    </div>
  )
}
export default Dashboard
