export const DISCIPLINES = ['Fotografie', 'Illustration', 'Musik', 'Design', 'Video'] as const
export type Discipline = (typeof DISCIPLINES)[number]

export interface Profile {
  id: string
  name: string
  discipline: Discipline
  city: string
  bio: string
}

export interface Project {
  id: string
  title: string
  description: string
  discipline: Discipline
  authorId: string
  author: string
}

export interface Connection {
  id: string
  profileId: string
  name: string
  lastMessage: string
}

// MyProfile ist jetzt einfach ein Profile - kommt 1:1 aus der
// profiles-Tabelle, kein eigenes separates Format mehr nötig
export type MyProfile = Profile