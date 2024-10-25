SET time_zone = "+09:00";
CREATE DATABASE IF NOT EXISTS illust_post;
USE illust_post;
CREATE USER 'test_user'@'localhost' IDENTIFIED BY 'pwd';
grant All on illust_post.* to 'test_user'@'localhost';

CREATE TABLE illust_post.users (
	id varchar(50) primary key,
	pwd varchar(50) not null,
	user_name varchar(30) not null
);


  CREATE TABLE illust_post.contests (
	id int unsigned auto_increment primary key,
	round_num int unsigned comment '連番(トリガーによる自動生成)',
	subject varchar(50) not null,
	application_start_date datetime not null,
	application_end_date datetime comment 'デフォルトは応募開始から7日後',
	judge_start_date datetime comment 'デフォルトは応募終了と同じ',
	judge_end_date datetime comment 'デフォルトは審査開始から3日後'
);

DELIMITER $$
	CREATE TRIGGER set_default_period
	BEFORE INSERT ON contests
	FOR EACH ROW
	BEGIN
	    IF NEW.application_end_date IS NULL THEN
	        SET NEW.application_end_date = DATE_ADD(NEW.application_start_date, INTERVAL 7 DAY);
	    END IF;
	   
	    IF NEW.judge_start_date IS NULL THEN
	        SET NEW.judge_start_date = NEW.application_end_date;
	    END IF;
	
	    IF NEW.judge_end_date IS NULL THEN
	        SET NEW.judge_end_date = DATE_ADD(NEW.judge_start_date, INTERVAL 3 DAY);
	    END IF;
	END$$
DELIMITER ;
	
DELIMITER $$
	CREATE TRIGGER set_sequence_round_num
	BEFORE INSERT ON contests
	FOR EACH ROW
	BEGIN
		if new.round_num is null then
			set new.round_num = (
				SELECT IFNULL(MAX(tmp.round_num), 0) + 1
	    		FROM (SELECT round_num FROM contests) AS tmp);
	    end if;
	END$$
DELIMITER ;


CREATE TABLE illust_post.images (
	user_id varchar(50) not null,
	contest_id int unsigned not null,
	file_name varchar(50) not null,
	primary key (user_id, contest_id),
	foreign key (user_id)
		REFERENCES illust_post.users(id)
		ON DELETE cascade ON UPDATE cascade,
	foreign key (contest_id)
		references illust_post.contests(id)
		ON DELETE cascade on update cascade
);


CREATE TABLE illust_post.competitors (
	user_id varchar(50) not null,
	contest_id int unsigned not null,
	rank_points int unsigned not null default 1500,
	limit_can_judge int unsigned not null default 3,
	judged_count int unsigned not null default 0,
	primary key (user_id, contest_id),
	foreign key (user_id)
		references illust_post.users(id)
		ON DELETE cascade on update cascade,
	foreign key (contest_id)
		references illust_post.contests(id)
		ON DELETE cascade on update cascade
);


DELIMITER $$
CREATE trigger on_submit_illust
after insert on illust_post.images
for each row
BEGIN
	INSERT INTO illust_post.competitors (user_id, contest_id, rank_points)
SELECT 	new.user_id,
		new.contest_id,
		COALESCE((SELECT rank_points
		            FROM illust_post.competitors
		            WHERE user_id = new.user_id
		            ORDER BY contest_id DESC
		           	LIMIT 1
		         ), 1500);
END$$
DELIMITER ;