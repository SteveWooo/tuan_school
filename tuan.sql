/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost
 Source Database       : tuan

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : utf-8

 Date: 02/13/2019 19:39:25 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `admins`
-- ----------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL COMMENT '1:club_admin,2:all_admin',
  `password` varchar(32) NOT NULL,
  `account` text NOT NULL,
  `admin_id` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `create_at` text NOT NULL,
  `create_by` varchar(32) NOT NULL,
  `update_at` text NOT NULL,
  `update_by` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `admins`
-- ----------------------------
BEGIN;
INSERT INTO `admins` VALUES ('1', '1', '383c8a485c52bcffa9a50b50a566a484', 'admin', 'f1c7a57a55e7629385c8ecd65c7bcfcb', 'admin_root', '1550056353707', 'root', '1550056353707', 'root');
COMMIT;

-- ----------------------------
--  Table structure for `club_admins`
-- ----------------------------
DROP TABLE IF EXISTS `club_admins`;
CREATE TABLE `club_admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(32) NOT NULL,
  `club_admin_id` varchar(32) NOT NULL,
  `club_id` varchar(32) NOT NULL,
  `create_at` text NOT NULL,
  `create_by` varchar(32) NOT NULL,
  `update_at` text NOT NULL,
  `update_by` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `club_applies`
-- ----------------------------
DROP TABLE IF EXISTS `club_applies`;
CREATE TABLE `club_applies` (
  `apply_id` varchar(32) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `e_name` text NOT NULL,
  `category_id` varchar(32) NOT NULL,
  `description` text NOT NULL,
  `cover_url` text NOT NULL,
  `apply_status` int(11) NOT NULL DEFAULT '2',
  `create_at` text NOT NULL,
  `create_by` varchar(32) NOT NULL,
  `update_by` varchar(32) NOT NULL,
  `update_at` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `club_categories`
-- ----------------------------
DROP TABLE IF EXISTS `club_categories`;
CREATE TABLE `club_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `create_by` varchar(32) NOT NULL,
  `create_at` text NOT NULL,
  `update_by` varchar(32) NOT NULL,
  `update_at` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `club_categories`
-- ----------------------------
BEGIN;
INSERT INTO `club_categories` VALUES ('1', 'a2e8d2a867e1420c336a373c7eed0a4e', '其他社团', 'f1c7a57a55e7629385c8ecd65c7bcfcb', '1550057832475', 'f1c7a57a55e7629385c8ecd65c7bcfcb', '1550057832475'), ('2', '72682128341e8f9504d57ae045586346', '学生会', 'f1c7a57a55e7629385c8ecd65c7bcfcb', '1550057850881', 'f1c7a57a55e7629385c8ecd65c7bcfcb', '1550057850881'), ('3', '67f78792f293bc285ead327ae46227b1', '团委', 'f1c7a57a55e7629385c8ecd65c7bcfcb', '1550057856248', 'f1c7a57a55e7629385c8ecd65c7bcfcb', '1550057856248');
COMMIT;

-- ----------------------------
--  Table structure for `clubs`
-- ----------------------------
DROP TABLE IF EXISTS `clubs`;
CREATE TABLE `clubs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` varchar(32) NOT NULL,
  `club_id` varchar(32) NOT NULL,
  `cover_url` text NOT NULL,
  `e_name` text NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `club_status` int(11) NOT NULL DEFAULT '1',
  `create_by` varchar(32) NOT NULL,
  `create_at` text NOT NULL,
  `update_by` varchar(32) NOT NULL,
  `update_at` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `news`
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_id` varchar(32) NOT NULL,
  `club_id` varchar(32) NOT NULL,
  `cover_url` text NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `images` text,
  `news_status` int(11) NOT NULL DEFAULT '2',
  `end_time` text,
  `create_by` varchar(32) NOT NULL,
  `create_at` text NOT NULL,
  `update_by` varchar(32) NOT NULL,
  `update_at` text NOT NULL,
  PRIMARY KEY (`id`,`news_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `news_joins`
-- ----------------------------
DROP TABLE IF EXISTS `news_joins`;
CREATE TABLE `news_joins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_id` varchar(32) NOT NULL,
  `user_id` varchar(32) NOT NULL,
  `create_at` text NOT NULL,
  `create_by` varchar(32) NOT NULL,
  `update_at` text NOT NULL,
  `update_by` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `user_subscripts`
-- ----------------------------
DROP TABLE IF EXISTS `user_subscripts`;
CREATE TABLE `user_subscripts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(32) NOT NULL,
  `club_id` varchar(32) NOT NULL,
  `create_at` text NOT NULL,
  `update_at` text NOT NULL,
  `create_by` varchar(32) NOT NULL,
  `update_by` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` text NOT NULL,
  `user_id` varchar(32) NOT NULL,
  `avatar_url` text NOT NULL,
  `nick_name` text NOT NULL,
  `create_at` text NOT NULL,
  `create_by` text NOT NULL,
  `update_at` text NOT NULL,
  `update_by` text NOT NULL,
  PRIMARY KEY (`id`,`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
