# co-lab

Ein Begegnungsort für Creatives — Fotograf:innen, Designer:innen, Musiker:innen und
andere Kreative können ein Profil erstellen, eigene Projekte vorstellen, andere
Creatives entdecken und sich miteinander vernetzen.

Entstanden als Semesterprojekt im Modul Mobile App Development.

## Features

- Registrierung & Login (Supabase Auth)
- Eigenes Profil anlegen & bearbeiten (Name, Stadt, Disziplin, Bio, Profilfoto)
- Discover: andere Creatives durchstöbern und sich mit ihnen connecten
- Projects: eigene Projekte posten, Projekte anderer ansehen und Interesse zeigen
- Connections: Übersicht aller Personen, mit denen man verbunden ist

## Tech-Stack

- [Expo](https://expo.dev) / React Native
- TypeScript
- React Navigation (Bottom Tabs + Native Stack pro Tab)
- React Context für State Management (kein Redux)
- [Supabase](https://supabase.com) als Backend: Auth, Postgres-Datenbank (mit Row Level
  Security), Storage für Profilfotos

## Setup

1. Repo klonen und Dependencies installieren:

   ```bash
   npm install
   ```

2. App starten:

   ```bash
   npx expo start
   ```

3. Mit Expo Go auf dem Handy den QR-Code scannen (oder Simulator benutzen).

Die Supabase-Verbindung (URL + Public Key) ist in `src/lib/supabase.ts` bereits
hinterlegt, es braucht also kein zusätzliches `.env`-Setup.

## Architektur

```
src/
  context/AppContext.tsx   → zentraler State: Session, Profile, Projekte,
                              Connections. Einziger Ort, der mit Supabase spricht.
  lib/supabase.ts          → Supabase-Client-Setup
  lib/uploadAvatar.ts      → Profilfoto-Upload in Supabase Storage
  navigation/               → RootNavigator (Onboarding- vs. Main-Flow) +
                              ein Stack-Navigator pro Tab (Discover, Projects,
                              Connections, Profile)
  screens/                  → ein File pro Screen, holt Daten/Funktionen
                              ausschliesslich über useApp() aus dem Context
  types.ts                  → zentrale TypeScript-Typen (Profile, Project, ...)
```

Die App unterscheidet drei Zustände im `RootNavigator`:

- kein Login → Signup/Login-Screen
- eingeloggt, aber kein Profil → ProfileSetup
- eingeloggt + Profil vorhanden → die eigentliche App (Tabs)

## Bekannte Issues

- Kein echtes Messaging zwischen Connections (nur eine statische Bestätigung,
  dass man verbunden ist)
- Noch keine Push-Benachrichtigungen

## Screenshots

<!-- Screenshots oder ein GIF der App hier einfügen -->

## Verantwortlichkeiten

Konzept, Design, Implementierung und Backend-Setup: Ymke Brouwer (Einzelprojekt).
