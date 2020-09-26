DROP TABLE public.administrators;

CREATE TABLE administrators (
	id serial NOT NULL,
	"name" varchar(50) NOT NULL,
	email varchar(40) NOT NULL,
	"password" varchar(40) NOT NULL,
	CONSTRAINT administrators_pkey PRIMARY KEY (id)
);


DROP TABLE public.buddies;

CREATE TABLE buddies (
	id serial NOT NULL,
	"name" varchar(50) NOT NULL,
	dateofbirth date NOT NULL,
	email varchar(40) NOT NULL,
	hometown varchar(30) NOT NULL,
	hobbiesandinterests text NOT NULL,
	CONSTRAINT buddies_pkey PRIMARY KEY (id)
);


DROP TABLE public.patients;

CREATE TABLE public.patients (
	id serial NOT NULL,
	"name" varchar(50) NOT NULL,
	dateofbirth date NOT NULL,
	email varchar(40) NOT NULL,
	hometown varchar(30) NOT NULL,
	hobbiesandinterests text NOT NULL,
	CONSTRAINT patients_pkey PRIMARY KEY (id)
);



DROP table matches;

CREATE TABLE matches (
	id serial NOT NULL,
	patient_id int4 NOT NULL,
	buddyid int4 NOT NULL,
	admin_id int4 NOT NULL,
	start_date_of_match date NOT NULL,
	end_date_of_match date NULL,
	"comments" varchar(50) NULL,
	ending_reason text NULL,
	
	CONSTRAINT matches_pkey PRIMARY KEY (id),
	CONSTRAINT fk_adminid FOREIGN KEY (admin_id) REFERENCES administrators(id),
	CONSTRAINT fk_buddyid FOREIGN KEY (buddyid) REFERENCES buddies(id),
	CONSTRAINT fk_patientid FOREIGN KEY (patient_id) REFERENCES patients(id)
);


/* inserting elements*/

INSERT INTO buddies ("name",dateofbirth,email,hometown,hobbiesandinterests) VALUES ('Antony Leans', '1993-02-23','leantony@thonet.uk','Amsterdam','travel',true);


INSERT INTO buddies ("name",dateofbirth,email,hometown,hobbiesandinterests) VALUES ('Jhon Clavan', '1994-01-26','jhon@thonet.es','Ultrecht','eat pizza',true);


INSERT INTO buddies ("name",dateofbirth,email,hometown,hobbiesandinterests) VALUES ('Marcelo Dongobud', '1988-10-13','MarceloGon@thonet.uk','Amsterdam','running',true);


INSERT INTO buddies ("name",dateofbirth,email,hometown,hobbiesandinterests) VALUES ('Antony Leans', '1993-02-23','leantony@thonet.uk','Amsterdam','travel',true);
