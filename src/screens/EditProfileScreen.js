// Fast derselbe Aufbau wie ProfileSetupScreen beim Onboarding, nur dass die
// Felder hier schon mit den aktuellen Werten vorausgefüllt sind und am Ende
// setMyProfile() direkt aufgerufen wird statt completeOnboarding()
import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useApp } from '../context/AppContext'
import { DISCIPLINES } from '../data/mockData'
import { colors, radius } from '../theme'

export default function EditProfileScreen({ navigation }) {
  const { myProfile, setMyProfile } = useApp()
  const [name, setName] = useState(myProfile.name)
  const [city, setCity] = useState(myProfile.city)
  const [discipline, setDiscipline] = useState(myProfile.discipline)
  const [bio, setBio] = useState(myProfile.bio)

  const canSave = name.trim().length > 0 && city.trim().length > 0

  const handleSave = () => {
    setMyProfile({ name, city, discipline, bio })
    navigation.goBack()
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Stadt</Text>
      <TextInput style={styles.input} value={city} onChangeText={setCity} />

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

      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={3}
      />

      <Pressable style={[styles.saveBtn, !canSave && styles.saveBtnDisabled]} disabled={!canSave} onPress={handleSave}>
        <Text style={styles.saveBtnText}>speichern</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 24, gap: 4 },
  label: { fontSize: 12, fontWeight: '600', color: colors.grey3, textTransform: 'uppercase', marginTop: 14, marginBottom: 6 },
  input: { backgroundColor: colors.grey1, borderRadius: radius.md, padding: 15, fontSize: 15, color: colors.black },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.pill, backgroundColor: colors.grey1 },
  chipActive: { backgroundColor: colors.black },
  chipText: { fontSize: 13, color: colors.black },
  chipTextActive: { color: colors.white, fontWeight: '600' },
  saveBtn: { marginTop: 28, backgroundColor: colors.black, borderRadius: radius.pill, padding: 16, alignItems: 'center' },
  saveBtnDisabled: { backgroundColor: colors.grey2 },
  saveBtnText: { color: colors.white, fontWeight: '700', fontSize: 14 },
})