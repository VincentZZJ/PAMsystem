/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80018
 Source Host           : localhost:3306
 Source Schema         : pamdatabase

 Target Server Type    : MySQL
 Target Server Version : 80018
 File Encoding         : 65001

 Date: 12/02/2022 17:29:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for attachment_list
-- ----------------------------
DROP TABLE IF EXISTS `attachment_list`;
CREATE TABLE `attachment_list`  (
  `id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '附件id',
  `diaryId` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '日记id',
  `fileUrl` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文件相对路径',
  `filePath` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文件绝对路径(不发送给前端)',
  `isDel` int(10) NOT NULL DEFAULT 0 COMMENT '文件是否被删除(1- 已删除，0 - 未删除 )',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for diary_list
-- ----------------------------
DROP TABLE IF EXISTS `diary_list`;
CREATE TABLE `diary_list`  (
  `id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '日记id(userid拼接该日时间戳)',
  `userId` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户id',
  `diaryTitle` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '日记标题',
  `diaryContent` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '日记内容',
  `date` date NOT NULL COMMENT '日记时间',
  `diaryTag` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '日记标签(待用字段)',
  `isDel` int(10) NOT NULL DEFAULT 0 COMMENT '是否已删除(1-已删 ， 0-未删)',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for invest_history
-- ----------------------------
DROP TABLE IF EXISTS `invest_history`;
CREATE TABLE `invest_history`  (
  `id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '主键',
  `itemId` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '投资项id',
  `recordId` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '投资操作id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for invest_item
-- ----------------------------
DROP TABLE IF EXISTS `invest_item`;
CREATE TABLE `invest_item`  (
  `id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '数据id',
  `investType` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '投资类型：1-股票；2-基金；3-定期',
  `investName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '投资名称',
  `buyTime` date NOT NULL COMMENT '买入时间',
  `buyPrice` double(13, 3) NOT NULL COMMENT '买入价格',
  `position` int(10) UNSIGNED NOT NULL COMMENT '持仓',
  `cost` double(13, 3) NOT NULL COMMENT '成本',
  `totalMoney` double(14, 4) NOT NULL COMMENT '市值',
  `totalInvest` double(14, 4) NOT NULL COMMENT '投资金额',
  `sellTime` date NULL DEFAULT NULL COMMENT '卖出时间',
  `sellPrice` double(13, 3) NULL DEFAULT NULL COMMENT '卖出价格',
  `profit` double(14, 4) NULL DEFAULT NULL COMMENT '盈亏',
  `status` int(10) NOT NULL COMMENT '投资状态：1-进行中 0-已结束',
  `code` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '投资标的的编号：sz001001;sh600789',
  `latestPrice` double(13, 3) NULL DEFAULT NULL COMMENT '现价',
  `latestDate` date NULL DEFAULT NULL COMMENT '现价时间',
  `isDel` int(10) NOT NULL COMMENT '是否删除：1-已删除；0-未删除',
  `userid` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for invest_moneyflowing
-- ----------------------------
DROP TABLE IF EXISTS `invest_moneyflowing`;
CREATE TABLE `invest_moneyflowing`  (
  `id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '主键',
  `userId` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户Id',
  `investType` int(10) NOT NULL COMMENT '账户类型 1-股票 2-基金',
  `moneyOpt` int(10) NOT NULL COMMENT '银证转账操作 1-转入 0-转出',
  `money` double(20, 3) NOT NULL COMMENT '流水金额',
  `restMoney` double(20, 3) NOT NULL COMMENT '账户余额',
  `createDate` date NOT NULL COMMENT '操作时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for invest_record
-- ----------------------------
DROP TABLE IF EXISTS `invest_record`;
CREATE TABLE `invest_record`  (
  `id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '操作主键',
  `date` date NOT NULL COMMENT '成交时间',
  `investOpt` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '操作类型：1-加仓；2-减仓；3-清仓',
  `investCost` double(13, 3) NOT NULL COMMENT '成交价格',
  `investNum` int(64) NOT NULL COMMENT '成交数量',
  `latestCost` double(13, 3) NOT NULL COMMENT '成交后成本',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for invest_usercount
-- ----------------------------
DROP TABLE IF EXISTS `invest_usercount`;
CREATE TABLE `invest_usercount`  (
  `id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '主键',
  `userId` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户ID',
  `stockCount` double(20, 3) NULL DEFAULT NULL COMMENT '股票账户-余额',
  `fundCount` double NULL DEFAULT NULL COMMENT '基金账户-余额',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键Id',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '手机',
  PRIMARY KEY (`id`, `phone`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
