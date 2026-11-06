import { useState } from 'react'
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Feather } from '@expo/vector-icons'
import { useApp } from '../context/AppContext'
import { uploadAvatar } from '../lib/uploadAvatar'
import { DISCIPLINES, Discipline } from '../types'
import { colors, radius } from '../theme'

export default function ProfileSetupScreen() {
  const { completeOnboarding, userId } = useApp()
  const [photoUri, setPhotoUri] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [discipline, setDiscipline] = useState<Discipline>(DISCIPLINES[0])
  const [bio, setBio] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const canFinish = name.trim().length > 0 && city.trim().length > 0

  const handlePickPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      setError('Ohne Zugriff auf deine Fotos kein Profilbild möglich.')
      return
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    })
    if (!result.canceled && result.assets[0]) {
      setPhotoUri(result.assets[0].uri)
    }
  }

  const handleFinish = async () => {
    setLoading(true)
    setError('')

    // erst das Bild hochladen (falls gewählt), dann erst das Profil
    // anlegen - so ist die URL schon da, bevor der Datenbank-Eintrag
    // erstellt wird
    let avatarUrl: string | null = null
    if (photoUri && userId) {
      try {
        avatarUrl = await uploadAvatar(userId, photoUri)
      } catch {
        setLoading(false)
        setError('Foto konnte nicht hochgeladen werden.')
        return
      }
    }

    const errorMessage = await completeOnboarding({ name, city, discipline, bio, avatarUrl })
    setLoading(false)
    if (errorMessage) setError(errorMessage)
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Fang mit dir an</Text>
        <Text style={styles.subtitle}>Dein Profil ist dein erster Eindruck.</Text>

        <Pressable style={styles.photoPicker} onPress={handlePickPhoto}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photoPreview} />
          ) : (
            <>
              <Feather name="camera" size={22} color={colors.grey3} />
              <Text style={styles.photoText}>Profilfoto hinzufügen</Text>
            </>
          )}
        </Pressable>

        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} placeholder="Sara Müller" value={name} onChangeText={setName} />

        <Text style={styles.label}>Stadt</Text>
        <TextInput style={styles.input} placeholder="Zürich" value={city} onChangeText={setCity} />

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

        <Text style={styles.label}>Kurzbio</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Erzähl kurz, wofür du stehst..."
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={3}
        />

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <Pressable
          style={[styles.submitBtn, (!canFinish || loading) && styles.submitBtnDisabled]}
          disabled={!canFinish || loading}
          onPress={handleFinish}
        >
          <Text style={styles.submitBtnText}>{loading ? 'einen moment...' : 'fertig'}</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 26, paddingTop: 70, gap: 4 },
  title: { fontSize: 26, fontWeight: '800', color: colors.black },
  subtitle: { fontSize: 14, color: colors.grey3, marginBottom: 16 },
  photoPicker: { borderRadius: radius.md, padding: 20, backgroundColor: colors.grey1, alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8, height: 120 },
  photoPreview: { width: 84, height: 84, borderRadius: 42 },
  photoText: { fontSize: 13, color: colors.grey3 },
  label: { fontSize: 12, fontWeight: '600', color: colors.grey3, textTransform: 'uppercase', marginTop: 14, marginBottom: 6 },
  input: { backgroundColor: colors.grey1, borderRadius: radius.md, padding: 15, fontSize: 15, color: colors.black },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.pill, backgroundColor: colors.grey1 },
  chipActive: { backgroundColor: colors.black },
  chipText: { fontSize: 13, color: colors.black },
  chipTextActive: { color: colors.white, fontWeight: '600' },
  errorText: { color: '#D23B3B', fontSize: 13, marginTop: 8 },
  submitBtn: { marginTop: 28, backgroundColor: colors.black, borderRadius: radius.pill, padding: 18, alignItems: 'center' },
  submitBtnDisabled: { backgroundColor: colors.grey2 },
  submitBtnText: { color: colors.white, fontWeight: '700', fontSize: 14 },
})