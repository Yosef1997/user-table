'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchUserDetail, fetchUserPosts } from '@/lib/api'
import { Card } from '@/components/ui/card'
import { UserForm } from '@/components/UserForm'
import { PostList } from '@/components/PostList'

const UserDetail: React.FC<{ userId: number }> = ({ userId }) => {
  const { data: user } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => fetchUserDetail(userId),
  })

  const { data: posts } = useQuery({
    queryKey: ['posts', userId],
    queryFn: () => fetchUserPosts(userId),
  })

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className='space-y-6 p-4 md:p-8 lg:p-10'>
      <h1 className='text-2xl font-bold'>User Details</h1>
      <Card className='p-6'>
        <UserForm user={user} />
      </Card>
      <div className='space-y-4'>
        <h2 className='text-xl font-semibold'>Posts</h2>
        <PostList posts={posts || []} />
      </div>
    </div>
  )
}
export default UserDetail
