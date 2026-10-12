// View - Discover. Die ganze Karte ist jetzt ein Pressable, das zum
// Profil-Detail navigiert. Der connect-Button ist ein EIGENES Pressable
// innerhalb davon - React Native lässt da das innere Element den Tap
// "gewinnen", man landet beim Draufklicken auf connect also nicht
// gleichzeitig im Profil-Detail
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useApp } from '../context/AppContext'
import { colors, radius } from '../theme'

export default function DiscoverScreen({ navigation }) {
  const { profiles, connectWithProfile, isConnectedWith } = useApp()

  return (
    <View style={styles.container}>
      <Text style={styles.wordmark}>colab</Text>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const connected = isConnectedWith(item.name)
          return (
            <Pressable style={styles.card} onPress={() => navigation.navigate('ProfileDetail', { profile: item })}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name.split(' ').map((n) => n[0]).join('')}</Text>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.meta}>{item.discipline} · {item.city}</Text>
                <Text style={styles.bio} numberOfLines={2}>{item.bio}</Text>
              </View>
              <Pressable
                style={[styles.connectBtn, connected && styles.connectBtnDone]}
                onPress={() => connectWithProfile(item)}
                disabled={connected}
              >
                <Text style={[styles.connectBtnText, connected && styles.connectBtnTextDone]}>
                  {connected ? 'verbunden ✓' : 'connect'}
                </Text>
              </Pressable>
            </Pressable>
          )
        }}
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
  connectBtnDone: { backgroundColor: colors.grey2 },
  connectBtnText: { color: colors.white, fontSize: 12, fontWeight: '600' },
  connectBtnTextDone: { color: colors.grey3 },
})