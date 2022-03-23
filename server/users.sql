DROP DATABASE IF EXISTS users;
CREATE DATABASE users;
USE users;

/* TABLES */
CREATE TABLE users (
    userID INT NOT NULL UNIQUE AUTO_INCREMENT,
    forename VARCHAR(32) NOT NULL,
    surname VARCHAR(32) NOT NULL,
    username VARCHAR(32) NOT NULL,
    password VARCHAR(60), -- will be not null once ive generated test data
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
INSERT INTO users (forename,surname,username) VALUES
('Ray','Sweekend','raysweekend'),
('Boris','Johnson','bojonno1'),
('Nicola','Sturgeon','bigupscotland');

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
END$$