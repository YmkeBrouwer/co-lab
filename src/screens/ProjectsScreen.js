// View 2 - Projects, Übersicht der offenen Kolab-Gesuche
// "navigation" kriegt man automatisch als prop rein, weil der Screen in
// einem Stack Navigator drin ist (siehe RootNavigator.js)
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useApp } from '../context/AppContext'
import { colors, radius } from '../theme'

export default function ProjectsScreen({ navigation }) {
  const { projects } = useApp()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.wordmark}>projects</Text>
        {/* springt zum NewProject Screen, ist im selben Stack registriert */}
        <Pressable style={styles.addBtn} onPress={() => navigation.navigate('NewProject')}>
          <Text style={styles.addBtnText}>+</Text>
        </Pressable>
      </View>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.tag}>{item.discipline}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            <Text style={styles.author}>von {item.author}</Text>
          </View>
        )}
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
  author: { fontSize: 11, color: colors.grey3 },
})