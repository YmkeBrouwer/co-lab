import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { DiscoverStackParamList } from '../navigation/types'
import { useApp } from '../context/AppContext'
import { colors, radius } from '../theme'

type Props = NativeStackScreenProps<DiscoverStackParamList, 'DiscoverList'>

export default function DiscoverScreen({ navigation }: Props) {
  const { profiles, connectWithProfile, getConnectionStatus } = useApp()

  // wer schon verbunden ist, gehört in den Connections-Tab, nicht mehr
  // nach Discover - sonst sieht man die gleiche Person doppelt
  const visibleProfiles = profiles.filter((p) => getConnectionStatus(p.id) !== 'accepted')

  return (
    <View style={styles.container}>
      <Text style={styles.wordmark}>colab</Text>
      {visibleProfiles.length === 0 ? (
        <Text style={styles.empty}>Noch keine anderen Creatives da — schau später nochmal vorbei.</Text>
      ) : (
        <FlatList
          data={visibleProfiles}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const status = getConnectionStatus(item.id)
            const disabled = status !== 'none'
            const label = status === 'pending-sent' ? 'angefragt...' : status === 'pending-received' ? 'Anfrage erhalten' : 'connect'
            return (
              <Pressable style={styles.card} onPress={() => navigation.navigate('ProfileDetail', { profile: item })}>
                {item.avatarUrl ? (
                  <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{item.name.split(' ').map((n) => n[0]).join('')}</Text>
                  </View>
                )}
                <View style={styles.cardBody}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.meta}>{item.discipline} · {item.city}</Text>
                  <Text style={styles.bio} numberOfLines={2}>{item.bio}</Text>
                </View>
                <Pressable
                  style={[styles.connectBtn, disabled && styles.connectBtnDone]}
                  onPress={() => connectWithProfile(item)}
                  disabled={disabled}
                >
                  <Text style={[styles.connectBtnText, disabled && styles.connectBtnTextDone]}>{label}</Text>
                </Pressable>
              </Pressable>
            )
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingTop: 60 },
  wordmark: { fontSize: 22, fontWeight: '800', color: colors.black, paddingHorizontal: 16, marginBottom: 12, textTransform: 'uppercase' },
  empty: { paddingHorizontal: 16, color: colors.grey3, fontSize: 14, lineHeight: 20 },
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