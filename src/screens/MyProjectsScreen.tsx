import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { ProfileStackParamList } from '../navigation/types'
import { useApp } from '../context/AppContext'
import { colors, radius } from '../theme'

type Props = NativeStackScreenProps<ProfileStackParamList, 'MyProjects'>

export default function MyProjectsScreen({ navigation }: Props) {
  const { projects, myProfile } = useApp()
  const myProjects = projects.filter((p) => p.authorId === myProfile?.id)

  return (
    <View style={styles.container}>
      {myProjects.length === 0 ? (
        <Text style={styles.empty}>Du hast noch keine Projekte gepostet.</Text>
      ) : (
        <FlatList
          data={myProjects}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable style={styles.card} onPress={() => navigation.navigate('ProjectDetail', { project: item })}>
              <Text style={styles.tag}>{item.discipline}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
            </Pressable>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingTop: 16 },
  empty: { paddingHorizontal: 16, color: colors.grey3, fontSize: 14, lineHeight: 20 },
  list: { paddingHorizontal: 16, gap: 12, paddingBottom: 24 },
  card: { backgroundColor: colors.grey1, borderRadius: radius.md, padding: 14, gap: 6 },
  tag: { alignSelf: 'flex-start', backgroundColor: colors.grey2, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 4, fontSize: 11, fontWeight: '600', color: colors.black },
  title: { fontSize: 15, fontWeight: '700', color: colors.black },
  desc: { fontSize: 13, color: colors.black },
})