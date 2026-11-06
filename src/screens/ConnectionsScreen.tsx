import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { ConnectionsStackParamList } from '../navigation/types'
import { useApp } from '../context/AppContext'
import { DISCIPLINES } from '../types'
import type { Connection } from '../types'
import { colors, radius } from '../theme'

type Props = NativeStackScreenProps<ConnectionsStackParamList, 'ConnectionsList'>

export default function ConnectionsScreen({ navigation }: Props) {
  const { connections, profiles, respondToConnection } = useApp()

  const incoming = connections.filter((c) => c.direction === 'received' && c.status === 'pending')
  const accepted = connections.filter((c) => c.status === 'accepted')

  const openProfile = (connection: Connection) => {
    const fullProfile = profiles.find((p) => p.id === connection.profileId)
    navigation.navigate('ProfileDetail', {
      profile: fullProfile || {
        id: connection.profileId,
        name: connection.name,
        discipline: DISCIPLINES[0],
        city: '',
        bio: '',
        avatarUrl: null,
      },
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.wordmark}>connections</Text>

      {incoming.length > 0 && (
        <View style={styles.requestsBlock}>
          <Text style={styles.sectionLabel}>Anfragen</Text>
          {incoming.map((item) => (
            <View key={item.id} style={styles.requestRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name.split(' ').map((n) => n[0]).join('')}</Text>
              </View>
              <Text style={styles.requestName}>{item.name}</Text>
              <Pressable style={styles.acceptBtn} onPress={() => respondToConnection(item.id, true)}>
                <Text style={styles.acceptBtnText}>Annehmen</Text>
              </Pressable>
              <Pressable style={styles.declineBtn} onPress={() => respondToConnection(item.id, false)}>
                <Text style={styles.declineBtnText}>Ablehnen</Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}

      {accepted.length === 0 ? (
        <Text style={styles.empty}>Noch keine Connections — geh zu Discover und connecte dich mit jemandem.</Text>
      ) : (
        <FlatList
          data={accepted}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable style={styles.row} onPress={() => openProfile(item)}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name.split(' ').map((n) => n[0]).join('')}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.message}>Verbunden</Text>
              </View>
            </Pressable>
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
  requestsBlock: { paddingHorizontal: 16, marginBottom: 20, gap: 10 },
  sectionLabel: { fontSize: 11, letterSpacing: 1, color: colors.grey3, textTransform: 'uppercase', marginBottom: 2 },
  requestRow: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.grey1, borderRadius: radius.md, padding: 12 },
  requestName: { flex: 1, fontSize: 14, fontWeight: '700', color: colors.black },
  acceptBtn: { backgroundColor: colors.black, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 7 },
  acceptBtnText: { color: colors.white, fontSize: 12, fontWeight: '600' },
  declineBtn: { paddingHorizontal: 8, paddingVertical: 7 },
  declineBtnText: { color: colors.grey3, fontSize: 12, fontWeight: '600' },
  list: { paddingHorizontal: 16, gap: 10, paddingBottom: 24 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.grey1, borderRadius: radius.md, padding: 14 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.grey2, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontWeight: '700', color: colors.black },
  name: { fontSize: 14, fontWeight: '700', color: colors.black },
  message: { fontSize: 13, color: colors.grey3, marginTop: 2 },
})