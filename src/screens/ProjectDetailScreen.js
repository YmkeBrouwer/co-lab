// Detailansicht eines Projekts, erreichbar durch Antippen einer Karte in
// Projects. route.params.project kommt direkt aus der Liste rein
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native'
import { useApp } from '../context/AppContext'
import { colors, radius } from '../theme'

export default function ProjectDetailScreen({ route }) {
  const { project } = route.params
  const { myProfile, connectWithProfile, isConnectedWith } = useApp()
  const isMine = project.author === myProfile.name
  const connected = isConnectedWith(project.author)

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.tag}>{project.discipline}</Text>
      <Text style={styles.title}>{project.title}</Text>
      <Text style={styles.author}>von {project.author}</Text>
      <Text style={styles.desc}>{project.description}</Text>

      {/* bei eigenen Projekten gibt's hier keinen Button, macht ja keinen
          Sinn sich selbst Interesse zu zeigen */}
      {!isMine && (
        <Pressable
          style={[styles.interestBtn, connected && styles.interestBtnDone]}
          onPress={() => connectWithProfile({ name: project.author })}
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
