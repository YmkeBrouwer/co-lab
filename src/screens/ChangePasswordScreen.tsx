import { useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { ProfileStackParamList } from '../navigation/types'
import { useApp } from '../context/AppContext'
import { colors, radius } from '../theme'

type Props = NativeStackScreenProps<ProfileStackParamList, 'ChangePassword'>

export default function ChangePasswordScreen({ navigation }: Props) {
  const { changePassword } = useApp()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const passwordError = password.length > 0 && password.length < 6 ? `Noch ${6 - password.length} Zeichen nötig` : ''
  const confirmError = confirmPassword.length > 0 && confirmPassword !== password ? 'Passwörter stimmen nicht überein' : ''

  const canSubmit = password.length >= 6 && password === confirmPassword

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    const errorMessage = await changePassword(password)
    setLoading(false)
    if (errorMessage) {
      setError(errorMessage)
      return
    }
    navigation.goBack()
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.content}>
        <Text style={styles.label}>Neues Passwort</Text>
        <TextInput
          style={styles.input}
          placeholder="mind. 6 Zeichen"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {!!passwordError && <Text style={styles.fieldError}>{passwordError}</Text>}

        <Text style={styles.label}>Passwort bestätigen</Text>
        <TextInput
          style={styles.input}
          placeholder="nochmal eingeben"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {!!confirmError && <Text style={styles.fieldError}>{confirmError}</Text>}

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <Pressable
          style={[styles.submitBtn, (!canSubmit || loading) && styles.submitBtnDisabled]}
          disabled={!canSubmit || loading}
          onPress={handleSubmit}
        >
          <Text style={styles.submitBtnText}>{loading ? 'einen moment...' : 'passwort ändern'}</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 24, gap: 4 },
  label: { fontSize: 12, fontWeight: '600', color: colors.grey3, textTransform: 'uppercase', marginTop: 14, marginBottom: 6 },
  input: { backgroundColor: colors.grey1, borderRadius: radius.md, padding: 15, fontSize: 15, color: colors.black },
  fieldError: { color: '#D23B3B', fontSize: 12, marginTop: 6 },
  errorText: { color: '#D23B3B', fontSize: 13, marginTop: 8 },
  submitBtn: { marginTop: 28, backgroundColor: colors.black, borderRadius: radius.pill, padding: 16, alignItems: 'center' },
  submitBtnDisabled: { backgroundColor: colors.grey2 },
  submitBtnText: { color: colors.white, fontWeight: '700', fontSize: 14 },
})