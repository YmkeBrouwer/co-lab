import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { ProjectsStackParamList } from '../navigation/types'
import { useApp } from '../context/AppContext'
import { colors, radius } from '../theme'

type Props = NativeStackScreenProps<ProjectsStackParamList, 'ProjectsList'>

export default function ProjectsScreen({ navigation }: Props) {
  const { projects, myProfile, connectWithProfile, isConnectedWith } = useApp()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.wordmark}>projects</Text>
        <Pressable style={styles.addBtn} onPress={() => navigation.navigate('NewProject')}>
          <Text style={styles.addBtnText}>+</Text>
        </Pressable>
      </View>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isMine = item.authorId === myProfile?.id
          const connected = isConnectedWith(item.authorId)
          return (
            <Pressable style={styles.card} onPress={() => navigation.navigate('ProjectDetail', { project: item })}>
              <Text style={styles.tag}>{item.discipline}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
              <View style={styles.footer}>
                <Text style={styles.author}>von {item.author}</Text>
                {!isMine && (
                  <Pressable
                    style={[styles.interestBtn, connected && styles.interestBtnDone]}
                    onPress={() => connectWithProfile({ id: item.authorId, name: item.author })}
                    disabled={connected}
                  >
                    <Text style={[styles.interestBtnText, connected && styles.interestBtnTextDone]}>
                      {connected ? 'verbunden ✓' : 'Interesse zeigen'}
                    </Text>
                  </Pressable>
                )}
              </View>
            </Pressable>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 12 },
  wordmark: { fontSize: 22, fontWeight: '800', color: colors.black, textTransform: 'uppercase' },
  addBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.black, alignItems: 'center', justifyContent: 'center' },
  addBtnText: { color: colors.white, fontSize: 18, lineHeight: 18 },
  list: { paddingHorizontal: 16, gap: 12, paddingBottom: 24 },
  card: { backgroundColor: colors.grey1, borderRadius: radius.md, padding: 14, gap: 6 },
  tag: { alignSelf: 'flex-start', backgroundColor: colors.grey2, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 4, fontSize: 11, fontWeight: '600', color: colors.black },
  title: { fontSize: 15, fontWeight: '700', color: colors.black },
  desc: { fontSize: 13, color: colors.black },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  author: { fontSize: 11, color: colors.grey3 },
  interestBtn: { backgroundColor: colors.black, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 6 },
  interestBtnDone: { backgroundColor: colors.grey2 },
  interestBtnText: { color: colors.white, fontSize: 11, fontWeight: '600' },
  interestBtnTextDone: { color: colors.grey3 },
})