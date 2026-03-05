import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Keep client creation simple; advanced options are not required for email/password auth.
// If env vars are missing, Supabase calls will fail and the UI will show a helpful message.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);