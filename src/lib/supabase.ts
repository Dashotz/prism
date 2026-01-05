import { createClient } from '@supabase/supabase-js';

// Get these from your Supabase project settings
// Project URL: https://xxxxx.supabase.co
// anon key: your-anon-key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '❌ Supabase credentials not found!',
    '\nPlease create a .env file in the project root with:',
    '\nVITE_SUPABASE_URL=your-project-url',
    '\nVITE_SUPABASE_ANON_KEY=your-anon-key',
    '\n\nCurrent values:',
    '\nURL:', supabaseUrl || 'NOT SET',
    '\nKey:', supabaseAnonKey ? 'SET (hidden)' : 'NOT SET'
  );
} else {
  console.log('✅ Supabase client initialized');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

