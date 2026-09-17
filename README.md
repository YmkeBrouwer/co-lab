# co-lab

**co-lab** ist ein Begegnungsort für Creatives: eine mobile App, mit der Kreative (Fotograf:innen, Illustrator:innen, Musiker:innen, Designer:innen, …) ihre Arbeiten vorstellen, neue Leute mit ähnlichen Interessen entdecken und sich für gemeinsame Projekte vernetzen können.

Semesterprojekt Mobile Web Development (React Native).

## Idee

Viele Creatives arbeiten isoliert und haben kaum eine einfache Möglichkeit, andere Kreative in ihrer Nähe zu finden, sich gegenseitig Feedback zu geben oder spontan Kollaborationen zu starten. co-lab schafft dafür einen einfachen, visuellen Treffpunkt: ein Portfolio zeigen, andere entdecken, connecten, austauschen.

## Kernfunktionen & Views

| # | View | Zweck |
|---|------|-------|
| 1 | **Signup** | Konto erstellen (E-Mail/Passwort oder Google/Apple) |
| 2 | **Profil einrichten** | Onboarding-Formular: Profilfoto, Name, Stadt, Disziplinen, Kurzbio |
| 3 | **Discover** | Masonry-Grid mit Werken/Profilen anderer Creatives, Suche + Disziplin-Filter |
| 4 | **Projects** | Board mit offenen Kolab-Gesuchen (Titel, Beschreibung, Disziplin, Plätze) |
| 5 | **Connections** | Liste bestehender Chats sowie neuer Verbindungen/Anfragen |
| 6 | **Profil** | Eigenes Profil mit Bio, Statistiken und Portfolio/Showcase |
| 7 | **Neues Projekt** | Formular zum Posten eines Kolab-Gesuchs (Titelbild, Titel, Beschreibung, Disziplin, Art, Anzahl Plätze) |

Damit erfüllt die App die geforderten mindestens 4 unterschiedlichen Views inkl. Formulareingaben (Signup, Profil einrichten, Neues Projekt), Interaktionen (Filter, Antworten, Verbinden) und Navigation zwischen den Views über eine Tab-Bar.

## GUI-Entwurf

Klickbare Wireframes aller 7 Views (Onboarding-Flow + App): **[co-lab Wireframes](https://claude.ai/artifact/4d1SjZt23UCUcXQNQTiEir)**

Design orientiert sich am bestehenden Repo [`colabapp`](https://github.com/YmkeBrouwer/colabapp) (schwarz/weiss/grau, Anton-Wordmark, Pill-Buttons, floating Tab-Bar), aber als deutlich einfachere Version für dieses Semesterprojekt.

## Geplanter Tech-Stack

- **React Native** mit **Expo** (schnelles Testen via Expo Go)
- **React Navigation** (Stack für Signup/Onboarding, Bottom-Tabs für Discover/Projects/Connections/Profil)
- **State-Verwaltung** über React Hooks / Context API
- Klare Komponentenstruktur (Screens, wiederverwendbare UI-Komponenten, State/Context getrennt)

## Annahmen & Grenzen

- Aktueller Stand: Konzept + GUI-Entwurf (Skizzenphase). Die Implementierung folgt nach Abgabe der Skizze.
- Bild-Uploads werden zunächst lokal/mock verarbeitet, kein eigenes Backend im Rahmen des Semesterprojekts geplant (sofern nicht anders entschieden).
- Discover-Funktion ist ein vereinfachter Swipe-Mechanismus ohne echten Matching-Algorithmus.
- Chat in "Connect" zeigt eine Liste von Konversationen; eine vollständige Echtzeit-Chat-Funktion ist kein Kernziel des Projekts.

## Team

- Ymke Brouwer

## Status

- [x] App-Idee definiert
- [x] GUI-Entwurf (Wireframes) erstellt
- [ ] React-Native-Projekt aufgesetzt
- [ ] Screens implementiert
- [ ] Navigation & State-Verwaltung
- [ ] Screen-Video für finale Abgabe
