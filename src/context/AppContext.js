// State-Verwaltung mit React Context + AsyncStorage. Neu dazugekommen:
// myProfile ist jetzt null bis man das Onboarding (Signup + Profil-Setup)
// durchlaufen hat - RootNavigator schaut sich das an und zeigt je nachdem
// Onboarding oder die eigentliche App
import { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { initialProfiles, initialProjects, initialConnections } from '../data/mockData'

const AppContext = createContext(null)

// v2 im Namen, damit alte gespeicherte Stände (mit dem Platzhalter-Profil
// von vorher) nicht aus Versehen als "schon onboarded" durchgehen
const STORAGE_KEY = 'co-lab-app-state-v2'

export function AppProvider({ children }) {
  const [profiles] = useState(initialProfiles)
  const [projects, setProjects] = useState(initialProjects)
  const [connections, setConnections] = useState(initialConnections)
  const [myProfile, setMyProfile] = useState(null) // null = Onboarding noch nicht fertig
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadSavedState = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY)
        if (saved) {
          const parsed = JSON.parse(saved)
          if (parsed.projects) setProjects(parsed.projects)
          if (parsed.connections) setConnections(parsed.connections)
          if (parsed.myProfile) setMyProfile(parsed.myProfile)
        }
      } catch (e) {
        console.log('Konnte gespeicherte Daten nicht laden:', e)
      } finally {
        setIsLoaded(true)
      }
    }
    loadSavedState()
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ projects, connections, myProfile })
    ).catch((e) => console.log('Konnte Daten nicht speichern:', e))
  }, [projects, connections, myProfile, isLoaded])

  const addProject = (project) => {
    setProjects((prev) => [{ ...project, id: Date.now().toString(), author: myProfile.name }, ...prev])
  }

  const connectWithProfile = (profile) => {
    setConnections((prev) => {
      if (prev.some((c) => c.name === profile.name)) return prev
      return [{ id: Date.now().toString(), name: profile.name, lastMessage: 'Ihr seid jetzt verbunden.' }, ...prev]
    })
  }

  // damit Discover/Projects wissen, ob der "connect"-Button schon
  // gedrückt wurde und sich entsprechend anders anzeigen kann
  const isConnectedWith = (name) => connections.some((c) => c.name === name)

  // wird am Ende vom Profil-Setup aufgerufen - sobald myProfile gesetzt ist,
  // schaltet RootNavigator automatisch von Onboarding auf die Tab-App um
  const completeOnboarding = (profileData) => {
    setMyProfile(profileData)
  }

  return (
    <AppContext.Provider
      value={{
        profiles,
        projects,
        addProject,
        connections,
        connectWithProfile,
        isConnectedWith,
        myProfile,
        setMyProfile,
        completeOnboarding,
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