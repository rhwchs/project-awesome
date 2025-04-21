import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('VITE_SUPABASE_URL is required. Please connect to Supabase using the "Connect to Supabase" button in the top right.');
}

if (!supabaseAnonKey) {
  throw new Error('VITE_SUPABASE_ANON_KEY is required. Please connect to Supabase using the "Connect to Supabase" button in the top right.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);