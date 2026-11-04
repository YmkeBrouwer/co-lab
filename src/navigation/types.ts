import { Profile, Project } from '../types'

export type OnboardingStackParamList = {
  Signup: undefined
  ProfileSetup: undefined
}

export type DiscoverStackParamList = {
  DiscoverList: undefined
  ProfileDetail: { profile: Profile }
}

export type ProjectsStackParamList = {
  ProjectsList: undefined
  NewProject: undefined
  ProjectDetail: { project: Project }
}

export type ConnectionsStackParamList = {
  ConnectionsList: undefined
  ProfileDetail: { profile: Profile }
}

export type ProfileStackParamList = {
  MyProfile: undefined
  EditProfile: undefined
}

export interface Profile {
  id: string
  name: string
  discipline: Discipline
  city: string
  bio: string
  avatarUrl: string | null
}