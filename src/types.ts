export const DISCIPLINES = ['Fotografie', 'Illustration', 'Musik', 'Design', 'Video'] as const
export type Discipline = (typeof DISCIPLINES)[number]

export interface Profile {
  id: string
  name: string
  discipline: Discipline
  city: string
  bio: string
  avatarUrl: string | null
}

export interface Project {
  id: string
  title: string
  description: string
  discipline: Discipline
  authorId: string
  author: string
}

export type ConnectionStatus = 'pending' | 'accepted'

export interface Connection {
  id: string
  profileId: string
  name: string
  status: ConnectionStatus
  direction: 'sent' | 'received'
}

export type MyProfile = Profile