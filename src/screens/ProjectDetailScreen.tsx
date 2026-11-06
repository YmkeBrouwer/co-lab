import { Pressable, ScrollView, StyleSheet, Text } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { ProjectsStackParamList } from '../navigation/types'
import { useApp } from '../context/AppContext'
import { colors, radius } from '../theme'

type Props = NativeStackScreenProps<ProjectsStackParamList, 'ProjectDetail'>

export default function ProjectDetailScreen({ route }: Props) {
  const { project } = route.params
  const { myProfile, connectWithProfile, getConnectionStatus } = useApp()
  const isMine = project.authorId === myProfile?.id
  const status = getConnectionStatus(project.authorId)
  const disabled = status !== 'none'
  const label = status === 'accepted' ? 'verbunden ✓' : status === 'pending-sent' ? 'angefragt...' : status === 'pending-received' ? 'Anfrage erhalten' : 'Interesse zeigen'

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.tag}>{project.discipline}</Text>
      <Text style={styles.title}>{project.title}</Text>
      <Text style={styles.author}>von {project.author}</Text>
      <Text style={styles.desc}>{project.description}</Text>

      {!isMine && (
        <Pressable
          style={[styles.interestBtn, disabled && styles.interestBtnDone]}
          onPress={() => connectWithProfile({ id: project.authorId, name: project.author })}
          disabled={disabled}
        >
          <Text style={[styles.interestBtnText, disabled && styles.interestBtnTextDone]}>{label}</Text>
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