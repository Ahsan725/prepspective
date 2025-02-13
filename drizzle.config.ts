import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '../.env' }); // Load environment variables

export default defineConfig({
  schema: './db/schema.ts', // Path to your schema
  out: './supabase/migrations', // Migration output path there is a fix required for this to work
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!, 
  },
});
