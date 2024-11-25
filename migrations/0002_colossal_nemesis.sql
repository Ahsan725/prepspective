CREATE TABLE `rounds` (
	`id` integer PRIMARY KEY NOT NULL,
	`interview_id` integer,
	`round_type` text NOT NULL,
	`round_date` text NOT NULL,
	`experience` text,
	FOREIGN KEY (`interview_id`) REFERENCES `interviews`(`id`) ON UPDATE no action ON DELETE cascade
);
