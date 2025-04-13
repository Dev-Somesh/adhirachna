#!/bin/bash

# Load environment variables
export $(cat .env | xargs)

# Run the migration script
node src/scripts/migrateToContentful.cjs 