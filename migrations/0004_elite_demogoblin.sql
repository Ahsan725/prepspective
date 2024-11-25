CREATE TABLE `questions` (
	`id` integer PRIMARY KEY NOT NULL,
	`interview_id` integer,
	`type` text NOT NULL,
	`question` text NOT NULL,
	`leetcode_link` text,
	FOREIGN KEY (`interview_id`) REFERENCES `interviews`(`id`) ON UPDATE no action ON DELETE cascade
);
