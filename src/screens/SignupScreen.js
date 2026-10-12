// Erster Screen beim App-Start. Kein echtes Backend dahinter - für dieses
// Projekt reicht es, wenn man einfach E-Mail/Passwort eingibt und weiter
// zum Profil-Setup kommt. Eine echte Anmeldung wäre ein eigenes Thema für
// sich (Supabase o.ä.), das sprengt hier den Rahmen
import { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { colors, radius } from '../theme'

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // simple Validierung, nur dass man nicht mit leeren Feldern weiterkommt
  const canContinue = email.trim().length > 0 && password.trim().length >= 6

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.wordmark}>colab</Text>
        <Text style={styles.subtitle}>for creatives</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>E-Mail</Text>
        <TextInput
          style={styles.input}
          placeholder="du@studio.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Passwort</Text>
        <TextInput
          style={styles.input}
          placeholder="mind. 6 Zeichen"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* geht einfach zum nächsten Screen im selben Stack (siehe RootNavigator),
            es wird hier noch nichts im Context gespeichert - das Profil kommt erst danach */}
        <Pressable
          style={[styles.submitBtn, !canContinue && styles.submitBtnDisabled]}
          disabled={!canContinue}
          onPress={() => navigation.navigate('ProfileSetup')}
        >
          <Text style={styles.submitBtnText}>konto erstellen</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 26, paddingTop: 90 },
  header: { marginBottom: 48 },
  wordmark: { fontSize: 30, fontWeight: '800', color: colors.black, textTransform: 'uppercase' },
  subtitle: { fontSize: 13, color: colors.grey3, marginTop: 2 },
  form: { gap: 8 },
  label: { fontSize: 12, fontWeight: '600', color: colors.grey3, textTransform: 'uppercase', marginTop: 12, marginBottom: 6 },
  input: { backgroundColor: colors.grey1, borderRadius: radius.md, padding: 15, fontSize: 15, color: colors.black },
  submitBtn: { marginTop: 28, backgroundColor: colors.black, borderRadius: radius.pill, padding: 18, alignItems: 'center' },
  submitBtnDisabled: { backgroundColor: colors.grey2 },
  submitBtnText: { color: colors.white, fontWeight: '700', fontSize: 14 },
})