
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yrfndyttopwyxjrqhqfd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyZm5keXR0b3B3eXhqcnFocWZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MjI1NDIsImV4cCI6MjA1OTA5ODU0Mn0.oI6I7QBfzvi_6SJU0IAX80KafLHQQ3EuH5_fQY_NcFk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage
  }
});
