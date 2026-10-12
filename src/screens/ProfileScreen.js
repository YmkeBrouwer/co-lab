// View 5 - mein eigenes Profil, Bio kann ich hier bearbeiten (nochmal ein Formular-Beispiel)
import { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useApp } from '../context/AppContext'
import { colors, radius } from '../theme'

export default function ProfileScreen() {
  const { myProfile, setMyProfile, projects } = useApp()

  // eigener State für das Textfeld, damit die Bio erst beim "speichern"
  // wirklich geändert wird und nicht schon bei jedem Buchstaben
  const [bio, setBio] = useState(myProfile.bio)

  // brauch dafür keinen eigenen State, wird einfach bei jedem Render neu ausgerechnet
  const myProjectCount = projects.filter((p) => p.author === myProfile.name).length

  const handleSave = () => {
    setMyProfile((prev) => ({ ...prev, bio }))
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{myProfile.name.split(' ').map((n) => n[0]).join('')}</Text>
      </View>
      <Text style={styles.name}>{myProfile.name}</Text>
      <Text style={styles.city}>{myProfile.city}</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCell}>
          <Text style={styles.statNum}>{myProjectCount}</Text>
          <Text style={styles.statLabel}>Projekte</Text>
        </View>
      </View>

      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={styles.input}
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={3}
      />
      <Pressable style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>speichern</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingTop: 60, paddingHorizontal: 20 },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.grey1, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' },
  avatarText: { fontSize: 20, fontWeight: '700', color: colors.black },
  name: { fontSize: 20, fontWeight: '800', color: colors.black, textAlign: 'center', marginTop: 12 },
  city: { fontSize: 13, color: colors.grey3, textAlign: 'center', marginTop: 2 },
  statsRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  statCell: { alignItems: 'center', backgroundColor: colors.grey1, borderRadius: radius.md, paddingVertical: 12, paddingHorizontal: 24 },
  statNum: { fontSize: 18, fontWeight: '700', color: colors.black },
  statLabel: { fontSize: 11, color: colors.grey3, textTransform: 'uppercase', marginTop: 2 },
  label: { fontSize: 12, fontWeight: '600', color: colors.grey3, textTransform: 'uppercase', marginTop: 24, marginBottom: 6 },
  input: { backgroundColor: colors.grey1, borderRadius: radius.md, padding: 14, fontSize: 14, color: colors.black, minHeight: 70, textAlignVertical: 'top' },
  saveBtn: { marginTop: 16, backgroundColor: colors.black, borderRadius: radius.pill, padding: 14, alignItems: 'center' },
  saveBtnText: { color: colors.white, fontWeight: '700', fontSize: 13 },
})