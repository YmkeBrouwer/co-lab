// View 3 - Neues Projekt posten, das ist mein Formular-Screen für die Aufgabe
import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useApp } from '../context/AppContext'
import { DISCIPLINES } from '../data/mockData'
import { colors, radius } from '../theme'

export default function NewProjectScreen({ navigation }) {
  const { addProject } = useApp()

  // das ist nur der lokale State für die Formularfelder, kommt erst beim
  // Abschicken in den globalen State (Context) - macht für mich mehr Sinn,
  // als jeden Tastendruck sofort global zu speichern
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [discipline, setDiscipline] = useState(DISCIPLINES[0])

  // simple Validierung - Button geht erst wenn Titel + Beschreibung da sind
  const canSubmit = title.trim().length > 0 && description.trim().length > 0

  const handleSubmit = () => {
    addProject({ title, description, discipline })
    navigation.goBack() // zurück zur Liste, das neue Projekt taucht dann oben auf
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Titel</Text>
      <TextInput
        style={styles.input}
        placeholder="z. B. Cover-Artwork gesucht"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Beschreibung</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Worum geht's, was suchst du?"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Disziplin</Text>
      {/* hab mich für Chips statt Dropdown entschieden, find ich auf dem Handy
          angenehmer zu bedienen als ein Picker-Menü */}
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

      <Pressable
        style={[styles.submitBtn, !canSubmit && styles.submitBtnDisabled]}
        onPress={handleSubmit}
        disabled={!canSubmit}
      >
        <Text style={styles.submitBtnText}>posten</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 20, gap: 8 },
  label: { fontSize: 12, fontWeight: '600', color: colors.grey3, textTransform: 'uppercase', marginTop: 12, marginBottom: 6 },
  input: { backgroundColor: colors.grey1, borderRadius: radius.md, padding: 14, fontSize: 15, color: colors.black },
  multiline: { minHeight: 90, textAlignVertical: 'top' },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.pill, backgroundColor: colors.grey1 },
  chipActive: { backgroundColor: colors.black },
  chipText: { fontSize: 13, color: colors.black },
  chipTextActive: { color: colors.white, fontWeight: '600' },
  submitBtn: { marginTop: 24, backgroundColor: colors.black, borderRadius: radius.pill, padding: 16, alignItems: 'center' },
  submitBtnDisabled: { backgroundColor: colors.grey2 },
  submitBtnText: { color: colors.white, fontWeight: '700', fontSize: 14 },
})