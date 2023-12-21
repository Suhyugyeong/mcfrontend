const Sequelize = require('sequelize')
const User = require('./user')
const Comment = require('./comment')

const env = process.env.NODE_ENV || 'development'
//mysql 연동하기 위한 정보가 설정된 파일...
const config = require('../config/config')[env]
const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config)
db.sequelize = sequelize

db.User = User
db.Comment = Comment

User.initiate(sequelize)
Comment.initiate(sequelize)

User.associate(db)
Comment.associate(db)

module.exports = db


// //Executing (default): SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'users' AND TABLE_SCHEMA = 'nodejs'
// Executing (default): CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(20) NOT NULL UNIQUE, `age` INTEGER UNSIGNED NOT NULL, `married` TINYINT(1) NOT NULL, `comment` TEXT, `create_at` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
// Executing (default): SHOW INDEX FROM `users` FROM `nodejs`
// Executing (default): SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'comments' AND TABLE_SCHEMA = 'nodejs'
// Executing (default): CREATE TABLE IF NOT EXISTS `comments` (`id` INTEGER NOT NULL auto_increment , `comment` VARCHAR(100) 
// NOT NULL, `create_at` DATETIME NOT NULL, `commenter` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`commenter`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
// Executing (default): SHOW INDEX FROM `comments` FROM `nodejs`