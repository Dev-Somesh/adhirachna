#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Check if environment variables are set
if [ -z "$VITE_SUPABASE_URL" ] || [ -z "$VITE_SUPABASE_SERVICE_ROLE_KEY" ]; then
  echo "Error: VITE_SUPABASE_URL and VITE_SUPABASE_SERVICE_ROLE_KEY must be set in the .env file"
  exit 1
fi

# Create a temporary .env file for Supabase CLI
echo "SUPABASE_URL=$VITE_SUPABASE_URL" > .env.supabase
echo "SUPABASE_SERVICE_ROLE_KEY=$VITE_SUPABASE_SERVICE_ROLE_KEY" >> .env.supabase

# Run the migration using Supabase CLI
supabase db push

# Clean up
rm .env.supabase

echo "Migration completed successfully!" 