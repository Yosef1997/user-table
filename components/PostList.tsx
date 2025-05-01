import { Post } from '@/types/post'
import { Card } from './ui/card'

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className='space-y-4'>
      {posts.map((post) => (
        <Card key={post.id} className='p-4'>
          <h3 className='font-semibold'>{post.title}</h3>
          <p className='text-sm text-muted-foreground'>{post.body}</p>
        </Card>
      ))}
    </div>
  )
}
