import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { ProfileStackParamList } from '../navigation/types'
import { useApp } from '../context/AppContext'
import { DISCIPLINES, Discipline } from '../types'
import { colors, radius } from '../theme'

type Props = NativeStackScreenProps<ProfileStackParamList, 'EditProfile'>

export default function EditProfileScreen({ navigation }: Props) {
  const { myProfile, updateMyProfile } = useApp()

  const [name, setName] = useState(myProfile?.name ?? '')
  const [city, setCity] = useState(myProfile?.city ?? '')
  const [discipline, setDiscipline] = useState<Discipline>(myProfile?.discipline ?? DISCIPLINES[0])
  const [bio, setBio] = useState(myProfile?.bio ?? '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const canSave = name.trim().length > 0 && city.trim().length > 0

  const handleSave = async () => {
    setLoading(true)
    setError('')
    const errorMessage = await updateMyProfile({ name, city, discipline, bio })
    setLoading(false)
    if (errorMessage) {
      setError(errorMessage)
      return
    }
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

      {!!error && <Text style={styles.errorText}>{error}</Text>}

      <Pressable style={[styles.saveBtn, (!canSave || loading) && styles.saveBtnDisabled]} disabled={!canSave || loading} onPress={handleSave}>
        <Text style={styles.saveBtnText}>{loading ? 'einen moment...' : 'speichern'}</Text>
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
  errorText: { color: '#D23B3B', fontSize: 13 },
  saveBtn: { marginTop: 28, backgroundColor: colors.black, borderRadius: radius.pill, padding: 16, alignItems: 'center' },
  saveBtnDisabled: { backgroundColor: colors.grey2 },
  saveBtnText: { color: colors.white, fontWeight: '700', fontSize: 14 },
})