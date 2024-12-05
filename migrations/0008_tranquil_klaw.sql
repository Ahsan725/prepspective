DROP INDEX IF EXISTS "users_email_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "waitlist_email_unique";--> statement-breakpoint
ALTER TABLE `interviews` ALTER COLUMN "levels" TO "level" text NOT NULL DEFAULT 'Not Provided yet';--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `waitlist_email_unique` ON `waitlist` (`email`);