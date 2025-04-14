import { createClient, PostgrestError } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  const error = new Error('Missing Supabase environment variables');
  console.error('Supabase configuration error:', {
    error: error.message,
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    timestamp: new Date().toISOString()
  });
  throw error;
}

// Create Supabase client with enhanced error handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-application-name': 'adhirachna'
    }
  }
});

// Add error logging for Supabase operations
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Supabase auth state change:', {
    event,
    hasSession: !!session,
    timestamp: new Date().toISOString()
  });
});

// Add global error handler
const handleSupabaseError = (error: PostgrestError) => {
  console.error('Supabase operation error:', {
    error: error.message,
    code: error.code,
    details: error.details,
    timestamp: new Date().toISOString()
  });
  
  // Store error in session storage for debugging
  try {
    sessionStorage.setItem('supabaseError', JSON.stringify({
      error: error.message,
      code: error.code,
      details: error.details,
      timestamp: new Date().toISOString()
    }));
  } catch (e) {
    console.error('Failed to store Supabase error:', e);
  }
};

// Export error handler for use in components
export { handleSupabaseError }; 