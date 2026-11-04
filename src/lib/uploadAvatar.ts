// lädt ein lokales Bild (von expo-image-picker) in den "avatars"-Bucket
// hoch und gibt die öffentliche URL zurück, die wir dann in profiles.avatar_url
// speichern
import { supabase } from './supabase'

export async function uploadAvatar(userId: string, localUri: string): Promise<string> {
  const response = await fetch(localUri)
  const blob = await response.blob()
  const fileExt = localUri.split('.').pop()?.toLowerCase() ?? 'jpg'
  // Zeitstempel im Dateinamen, damit jedes neue Foto einen eigenen Namen
  // kriegt statt das alte zu überschreiben (einfacher als komplizierte
  // Cache-Invalidierung)
  const filePath = `${userId}-${Date.now()}.${fileExt}`

  const { error } = await supabase.storage.from('avatars').upload(filePath, blob, {
  contentType: blob.type || 'image/jpeg',
})
  if (error) throw error

  const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
  return data.publicUrl
}