ALTER TABLE `interviews` ADD `levels` text DEFAULT 'Not Provided' NOT NULL;--> statement-breakpoint
ALTER TABLE `interviews` DROP COLUMN `level`;--> statement-breakpoint
ALTER TABLE `rounds` DROP COLUMN `difficulty`;