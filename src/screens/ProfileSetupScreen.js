// Zweiter Onboarding-Screen, direkt nach Signup. Hier gebe ich die Daten
// für mein eigenes Profil ein. Sobald ich auf "fertig" tippe, wird
// completeOnboarding() im Context aufgerufen - das setzt myProfile, und
// weil RootNavigator darauf achtet ob myProfile null ist oder nicht,
// springt die App automatisch zur eigentlichen Tab-Ansicht. Kein manueller
// navigation.navigate() nötig, das übernimmt der Context-State von selbst
import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useApp } from '../context/AppContext'
import { DISCIPLINES } from '../data/mockData'
import { colors, radius } from '../theme'

export default function ProfileSetupScreen() {
  const { completeOnboarding } = useApp()
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [discipline, setDiscipline] = useState(DISCIPLINES[0])
  const [bio, setBio] = useState('')

  // Name und Stadt sollten schon ausgefüllt sein, Bio ist optional
  const canFinish = name.trim().length > 0 && city.trim().length > 0

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Fang mit dir an</Text>
      <Text style={styles.subtitle}>Dein Profil ist dein erster Eindruck.</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} placeholder="Sara Müller" value={name} onChangeText={setName} />

      <Text style={styles.label}>Stadt</Text>
      <TextInput style={styles.input} placeholder="Zürich" value={city} onChangeText={setCity} />

      <Text style={styles.label}>Disziplin</Text>
      {/* gleiche Chip-Auswahl wie beim Neues-Projekt-Formular, finde ich
          konsistenter als für jedes Formular was anderes zu bauen */}
      <View style={styles.chipsRow}>
        {DISCIPLINES.map((d) => (
          <Pressable
            key={d}
            style={[styles.chip, discipline === d && styles.chipActive]}
            onPress={() => setDiscipline(d)}
          >
            <Text style={[styles.chipText, discipline === d && styles.chipTextActive]}>{d}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Kurzbio</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Erzähl kurz, wofür du stehst..."
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={3}
      />

      <Pressable
        style={[styles.submitBtn, !canFinish && styles.submitBtnDisabled]}
        disabled={!canFinish}
        onPress={() => completeOnboarding({ name, city, discipline, bio })}
      >
        <Text style={styles.submitBtnText}>fertig</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 26, paddingTop: 70, gap: 4 },
  title: { fontSize: 26, fontWeight: '800', color: colors.black },
  subtitle: { fontSize: 14, color: colors.grey3, marginBottom: 16 },
  label: { fontSize: 12, fontWeight: '600', color: colors.grey3, textTransform: 'uppercase', marginTop: 14, marginBottom: 6 },
  input: { backgroundColor: colors.grey1, borderRadius: radius.md, padding: 15, fontSize: 15, color: colors.black },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.pill, backgroundColor: colors.grey1 },
  chipActive: { backgroundColor: colors.black },
  chipText: { fontSize: 13, color: colors.black },
  chipTextActive: { color: colors.white, fontWeight: '600' },
  submitBtn: { marginTop: 28, backgroundColor: colors.black, borderRadius: radius.pill, padding: 18, alignItems: 'center' },
  submitBtnDisabled: { backgroundColor: colors.grey2 },
  submitBtnText: { color: colors.white, fontWeight: '700', fontSize: 14 },
})