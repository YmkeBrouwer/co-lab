import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { Connection, Discipline, MyProfile, Profile, Project } from '../types'

interface ProjectRow {
  id: string
  title: string
  description: string
  discipline: Discipline
  author_id: string
  profiles: { name: string } | null
}

function mapProfileRow(row: any): Profile {
  return {
    id: row.id,
    name: row.name,
    discipline: row.discipline,
    city: row.city,
    bio: row.bio,
    avatarUrl: row.avatar_url,
  }
}

export type ConnectionStatusResult = 'none' | 'pending-sent' | 'pending-received' | 'accepted'

interface AppContextValue {
  profiles: Profile[]
  projects: Project[]
  addProject: (project: { title: string; description: string; discipline: Discipline }) => Promise<string | null>
  connections: Connection[]
  connectWithProfile: (profile: { id: string; name: string }) => Promise<void>
  respondToConnection: (connectionId: string, accept: boolean) => Promise<void>
  getConnectionStatus: (profileId: string) => ConnectionStatusResult
  myProfile: MyProfile | null
  userId: string | null
  signUp: (email: string, password: string) => Promise<string | null>
  signIn: (email: string, password: string) => Promise<string | null>
  completeOnboarding: (profileData: { name: string; city: string; discipline: Discipline; bio: string; avatarUrl: string | null }) => Promise<string | null>
  updateMyProfile: (profileData: { name: string; city: string; discipline: Discipline; bio: string; avatarUrl: string | null }) => Promise<string | null>
  signOut: () => Promise<void>
  changePassword: (newPassword: string) => Promise<string | null>
  hasSession: boolean
  isOnboarded: boolean
  isLoaded: boolean
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [myProfile, setMyProfileState] = useState<MyProfile | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const loadAll = async () => {
      if (!session) {
        setMyProfileState(null)
        setProfiles([])
        setProjects([])
        setConnections([])
        setIsLoaded(true)
        return
      }
      const { data: myProfileRow } = await supabase.from('profiles').select('*').eq('id', session.user.id).maybeSingle()
      setMyProfileState(myProfileRow ? mapProfileRow(myProfileRow) : null)
      if (myProfileRow) {
        await Promise.all([loadProfiles(session.user.id), loadProjects(), loadConnections(session.user.id)])
      }
      setIsLoaded(true)
    }
    loadAll()
  }, [session])

  const loadProfiles = async (myId: string) => {
    const { data } = await supabase.from('profiles').select('*').neq('id', myId)
    if (data) setProfiles(data.map(mapProfileRow))
  }

  const loadProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('id, title, description, discipline, author_id, profiles(name)')
      .order('created_at', { ascending: false })
    const rows = (data ?? []) as unknown as ProjectRow[]
    setProjects(
      rows.map((row) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        discipline: row.discipline,
        authorId: row.author_id,
        author: row.profiles?.name ?? 'Unbekannt',
      }))
    )
  }

  // lädt beide Richtungen: Anfragen die ICH geschickt hab, und Anfragen
  // die AN mich geschickt wurden - zusammen ergibt das "meine Connections"
  const loadConnections = async (myId: string) => {
    const [{ data: sent }, { data: received }] = await Promise.all([
      supabase.from('connections').select('*').eq('user_id', myId),
      supabase.from('connections').select('*').eq('connected_user_id', myId),
    ])

    const sentMapped: Connection[] = (sent ?? []).map((row) => ({
      id: row.id,
      profileId: row.connected_user_id,
      name: row.connected_name,
      status: row.status,
      direction: 'sent',
    }))
    const receivedMapped: Connection[] = (received ?? []).map((row) => ({
      id: row.id,
      profileId: row.user_id,
      name: row.requester_name ?? 'Unbekannt',
      status: row.status,
      direction: 'received',
    }))

    setConnections([...sentMapped, ...receivedMapped])
  }

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password })
    return error ? error.message : null
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return error ? error.message : null
  }

  const completeOnboarding = async (profileData: { name: string; city: string; discipline: Discipline; bio: string; avatarUrl: string | null }) => {
    if (!session) return 'Keine aktive Sitzung.'
    const { data, error } = await supabase
      .from('profiles')
      .insert({ id: session.user.id, name: profileData.name, city: profileData.city, discipline: profileData.discipline, bio: profileData.bio, avatar_url: profileData.avatarUrl })
      .select()
      .single()
    if (error) return error.message
    setMyProfileState(mapProfileRow(data))
    await Promise.all([loadProfiles(session.user.id), loadProjects(), loadConnections(session.user.id)])
    return null
  }

  const updateMyProfile = async (profileData: { name: string; city: string; discipline: Discipline; bio: string; avatarUrl: string | null }) => {
    if (!session) return 'Keine aktive Sitzung.'
    const { data, error } = await supabase
      .from('profiles')
      .update({ name: profileData.name, city: profileData.city, discipline: profileData.discipline, bio: profileData.bio, avatar_url: profileData.avatarUrl })
      .eq('id', session.user.id)
      .select()
      .single()
    if (error) return error.message
    setMyProfileState(mapProfileRow(data))
    return null
  }

  const addProject = async (project: { title: string; description: string; discipline: Discipline }) => {
    if (!session) return 'Keine aktive Sitzung.'
    const { error } = await supabase.from('projects').insert({ ...project, author_id: session.user.id })
    if (error) return error.message
    await loadProjects()
    return null
  }

  // erstellt nur noch eine ANFRAGE (status "pending") statt direkt zu
  // verbinden - die andere Person muss sie noch annehmen
  const connectWithProfile = async (profile: { id: string; name: string }) => {
    if (!session || !myProfile) return
    const existing = connections.find((c) => c.profileId === profile.id)
    if (existing) return
    await supabase.from('connections').insert({
      user_id: session.user.id,
      connected_user_id: profile.id,
      connected_name: profile.name,
      requester_name: myProfile.name,
      status: 'pending',
    })
    await loadConnections(session.user.id)
  }

  const respondToConnection = async (connectionId: string, accept: boolean) => {
    if (!session) return
    if (accept) {
      await supabase.from('connections').update({ status: 'accepted' }).eq('id', connectionId)
    } else {
      await supabase.from('connections').delete().eq('id', connectionId)
    }
    await loadConnections(session.user.id)
  }

  const getConnectionStatus = (profileId: string): ConnectionStatusResult => {
    const conn = connections.find((c) => c.profileId === profileId)
    if (!conn) return 'none'
    if (conn.status === 'accepted') return 'accepted'
    return conn.direction === 'sent' ? 'pending-sent' : 'pending-received'
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const changePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    return error ? error.message : null
  }

  return (
    <AppContext.Provider
      value={{
        profiles,
        projects,
        addProject,
        connections,
        connectWithProfile,
        respondToConnection,
        getConnectionStatus,
        myProfile,
        userId: session?.user.id ?? null,
        signUp,
        signIn,
        completeOnboarding,
        updateMyProfile,
        signOut,
        changePassword,
        hasSession: session !== null,
        isOnboarded: myProfile !== null,
        isLoaded,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}