// View 1 - Discover, hier sieht man andere Creatives und kann sich connecten
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useApp } from '../context/AppContext'
import { colors, radius } from '../theme'

export default function DiscoverScreen() {
  const { profiles, connectWithProfile } = useApp() // Daten + Funktion aus dem Context holen

  return (
    <View style={styles.container}>
      <Text style={styles.wordmark}>colab</Text>

      {/* FlatList statt einfach profiles.map(), weil die laut Doku
          performanter ist bei langen Listen (rendert nicht alles auf einmal) */}
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* hab noch kein echtes Bild-Upload, deshalb erstmal nur Initialen als Avatar */}
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name.split(' ').map((n) => n[0]).join('')}</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>{item.discipline} · {item.city}</Text>
              <Text style={styles.bio}>{item.bio}</Text>
            </View>
            {/* Pressable = klickbar. löst connectWithProfile aus dem Context aus */}
            <Pressable style={styles.connectBtn} onPress={() => connectWithProfile(item)}>
              <Text style={styles.connectBtnText}>connect</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingTop: 60 },
  wordmark: { fontSize: 22, fontWeight: '800', color: colors.black, paddingHorizontal: 16, marginBottom: 12, textTransform: 'uppercase' },
  list: { paddingHorizontal: 16, gap: 12, paddingBottom: 24 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.grey1, borderRadius: radius.md, padding: 14 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.grey2, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontWeight: '700', color: colors.black },
  cardBody: { flex: 1, gap: 2 },
  name: { fontSize: 15, fontWeight: '700', color: colors.black },
  meta: { fontSize: 12, color: colors.grey3, textTransform: 'uppercase', letterSpacing: 0.5 },
  bio: { fontSize: 13, color: colors.black, marginTop: 4 },
  connectBtn: { backgroundColor: colors.black, borderRadius: radius.pill, paddingHorizontal: 14, paddingVertical: 8 },
  connectBtnText: { color: colors.white, fontSize: 12, fontWeight: '600' },
})