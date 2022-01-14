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

 Date: 14/01/2022 17:15:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('8cea4c70-62e9-11ec-93ef-5f648523e2b1', '测试', 'admin', 'admin');
INSERT INTO `sys_user` VALUES ('8cea4c70-62e9-11ec-93ef-5f648523e8b8', 'mary', '123456', '13423223123');
INSERT INTO `sys_user` VALUES ('f83a8d90-5ef8-11ec-8453-a777e5760446', 'vincent', '123456', '13631474749');

SET FOREIGN_KEY_CHECKS = 1;
