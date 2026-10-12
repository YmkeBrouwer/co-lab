// View 4 - Connections, Liste von Leuten mit denen ich schon verbunden bin
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useApp } from '../context/AppContext'
import { colors, radius } from '../theme'

export default function ConnectionsScreen() {
  const { connections } = useApp()

  return (
    <View style={styles.container}>
      <Text style={styles.wordmark}>connections</Text>

      {/* falls noch keine Connections da sind, zeig ich lieber einen Hinweistext
          als eine leere weisse Fläche - hab ich so bei den anderen Apps gesehen */}
      {connections.length === 0 ? (
        <Text style={styles.empty}>Noch keine Connections — geh zu Discover und connecte dich mit jemandem.</Text>
      ) : (
        <FlatList
          data={connections}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name.split(' ').map((n) => n[0]).join('')}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.message} numberOfLines={1}>{item.lastMessage}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingTop: 60 },
  wordmark: { fontSize: 22, fontWeight: '800', color: colors.black, paddingHorizontal: 16, marginBottom: 12, textTransform: 'uppercase' },
  empty: { paddingHorizontal: 16, color: colors.grey3, fontSize: 14, lineHeight: 20 },
  list: { paddingHorizontal: 16, gap: 10, paddingBottom: 24 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.grey1, borderRadius: radius.md, padding: 14 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.grey2, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontWeight: '700', color: colors.black },
  name: { fontSize: 14, fontWeight: '700', color: colors.black },
  message: { fontSize: 13, color: colors.grey3, marginTop: 2 },
})