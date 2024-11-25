CREATE TABLE `ratings` (
	`id` integer PRIMARY KEY NOT NULL,
	`interview_id` integer,
	`category` text NOT NULL,
	`score` integer NOT NULL,
	FOREIGN KEY (`interview_id`) REFERENCES `interviews`(`id`) ON UPDATE no action ON DELETE cascade
);
