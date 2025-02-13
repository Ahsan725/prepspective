import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

config({ path: '../.env' }); 
const connectionString = process.env.DATABASE_URL
console.log(process.env.DATABASE_URL)
if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

export const client = postgres(connectionString,  {prepare: false })
export const db = drizzle(client);