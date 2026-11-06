import { useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { OnboardingStackParamList } from '../navigation/types'
import { useApp } from '../context/AppContext'
import { colors, radius } from '../theme'

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Signup'>

type Mode = 'signin' | 'signup'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function SignupScreen({ navigation }: Props) {
  const { signUp, signIn } = useApp()
  // standardmässig "anmelden", weil beim App-Start eher jemand mit
  // bestehendem Konto reinkommt als jemand komplett Neues
  const [mode, setMode] = useState<Mode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // erst anzeigen, wenn im Feld überhaupt was drinsteht - sonst sieht man
  // beim Öffnen des Screens sofort "ungültig", obwohl man noch gar nichts
  // eingegeben hat
  const emailError = email.length > 0 && !EMAIL_REGEX.test(email) ? 'Ungültige E-Mail-Adresse' : ''
  const passwordError = password.length > 0 && password.length < 6 ? `Noch ${6 - password.length} Zeichen nötig` : ''

  const canContinue = EMAIL_REGEX.test(email) && password.length >= 6

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    const errorMessage = mode === 'signup' ? await signUp(email, password) : await signIn(email, password)
    setLoading(false)
    if (errorMessage) {
      setError(errorMessage)
      return
    }
    // bei signup geht's weiter zum Profil-Setup. Bei signin übernimmt
    // RootNavigator automatisch - Session + vorhandenes Profil -> MainTabs
    if (mode === 'signup') navigation.navigate('ProfileSetup')
  }

  const toggleMode = () => {
    setMode((m) => (m === 'signin' ? 'signup' : 'signin'))
    setError('')
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
        {!!emailError && <Text style={styles.fieldError}>{emailError}</Text>}

        <Text style={styles.label}>Passwort</Text>
        <TextInput
          style={styles.input}
          placeholder="mind. 6 Zeichen"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {!!passwordError && <Text style={styles.fieldError}>{passwordError}</Text>}

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <Pressable
          style={[styles.submitBtn, (!canContinue || loading) && styles.submitBtnDisabled]}
          disabled={!canContinue || loading}
          onPress={handleSubmit}
        >
          <Text style={styles.submitBtnText}>
            {loading ? 'einen moment...' : mode === 'signin' ? 'anmelden' : 'konto erstellen'}
          </Text>
        </Pressable>

        <Pressable style={styles.toggleRow} onPress={toggleMode}>
          <Text style={styles.toggleText}>
            {mode === 'signin' ? 'Noch kein Konto? ' : 'Schon ein Konto? '}
            <Text style={styles.toggleTextBold}>{mode === 'signin' ? 'Registrieren' : 'Anmelden'}</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
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
  fieldError: { color: '#D23B3B', fontSize: 12, marginTop: 6 },
  errorText: { color: '#D23B3B', fontSize: 13, marginTop: 8 },
  submitBtn: { marginTop: 28, backgroundColor: colors.black, borderRadius: radius.pill, padding: 18, alignItems: 'center' },
  submitBtnDisabled: { backgroundColor: colors.grey2 },
  submitBtnText: { color: colors.white, fontWeight: '700', fontSize: 14 },
  toggleRow: { marginTop: 18, alignItems: 'center' },
  toggleText: { fontSize: 13, color: colors.grey3 },
  toggleTextBold: { color: colors.black, fontWeight: '700' },
})