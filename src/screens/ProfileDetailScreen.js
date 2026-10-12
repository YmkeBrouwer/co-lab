// Detailansicht eines fremden Profils, erreichbar durch Antippen einer
// Karte in Discover. Das profile-Objekt kommt per
// navigation.navigate('ProfileDetail', { profile: item }) rein und landet
// hier in route.params. Zeigt zusätzlich die Projekte dieser Person, damit
// man sieht woran sie gerade arbeitet, bevor man connected
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useApp } from '../context/AppContext'
import { colors, radius } from '../theme'

export default function ProfileDetailScreen({ route }) {
  const { profile } = route.params
  const { projects, connectWithProfile, isConnectedWith } = useApp()
  const connected = isConnectedWith(profile.name)
  const theirProjects = projects.filter((p) => p.author === profile.name)

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{profile.name.split(' ').map((n) => n[0]).join('')}</Text>
      </View>
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.meta}>{profile.discipline} · {profile.city}</Text>
      <Text style={styles.bio}>{profile.bio}</Text>

      <Pressable
        style={[styles.connectBtn, connected && styles.connectBtnDone]}
        onPress={() => connectWithProfile(profile)}
        disabled={connected}
      >
        <Text style={[styles.connectBtnText, connected && styles.connectBtnTextDone]}>
          {connected ? 'verbunden ✓' : 'connect'}
        </Text>
      </Pressable>

      {theirProjects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projekte</Text>
          {theirProjects.map((p) => (
            <View key={p.id} style={styles.projectCard}>
              <Text style={styles.projectTitle}>{p.title}</Text>
              <Text style={styles.projectDesc}>{p.description}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 24, alignItems: 'center' },
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: colors.grey1, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 24, fontWeight: '700', color: colors.black },
  name: { fontSize: 22, fontWeight: '800', color: colors.black, marginTop: 14 },
  meta: { fontSize: 13, color: colors.grey3, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 },
  bio: { fontSize: 14, color: colors.black, textAlign: 'center', marginTop: 14, lineHeight: 21 },
  connectBtn: { marginTop: 20, backgroundColor: colors.black, borderRadius: radius.pill, paddingHorizontal: 28, paddingVertical: 12 },
  connectBtnDone: { backgroundColor: colors.grey2 },
  connectBtnText: { color: colors.white, fontSize: 13, fontWeight: '600' },
  connectBtnTextDone: { color: colors.grey3 },
  section: { width: '100%', marginTop: 32 },
  sectionTitle: { fontSize: 11, letterSpacing: 1, color: colors.grey3, textTransform: 'uppercase', marginBottom: 10 },
  projectCard: { backgroundColor: colors.grey1, borderRadius: radius.md, padding: 14, marginBottom: 10 },
  projectTitle: { fontSize: 14, fontWeight: '700', color: colors.black },
  projectDesc: { fontSize: 13, color: colors.black, marginTop: 4 },
})