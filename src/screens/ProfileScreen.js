// Mein eigenes Profil - jetzt nur noch eine Übersicht. Bearbeiten passiert
// auf einem eigenen Screen (EditProfile), weil man da gleich ALLE Felder
// ändern kann (Name, Stadt, Disziplin, Bio) statt wie vorher nur die Bio
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useApp } from '../context/AppContext'
import { colors, radius } from '../theme'

export default function ProfileScreen({ navigation }) {
  const { myProfile, projects } = useApp()
  const myProjectCount = projects.filter((p) => p.author === myProfile.name).length

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{myProfile.name.split(' ').map((n) => n[0]).join('')}</Text>
      </View>
      <Text style={styles.name}>{myProfile.name}</Text>
      <Text style={styles.city}>{myProfile.discipline} · {myProfile.city}</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCell}>
          <Text style={styles.statNum}>{myProjectCount}</Text>
          <Text style={styles.statLabel}>Projekte</Text>
        </View>
      </View>

      <View style={styles.bioBlock}>
        <Text style={styles.label}>Bio</Text>
        <Text style={styles.bioText}>{myProfile.bio || 'Noch keine Bio hinzugefügt.'}</Text>
      </View>

      <Pressable style={styles.editBtn} onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.editBtnText}>Profil bearbeiten</Text>
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
  bioBlock: { marginTop: 28 },
  label: { fontSize: 12, fontWeight: '600', color: colors.grey3, textTransform: 'uppercase', marginBottom: 6 },
  bioText: { fontSize: 14, color: colors.black, lineHeight: 21 },
  editBtn: { marginTop: 24, borderRadius: radius.pill, borderWidth: 1.5, borderColor: colors.black, padding: 14, alignItems: 'center' },
  editBtnText: { color: colors.black, fontWeight: '700', fontSize: 13 },
})