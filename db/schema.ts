import { sql } from 'drizzle-orm';
import { boolean, integer, pgTable, text } from 'drizzle-orm/pg-core';

// Users table
export const usersTable = pgTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').unique().notNull(),
});

// Posts table
export const postsTable = pgTable('posts', {
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
export const waitlistTable = pgTable('waitlist', {
  id: integer('id').primaryKey().notNull(),
  email: text('email').notNull().unique(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(), // Fix default value to store actual timestamp
});

export const interviewsTable = pgTable('interviews', {
  id: integer('id').primaryKey(),
  company: text('company').notNull(),
  interviewDate: text('interview_date').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull().$onUpdate(() => sql`CURRENT_TIMESTAMP`),
  overallExperience: text('overall_experience'),
  jobOffer: boolean('job_offer').default(false),
  level: text('level').default('Not Provided Yet').notNull(),
  role: text('role').default('Not Provided').notNull(), // New required field
});

export const roundsTable = pgTable('rounds', {
  id: integer('id').primaryKey(),
  interviewId: integer('interview_id').references(() => interviewsTable.id, { onDelete: 'cascade' }),
  roundType: text('round_type').notNull(),
  roundDate: text('round_date').notNull(),
  experience: text('experience'),
});

export const ratingsTable = pgTable('ratings', {
  id: integer('id').primaryKey(),
  interviewId: integer('interview_id').references(() => interviewsTable.id, { onDelete: 'cascade' }),
  category: text('category').notNull(),
  score: integer('score').notNull(),
});

export const questionsTable = pgTable('questions', {
  id: integer('id').primaryKey(),
  interviewId: integer('interview_id').references(() => interviewsTable.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  question: text('question').notNull(),
  leetcodeLink: text('leetcode_link'),
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
