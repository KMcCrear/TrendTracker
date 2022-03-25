DROP DATABASE IF EXISTS trendtracker;
CREATE DATABASE trendtracker;
USE trendtracker;

/* TABLES */
CREATE TABLE users (
    userID INT NOT NULL UNIQUE AUTO_INCREMENT,
    forename VARCHAR(32) NOT NULL,
    surname VARCHAR(32) NOT NULL,
    username VARCHAR(32) NOT NULL,
    password VARCHAR(60) NOT NULL,
    INDEX (username),
    PRIMARY KEY (userID)
);

CREATE TABLE watchlist (
    listID INT NOT NULL UNIQUE AUTO_INCREMENT,
    what ENUM('stock', 'crypto') NOT NULL,
    identifier VARCHAR(16) NOT NULL UNIQUE,
    PRIMARY KEY (listID)
);

CREATE TABLE userwatchlist (
    userID INT NOT NULL,
    listID INT NOT NULL,
    FOREIGN KEY (listID) REFERENCES watchlist(listID) ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE,
    PRIMARY KEY (listID, userID)
);

/* TEST DATA */
INSERT INTO users (forename,surname,username,password) VALUES
('Ray','Sweekend','raysweekend','$2b$10$vdaIImRMl4JEBc5sQNG8W.tX7Mxc/MS8GciB.77lG/VAKujLxztG6'), -- password 'car go fast'
('Boris','Johnson','bojonno1','$2b$10$cL/TvdKV.E1iUKiWAusduePhgvgflVRM9FJvaLmsau5qFWH8EgBjy'), -- password 'bluepassport'
('Nicola','Sturgeon','bigupscotland','$2b$10$THgEuTNdlx7TsIxIz4iq8O7dLOKdj2wV1WnBLyvArdi2SDl62CHAW'); -- password 'independence'

INSERT INTO watchlist (what,identifier) VALUES
('stock','AAPL'),
('crypto','bitcoin'),
('stock','TSLA');

INSERT INTO userwatchlist (userID,listID) VALUES
(1,1), -- ray owns aapl
(1,2), -- ray owns bitcoin
(2,3), -- boris owns tsla
(3,3); -- nicola owns tsla

DELIMITER $$

/* PROCEDURES */
CREATE PROCEDURE getUser(IN inUsername VARCHAR(32)) 
BEGIN
    SELECT * FROM users
    WHERE username = inUsername;
END$$

CREATE PROCEDURE getUserwatchlist(IN inUserID INT) 
BEGIN
    SELECT watchlist.listID,watchlist.what,watchlist.identifier FROM users
    JOIN userwatchlist ON users.userID=userwatchlist.userID
    JOIN watchlist ON userwatchlist.listID=watchlist.listID
    WHERE users.userID = inUserID;
<<<<<<< HEAD
=======
END$$

CREATE PROCEDURE addToWatchlist(IN inUserID INT, IN inWhat ENUM('stock','crypto'), IN inIdentifier VARCHAR(16))
BEGIN
    INSERT INTO watchlist (what, identifier)
    SELECT inWhat, inIdentifier
    WHERE NOT(inIdentifier IN (SELECT identifier FROM watchlist));

    INSERT INTO userwatchlist (userID,listID)
    SELECT inUserID, listID
    FROM watchlist
    WHERE listID = (SELECT listID FROM watchlist WHERE identifier = inIdentifier);
>>>>>>> a5b98dbf44a0582eeaa736b3c1f4f540a05328d5
END$$