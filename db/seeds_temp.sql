USE bigmood_db;
INSERT INTO users (email, password, createdAt, updatedAt)
VALUES
("tester@gmail.com", "mypass", "2017-02-21 10:53:45", "2017-02-21 10:53:45" ),
("Human@gmail.com", "mypass2", "2018-02-21 10:53:45", "2018-02-21 10:53:45" ),
("cyborg@gmail.com", "nope", "2019-02-21 10:53:45", "2019-02-21 10:53:45" );

INSERT INTO userdata (createdAt, updatedAt, activityId, moodId, userId)
VALUES
( "2017-02-21 10:53:45", "2017-02-21 10:53:45", "2", "2", "1"),
("2018-02-21 10:53:45", "2018-02-21 10:53:45", "3", "1", "2"),
("2019-02-21 10:53:45", "2019-02-21 10:53:45", "3", "1", "2");