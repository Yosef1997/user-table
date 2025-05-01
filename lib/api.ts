import { User } from '@/types/user'
import axios from 'axios'

export const fetchUsers = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/users`)
  return data
}

export const fetchUserDetail = async (userId: number) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE}/users/${userId}`
  )
  return data
}

export const updateUserDetail = async (req: User) => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_API_BASE}/users/${req.id}`,
    req
  )
  return data
}

export const fetchUserPosts = async (userId: number) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE}/posts?userId${userId}`
  )

  return data
}

export const fetchAllPosts = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/posts`)
  return data
}
