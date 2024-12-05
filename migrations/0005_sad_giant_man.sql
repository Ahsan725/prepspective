ALTER TABLE `interviews` RENAME COLUMN "level" TO "levels";--> statement-breakpoint
DROP INDEX IF EXISTS "users_email_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "waitlist_email_unique";--> statement-breakpoint
ALTER TABLE `interviews` ALTER COLUMN "levels" TO "levels" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `waitlist_email_unique` ON `waitlist` (`email`);--> statement-breakpoint
ALTER TABLE `rounds` DROP COLUMN `difficulty`;