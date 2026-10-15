import { Pressable, ScrollView, StyleSheet, Text } from 'react-native'
import { useApp } from '../context/AppContext'
import type { Project } from '../types'
import { colors, radius } from '../theme'

export default function ProjectDetailScreen({ route }: { route: { params: { project: Project } } }) {
  const { project } = route.params
  const { myProfile, connectWithProfile, isConnectedWith } = useApp()
  const isMine = project.authorId === myProfile?.id
  const connected = isConnectedWith(project.authorId)

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.tag}>{project.discipline}</Text>
      <Text style={styles.title}>{project.title}</Text>
      <Text style={styles.author}>von {project.author}</Text>
      <Text style={styles.desc}>{project.description}</Text>

      {!isMine && (
        <Pressable
          style={[styles.interestBtn, connected && styles.interestBtnDone]}
          onPress={() => connectWithProfile({ id: project.authorId, name: project.author })}
          disabled={connected}
        >
          <Text style={[styles.interestBtnText, connected && styles.interestBtnTextDone]}>
            {connected ? 'verbunden ✓' : 'Interesse zeigen'}
          </Text>
        </Pressable>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 24 },
  tag: { alignSelf: 'flex-start', backgroundColor: colors.grey1, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 5, fontSize: 12, fontWeight: '600', color: colors.black, marginBottom: 14 },
  title: { fontSize: 22, fontWeight: '800', color: colors.black },
  author: { fontSize: 13, color: colors.grey3, marginTop: 6 },
  desc: { fontSize: 15, color: colors.black, lineHeight: 23, marginTop: 18 },
  interestBtn: { marginTop: 28, backgroundColor: colors.black, borderRadius: radius.pill, padding: 16, alignItems: 'center' },
  interestBtnDone: { backgroundColor: colors.grey2 },
  interestBtnText: { color: colors.white, fontWeight: '700', fontSize: 14 },
  interestBtnTextDone: { color: colors.grey3 },
})