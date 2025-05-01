'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchUserDetail, fetchUserPosts } from '@/lib/api'
import { Card } from '@/components/ui/card'
import UserForm from '@/components/UserForm'
import { Skeleton } from '@/components/ui/skeleton'
import PostList from '@/components/PostList'

const UserDetail: React.FC<{ userId: number }> = ({ userId }) => {
  const { data, isLoading: loadingUser } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => fetchUserDetail(userId),
  })

  const { data: posts, isLoading: loadingPost } = useQuery({
    queryKey: ['posts', userId],
    queryFn: () => fetchUserPosts(userId),
  })

  return (
    <div className='space-y-6 p-4 md:p-8 lg:p-10'>
      <h1 className='text-2xl font-bold'>User Details</h1>
      <Card className='p-6'>
        {loadingUser ? (
          <div className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {[...Array(5)].map((_, i) => (
                <div key={i} className='space-y-2'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-10 w-full' />
                </div>
              ))}
            </div>
            <Skeleton className='h-10 w-32 mt-4' />
          </div>
        ) : (
          <UserForm user={data || []} />
        )}
      </Card>
      <div className='space-y-4'>
        <h2 className='text-xl font-semibold'>Posts</h2>
        {loadingPost ? (
          <div className='space-y-4'>
            {[...Array(10)].map((_, i) => (
              <Card key={i} className='p-4 space-y-2'>
                <Skeleton className='h-5 w-1/3' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-5/6' />
              </Card>
            ))}
          </div>
        ) : (
          <PostList posts={posts || []} />
        )}
      </div>
    </div>
  )
}
export default UserDetail
