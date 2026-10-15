// Verbindung zu Supabase - der publishable key ist extra dafür gemacht,
// öffentlich im Client zu stehen (siehe Supabase-Dashboard: "safely shared
// publicly"), die eigentliche Sicherheit kommt von den RLS-Policies in der
// Datenbank, nicht davon dass der Key geheim ist
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jmpfrwkwglywcsykzwra.supabase.co'
const supabaseAnonKey = 'sb_publishable_MUXrvCUz8XRyRIC9S91UYA_mql10P4g'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})