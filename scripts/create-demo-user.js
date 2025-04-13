import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createDemoUser() {
  try {
    // Create demo user
    const { data: user, error: userError } = await supabase.auth.admin.createUser({
      email: 'demo@adhirachna.com',
      password: 'demo123456',
      email_confirm: true,
      user_metadata: {
        name: 'Demo User'
      }
    });

    if (userError) {
      throw userError;
    }

    console.log('Demo user created:', user);

    // Create profile for demo user
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        email: 'demo@adhirachna.com',
        full_name: 'Demo User'
      });

    if (profileError) {
      throw profileError;
    }

    console.log('Demo user profile created');
  } catch (error) {
    console.error('Error creating demo user:', error);
    process.exit(1);
  }
}

createDemoUser(); 