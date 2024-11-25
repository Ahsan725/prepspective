CREATE TABLE `interviews` (
	`id` integer PRIMARY KEY NOT NULL,
	`company` text NOT NULL,
	`interview_date` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`overall_experience` text,
	`job_offer` integer DEFAULT false
);
