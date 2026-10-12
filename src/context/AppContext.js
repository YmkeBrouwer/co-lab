// State-Verwaltung mit React Context + AsyncStorage, damit meine Daten
// (Projekte, Connections, mein Profil) auch nach einem Neustart der App
// noch da sind und nicht jedes Mal auf die Mock-Daten zurückspringen
import { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { initialProfiles, initialProjects, initialConnections } from '../data/mockData'

const AppContext = createContext(null)

// unter diesem Key wird alles als ein JSON-Objekt im Speicher vom Handy abgelegt
const STORAGE_KEY = 'co-lab-app-state'

export function AppProvider({ children }) {
  const [profiles] = useState(initialProfiles) // Discover-Liste bleibt fix, muss ich nicht speichern
  const [projects, setProjects] = useState(initialProjects)
  const [connections, setConnections] = useState(initialConnections)
  const [myProfile, setMyProfile] = useState({
    name: 'Dein Name',
    city: 'Deine Stadt',
    bio: 'Erzähl kurz, wofür du stehst.',
  })

  // true solange wir noch nicht wissen, ob gespeicherte Daten existieren -
  // verhindert, dass wir kurz die Mock-Daten speichern und die echten
  // gespeicherten Daten damit überschreiben, bevor sie geladen sind
  const [isLoaded, setIsLoaded] = useState(false)

  // beim allerersten Start der App einmal schauen, ob schon was gespeichert ist
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

  // immer wenn sich projects, connections oder myProfile ändern, speichern
  // wir den neuen Stand - aber erst NACHDEM das initiale Laden fertig ist
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

  return (
    <AppContext.Provider value={{ profiles, projects, addProject, connections, connectWithProfile, myProfile, setMyProfile }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}