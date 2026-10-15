import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { ConnectionsStackParamList } from '../navigation/types'
import { useApp } from '../context/AppContext'
import { DISCIPLINES } from '../types'
import type { Connection } from '../types'
import { colors, radius } from '../theme'

type Props = NativeStackScreenProps<ConnectionsStackParamList, 'ConnectionsList'>

export default function ConnectionsScreen({ navigation }: Props) {
  const { connections, profiles } = useApp()

  const openProfile = (connection: Connection) => {
    const fullProfile = profiles.find((p) => p.id === connection.profileId)
    navigation.navigate('ProfileDetail', {
      profile: fullProfile || {
        id: connection.profileId,
        name: connection.name,
        discipline: DISCIPLINES[0],
        city: '',
        bio: '',
      },
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.wordmark}>connections</Text>

      {connections.length === 0 ? (
        <Text style={styles.empty}>Noch keine Connections — geh zu Discover und connecte dich mit jemandem.</Text>
      ) : (
        <FlatList
          data={connections}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable style={styles.row} onPress={() => openProfile(item)}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name.split(' ').map((n) => n[0]).join('')}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.message} numberOfLines={1}>{item.lastMessage}</Text>
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
  list: { paddingHorizontal: 16, gap: 10, paddingBottom: 24 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.grey1, borderRadius: radius.md, padding: 14 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.grey2, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontWeight: '700', color: colors.black },
  name: { fontSize: 14, fontWeight: '700', color: colors.black },
  message: { fontSize: 13, color: colors.grey3, marginTop: 2 },
})