// Fake-Daten, damit die App schon was anzeigt ohne dass ich ein echtes
// Backend brauche. Reicht laut Aufgabenstellung für das Semesterprojekt.
// Könnte man später easy durch echte Datenbank-Calls ersetzen, weil die
// Screens ja eh nur auf profiles/projects/connections zugreifen, egal woher
// die kommen

export const DISCIPLINES = ['Fotografie', 'Illustration', 'Musik', 'Design', 'Video']

export const initialProfiles = [
  { id: '1', name: 'Luca Näf', discipline: 'Fotografie', city: 'Zürich', bio: 'Fotoserien über urbane Räume.' },
  { id: '2', name: 'Mika Voss', discipline: 'Illustration', city: 'Basel', bio: 'Bunte, verspielte Charakterdesigns.' },
  { id: '3', name: 'Sara Portmann', discipline: 'Musik', city: 'Bern', bio: 'Singer-Songwriterin, sucht Cover-Artwork.' },
]

export const initialProjects = [
  { id: 'p1', title: 'Cover-Artwork für EP gesucht', description: 'Suche Illustrator:in für ein Album-Cover.', discipline: 'Illustration', author: 'Sara Portmann' },
  { id: 'p2', title: 'Musikvideo – Kamera & Schnitt', description: 'Dreh eines Musikvideos in Zürich.', discipline: 'Video', author: 'Luca Näf' },
]

export const initialConnections = [
  { id: 'c1', name: 'Sara Portmann', lastMessage: 'Cool, schicke mir gerne ein paar Skizzen' },
  { id: 'c2', name: 'Luca Näf', lastMessage: 'Danke für dein Feedback zur Serie!' },
]