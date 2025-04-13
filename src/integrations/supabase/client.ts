import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yrfndyttopwyxjrqhqfd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyZm5keXR0b3B3eXhqcnFocWZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MjI1NDIsImV4cCI6MjA1OTA5ODU0Mn0.oI6I7QBfzvi_6SJU0IAX80KafLHQQ3EuH5_fQY_NcFk";

// Create a safe storage implementation that checks for window availability
const safeStorage = {
  getItem: (key: string) => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
};

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: safeStorage,
    flowType: 'implicit'
  }
});

// Helper function to check if user is authenticated
export const isAuthenticated = async () => {
  try {
    // First, try to refresh the session if one exists
    await supabase.auth.refreshSession();
    
    // Then get the current session
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error("Auth session check error:", error);
      return false;
    }
    
    console.log("Auth session check:", data.session);
    return !!data.session;
  } catch (err) {
    console.error("Auth check error:", err);
    return false;
  }
};

// Get current user ID helper function
export const getCurrentUserId = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.user?.id;
};

// Manually sign out helper function
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error);
    throw error;
  }
  
  // Also clear local storage item
  safeStorage.removeItem("adhirachna_admin_logged_in");
  
  return true;
};
