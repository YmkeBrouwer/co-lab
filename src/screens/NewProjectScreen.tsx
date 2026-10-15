import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { ProjectsStackParamList } from '../navigation/types'
import { useApp } from '../context/AppContext'
import { DISCIPLINES, Discipline } from '../types'
import { colors, radius } from '../theme'

type Props = NativeStackScreenProps<ProjectsStackParamList, 'NewProject'>

export default function NewProjectScreen({ navigation }: Props) {
  const { addProject } = useApp()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [discipline, setDiscipline] = useState<Discipline>(DISCIPLINES[0])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const canSubmit = title.trim().length > 0 && description.trim().length > 0

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    const errorMessage = await addProject({ title, description, discipline })
    setLoading(false)
    if (errorMessage) {
      setError(errorMessage)
      return
    }
    navigation.goBack()
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

      {!!error && <Text style={styles.errorText}>{error}</Text>}

      <Pressable
        style={[styles.submitBtn, (!canSubmit || loading) && styles.submitBtnDisabled]}
        onPress={handleSubmit}
        disabled={!canSubmit || loading}
      >
        <Text style={styles.submitBtnText}>{loading ? 'einen moment...' : 'posten'}</Text>
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
  errorText: { color: '#D23B3B', fontSize: 13 },
  submitBtn: { marginTop: 24, backgroundColor: colors.black, borderRadius: radius.pill, padding: 16, alignItems: 'center' },
  submitBtnDisabled: { backgroundColor: colors.grey2 },
  submitBtnText: { color: colors.white, fontWeight: '700', fontSize: 14 },
})