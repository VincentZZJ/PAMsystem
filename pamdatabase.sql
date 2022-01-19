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

 Date: 19/01/2022 16:37:22
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
-- Records of invest_history
-- ----------------------------
INSERT INTO `invest_history` VALUES ('01f567e0-78fa-11ec-a8a0-ed6c3ba62da6', 'e2b33d30-78f9-11ec-a8a0-ed6c3ba62da6', '01f3ba30-78fa-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_history` VALUES ('02dd7660-78d8-11ec-a8a0-ed6c3ba62da6', 'f14c3d50-78d7-11ec-a8a0-ed6c3ba62da6', '02dbc8b0-78d8-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_history` VALUES ('169fbd40-78f9-11ec-a8a0-ed6c3ba62da6', 'ae0eb490-78f6-11ec-a8a0-ed6c3ba62da6', '169de880-78f9-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_history` VALUES ('2bfbe100-78f9-11ec-a8a0-ed6c3ba62da6', '762febb0-78f7-11ec-a8a0-ed6c3ba62da6', '2bfa0c40-78f9-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_history` VALUES ('330a4170-78fa-11ec-a8a0-ed6c3ba62da6', 'f6d799b0-78f8-11ec-a8a0-ed6c3ba62da6', '330845a0-78fa-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_history` VALUES ('483c2810-78d2-11ec-a8a0-ed6c3ba62da6', '3a723030-78d2-11ec-a8a0-ed6c3ba62da6', '4839b710-78d2-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_history` VALUES ('4b85a690-78fa-11ec-a8a0-ed6c3ba62da6', '762febb0-78f7-11ec-a8a0-ed6c3ba62da6', '4b841ff0-78fa-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_history` VALUES ('61e5a5c0-78fa-11ec-a8a0-ed6c3ba62da6', 'f6d799b0-78f8-11ec-a8a0-ed6c3ba62da6', '61e44630-78fa-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_history` VALUES ('6716a590-78f9-11ec-a8a0-ed6c3ba62da6', 'ad430ab0-78f7-11ec-a8a0-ed6c3ba62da6', '67145ba0-78f9-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_history` VALUES ('744c4220-78f8-11ec-a8a0-ed6c3ba62da6', 'ca4b26e0-78d6-11ec-a8a0-ed6c3ba62da6', '744a4650-78f8-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_history` VALUES ('7dec7100-78f9-11ec-a8a0-ed6c3ba62da6', 'f6d799b0-78f8-11ec-a8a0-ed6c3ba62da6', '7deaea60-78f9-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_history` VALUES ('7f4f66f0-78fa-11ec-a8a0-ed6c3ba62da6', '48a697f0-78f9-11ec-a8a0-ed6c3ba62da6', '7f4db940-78fa-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_history` VALUES ('9722de30-78f8-11ec-a8a0-ed6c3ba62da6', '762febb0-78f7-11ec-a8a0-ed6c3ba62da6', '97201f10-78f8-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_history` VALUES ('99514500-78fa-11ec-a8a0-ed6c3ba62da6', '762febb0-78f7-11ec-a8a0-ed6c3ba62da6', '994f4930-78fa-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_history` VALUES ('9d5843c0-78f9-11ec-a8a0-ed6c3ba62da6', '21e78900-78f7-11ec-a8a0-ed6c3ba62da6', '9d56e430-78f9-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_history` VALUES ('a7bb7ee0-78d6-11ec-a8a0-ed6c3ba62da6', 'a2219600-78d5-11ec-a8a0-ed6c3ba62da6', 'a7b7fc70-78d6-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_history` VALUES ('aae9f820-78fa-11ec-a8a0-ed6c3ba62da6', '762febb0-78f7-11ec-a8a0-ed6c3ba62da6', 'aae8bfa0-78fa-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_history` VALUES ('b29984f0-78d7-11ec-a8a0-ed6c3ba62da6', '66c808d0-78d7-11ec-a8a0-ed6c3ba62da6', 'b296c5d0-78d7-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_history` VALUES ('c3b45580-78d7-11ec-a8a0-ed6c3ba62da6', '99773170-78d7-11ec-a8a0-ed6c3ba62da6', 'c3afe8b0-78d7-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_history` VALUES ('e01b3f20-78f7-11ec-a8a0-ed6c3ba62da6', '762febb0-78f7-11ec-a8a0-ed6c3ba62da6', 'e0188000-78f7-11ec-a8a0-ed6c3ba62da6');

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
-- Records of invest_item
-- ----------------------------
INSERT INTO `invest_item` VALUES ('1c4788d0-78fa-11ec-a8a0-ed6c3ba62da6', '1', '唐山港', '2021-12-22', 2.850, 10000, 2.850, 28200.0000, 28500.0000, NULL, NULL, -300.0000, 1, 'sh601000', 2.820, '2022-01-19', 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('21e78900-78f7-11ec-a8a0-ed6c3ba62da6', '1', '香江控股', '2021-09-23', 2.040, 0, 0.000, 13668.0000, 0.0000, '2021-12-22', 2.490, 2295.0000, 0, 'sh600162', 2.230, '2022-01-19', 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('3a723030-78d2-11ec-a8a0-ed6c3ba62da6', '1', '省广集团', '2021-01-01', 8.640, 1400, 6.669, 7518.0000, 9336.0000, NULL, NULL, -1818.6000, 1, 'sz002400', 5.370, '2022-01-19', 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('48a697f0-78f9-11ec-a8a0-ed6c3ba62da6', '1', '中国中治', '2021-12-20', 4.090, 0, 0.000, 8260.0000, 0.0000, '2022-01-07', 4.150, 120.0000, 0, 'sh601618', 4.070, '2022-01-19', 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('66c808d0-78d7-11ec-a8a0-ed6c3ba62da6', '1', '美好置业', '2021-09-07', 1.730, 0, 0.000, 18400.0000, 0.0000, '2021-09-08', 1.840, 1100.0000, 0, 'sz000667', NULL, NULL, 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('762febb0-78f7-11ec-a8a0-ed6c3ba62da6', '1', '国电电力', '2021-12-03', 2.670, 6000, 2.693, 17340.0000, 16160.0000, NULL, NULL, 1182.0000, 1, 'sh600795', 2.890, '2022-01-19', 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('99773170-78d7-11ec-a8a0-ed6c3ba62da6', '1', '上海建工', '2021-09-08', 2.950, 0, 0.000, 22176.0000, 0.0000, '2021-09-10', 3.080, 936.0000, 0, 'sh600170', NULL, NULL, 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('a2219600-78d5-11ec-a8a0-ed6c3ba62da6', '1', '香江控股', '2021-09-01', 1.860, 0, 0.000, 23000.0000, 0.0000, '2022-01-19', 1.920, 600.0000, 0, 'sh600162', 2.240, '2022-01-19', 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('ad430ab0-78f7-11ec-a8a0-ed6c3ba62da6', '1', '唐山港', '2021-12-03', 2.760, 0, 0.000, 5396.0000, 0.0000, '2021-12-20', 2.780, 38.0000, 0, 'sh601000', 2.820, '2022-01-19', 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('ae0eb490-78f6-11ec-a8a0-ed6c3ba62da6', '1', '西南证券', '2021-09-16', 5.410, 5000, 5.360, 25300.0000, 26802.0000, NULL, NULL, -1500.0000, 1, 'sh600369', 5.060, '2022-01-19', 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('ca4b26e0-78d6-11ec-a8a0-ed6c3ba62da6', '1', '南国置业', '2021-09-07', 1.960, 0, 0.000, 23700.0000, 0.0000, '2021-12-15', 2.060, 1000.0000, 0, 'sz002305', 2.270, '2022-01-19', 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('e2b33d30-78f9-11ec-a8a0-ed6c3ba62da6', '1', '华远地产', '2021-12-22', 2.190, 10000, 2.165, 21200.0000, 21648.0000, NULL, NULL, -450.0000, 1, 'sh600743', 2.120, '2022-01-19', 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('f14c3d50-78d7-11ec-a8a0-ed6c3ba62da6', '1', '美好置业', '2021-09-13', 1.800, 0, 0.000, 19000.0000, 0.0000, '2021-09-16', 1.900, 1000.0000, 0, 'sz000667', NULL, NULL, 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('f6d799b0-78f8-11ec-a8a0-ed6c3ba62da6', '1', '中国能建', '2021-12-17', 2.720, 7200, 2.804, 19872.0000, 20192.0000, NULL, NULL, -316.8000, 1, 'sh601868', 2.760, '2022-01-19', 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');

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
-- Records of invest_record
-- ----------------------------
INSERT INTO `invest_record` VALUES ('01f3ba30-78fa-11ec-a8a0-ed6c3ba62da6', '2021-12-22', '1', 2.130, 4200, 2.165);
INSERT INTO `invest_record` VALUES ('02dbc8b0-78d8-11ec-a8a0-ed6c3ba62da6', '2021-09-16', '2', 1.900, 10000, 0.000);
INSERT INTO `invest_record` VALUES ('169de880-78f9-11ec-a8a0-ed6c3ba62da6', '2021-12-20', '1', 5.100, 800, 5.360);
INSERT INTO `invest_record` VALUES ('2bfa0c40-78f9-11ec-a8a0-ed6c3ba62da6', '2022-01-20', '1', 2.910, 2800, 2.781);
INSERT INTO `invest_record` VALUES ('330845a0-78fa-11ec-a8a0-ed6c3ba62da6', '2021-12-22', '1', 2.820, 900, 2.828);
INSERT INTO `invest_record` VALUES ('4839b710-78d2-11ec-a8a0-ed6c3ba62da6', '2021-06-10', '1', 5.190, 800, 6.669);
INSERT INTO `invest_record` VALUES ('4b841ff0-78fa-11ec-a8a0-ed6c3ba62da6', '2021-12-31', '2', 3.190, 2200, 2.406);
INSERT INTO `invest_record` VALUES ('61e44630-78fa-11ec-a8a0-ed6c3ba62da6', '2021-12-31', '1', 2.760, 2500, 2.804);
INSERT INTO `invest_record` VALUES ('67145ba0-78f9-11ec-a8a0-ed6c3ba62da6', '2021-12-20', '2', 2.780, 1900, 0.000);
INSERT INTO `invest_record` VALUES ('744a4650-78f8-11ec-a8a0-ed6c3ba62da6', '2021-12-15', '2', 2.060, 10000, 0.000);
INSERT INTO `invest_record` VALUES ('7deaea60-78f9-11ec-a8a0-ed6c3ba62da6', '2021-12-21', '1', 2.940, 1900, 2.830);
INSERT INTO `invest_record` VALUES ('7f4db940-78fa-11ec-a8a0-ed6c3ba62da6', '2022-01-07', '2', 4.150, 2000, 0.000);
INSERT INTO `invest_record` VALUES ('97201f10-78f8-11ec-a8a0-ed6c3ba62da6', '2021-12-17', '2', 3.050, 1800, 2.580);
INSERT INTO `invest_record` VALUES ('994f4930-78fa-11ec-a8a0-ed6c3ba62da6', '2022-01-04', '1', 3.060, 600, 2.537);
INSERT INTO `invest_record` VALUES ('9d56e430-78f9-11ec-a8a0-ed6c3ba62da6', '2021-12-22', '2', 2.490, 5100, 0.000);
INSERT INTO `invest_record` VALUES ('a7b7fc70-78d6-11ec-a8a0-ed6c3ba62da6', '2022-01-19', '2', 1.920, 10000, 0.000);
INSERT INTO `invest_record` VALUES ('aae8bfa0-78fa-11ec-a8a0-ed6c3ba62da6', '2022-01-10', '1', 2.850, 3000, 2.693);
INSERT INTO `invest_record` VALUES ('b296c5d0-78d7-11ec-a8a0-ed6c3ba62da6', '2021-09-08', '2', 1.840, 10000, 0.000);
INSERT INTO `invest_record` VALUES ('c3afe8b0-78d7-11ec-a8a0-ed6c3ba62da6', '2021-09-10', '2', 3.080, 7200, 0.000);
INSERT INTO `invest_record` VALUES ('e0188000-78f7-11ec-a8a0-ed6c3ba62da6', '2021-12-15', '1', 2.870, 1800, 2.815);

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
INSERT INTO `sys_user` VALUES ('8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', 'vincent', 'MzMxMjkzZjIwZTY4OWQxMmZlMjA3YmNlY2Q0Yzk5ZGI=', '13631474749');

SET FOREIGN_KEY_CHECKS = 1;
