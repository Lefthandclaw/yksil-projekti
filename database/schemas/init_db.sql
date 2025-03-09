CREATE USER 'user'@'localhost' IDENTIFIED BY 'salasana';
GRANT ALL PRIVILEGES ON `healthdiary`.* TO 'user'@'localhost';
FLUSH PRIVILEGES;