-- Create demo user using Supabase client functions
CREATE OR REPLACE FUNCTION create_demo_user()
RETURNS void AS $$
DECLARE
  user_id uuid;
BEGIN
  -- Check if demo user already exists
  IF NOT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE email = 'demo@adhirachna.com'
  ) THEN
    -- Create demo user
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      created_at,
      updated_at,
      phone,
      phone_confirmed_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'demo@adhirachna.com',
      crypt('demo123456', gen_salt('bf')),
      NOW(),
      NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Demo User"}',
      FALSE,
      NOW(),
      NOW(),
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      NULL
    ) RETURNING id INTO user_id;

    -- Create profile for demo user
    INSERT INTO public.profiles (
      id,
      email,
      full_name,
      created_at,
      updated_at
    ) VALUES (
      user_id,
      'demo@adhirachna.com',
      'Demo User',
      NOW(),
      NOW()
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 