import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Users table
export const usersTable = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').unique().notNull(),
});

// Posts table
export const postsTable = sqliteTable('posts', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(), // Ensure created_at defaults to the current timestamp
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`) // Default to current timestamp
    .notNull()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`), // Update on modification
});

// Waitlist table
export const waitlistTable = sqliteTable('waitlist', {
  id: integer('id').primaryKey().notNull(),
  email: text('email').notNull().unique(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(), // Fix default value to store actual timestamp
});

// Type inference for users
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

// Type inference for posts
export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;

// Type inference for waitlist
export type InsertWaitlist = typeof waitlistTable.$inferInsert;
export type SelectWaitlist = typeof waitlistTable.$inferSelect;
