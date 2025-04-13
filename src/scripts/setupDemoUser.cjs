require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with service role key
const supabaseUrl = "https://yrfndyttopwyxjrqhqfd.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY is not set in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const DEMO_USER = {
  email: "demo@adhirachna.com",
  password: "demo123456",
  user_metadata: {
    role: "admin",
    is_demo: true
  }
};

async function setupDemoUser() {
  try {
    console.log('Setting up demo user...');

    // Check if user already exists
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) throw listError;

    const existingUser = users.find(user => user.email === DEMO_USER.email);

    if (existingUser) {
      console.log('Demo user already exists. Updating password...');
      // Update password for existing user
      const { error: updateError } = await supabase.auth.admin.updateUserById(
        existingUser.id,
        { password: DEMO_USER.password }
      );

      if (updateError) throw updateError;
      console.log('Demo user password updated successfully');
    } else {
      console.log('Creating new demo user...');
      // Create new user
      const { data: { user }, error: createError } = await supabase.auth.admin.createUser({
        email: DEMO_USER.email,
        password: DEMO_USER.password,
        email_confirm: true,
        user_metadata: DEMO_USER.user_metadata
      });

      if (createError) throw createError;
      console.log('Demo user created successfully:', user.id);
    }

    console.log('Demo user setup completed successfully');
  } catch (error) {
    console.error('Error setting up demo user:', error);
    process.exit(1);
  }
}

setupDemoUser(); 