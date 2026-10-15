import { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { OnboardingStackParamList } from '../navigation/types'
import { useApp } from '../context/AppContext'
import { colors, radius } from '../theme'

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Signup'>

export default function SignupScreen({ navigation }: Props) {
  const { signUp } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const canContinue = email.trim().length > 0 && password.trim().length >= 6

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    const errorMessage = await signUp(email, password)
    setLoading(false)
    if (errorMessage) {
      setError(errorMessage)
      return
    }
    navigation.navigate('ProfileSetup')
  }

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

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <Pressable
          style={[styles.submitBtn, (!canContinue || loading) && styles.submitBtnDisabled]}
          disabled={!canContinue || loading}
          onPress={handleSubmit}
        >
          <Text style={styles.submitBtnText}>{loading ? 'einen moment...' : 'konto erstellen'}</Text>
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
  errorText: { color: '#D23B3B', fontSize: 13, marginTop: 8 },
  submitBtn: { marginTop: 28, backgroundColor: colors.black, borderRadius: radius.pill, padding: 18, alignItems: 'center' },
  submitBtnDisabled: { backgroundColor: colors.grey2 },
  submitBtnText: { color: colors.white, fontWeight: '700', fontSize: 14 },
})