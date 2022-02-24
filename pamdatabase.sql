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

 Date: 24/02/2022 19:06:21
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
-- Records of attachment_list
-- ----------------------------
INSERT INTO `attachment_list` VALUES ('58baf5e0-92e0-11ec-9d83-79ccb449900b', '8200cf50-78ce-11ec-a8a0-ed6c16452000', '/photo/vincent/微信图片_20220221143401-17f1afd4419.jpg', 'c:\\zzjFiles\\vincent\\个人事务管理系统\\code\\pamsystem\\server\\statics\\vincent', 0);
INSERT INTO `attachment_list` VALUES ('6724b030-92e0-11ec-9d83-79ccb449900b', '8200cf50-78ce-11ec-a8a0-ed6c16452864', '/photo/vincent/微信图片_20220221143401-17f1afda296.jpg', 'c:\\zzjFiles\\vincent\\个人事务管理系统\\code\\pamsystem\\server\\statics\\vincent', 0);
INSERT INTO `attachment_list` VALUES ('a807eb10-9099-11ec-ab1a-9f79fc8de9f8', '8200cf50-78ce-11ec-a8a0-ed6c16451136', '/photo/vincent/微信图片_20220105195528-17f0c128c31.jpg', 'c:\\zzjFiles\\vincent\\个人事务管理系统\\code\\pamsystem\\server\\statics\\vincent', 0);
INSERT INTO `attachment_list` VALUES ('bde8a0c0-909c-11ec-81f7-df5fefcf7eb2', '8200cf50-78ce-11ec-a8a0-ed6c16451136', '/photo/vincent/单块砖、石材空鼓-无-未针对工程进度状况开展风险识别及后续风险管理-17f0c26c45f.jpg', 'c:\\zzjFiles\\vincent\\个人事务管理系统\\code\\pamsystem\\server\\statics\\vincent', 0);
INSERT INTO `attachment_list` VALUES ('c26faf80-909c-11ec-81f7-df5fefcf7eb2', '8200cf50-78ce-11ec-a8a0-ed6c16451136', '/photo/vincent/test-17f0c26e272.png', 'c:\\zzjFiles\\vincent\\个人事务管理系统\\code\\pamsystem\\server\\statics\\vincent', 0);
INSERT INTO `attachment_list` VALUES ('ff52b0f0-909c-11ec-81f7-df5fefcf7eb2', '8200cf50-78ce-11ec-a8a0-ed6c16451136', '/photo/vincent/反-17f0c287163.jpg', 'c:\\zzjFiles\\vincent\\个人事务管理系统\\code\\pamsystem\\server\\statics\\vincent', 1);

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
-- Records of diary_list
-- ----------------------------
INSERT INTO `diary_list` VALUES ('8200cf50-78ce-11ec-a8a0-ed6c16440768', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', '动物园、女足', '今天是年初六，难得无雨，尽管有点疲惫(想睡觉)，但免得扫兴，还是一同去了大虫动物园，整体感觉没有第一次好了，动物好像也少了许多，不过长大一岁的超哥，玩得东西就变多了，也会和动物有互动了，光玩那个滑梯，自己都玩了大半个小时了，似乎还没厌倦，哈哈。最近特别黏我，走哪跟到哪，还要抱抱~睡觉除了有吮手指外，还新增了个癖好，就是不让我脱眼镜，一脱掉就跟我闹…真是奇怪。\n今天有女足亚洲杯的决赛，中国vs韩国，上半场零比二落后的情况下，下半场奋起直追，连进三球，最终完成逆风翻盘，果然女足是值得信赖的，充满斗志和拼搏精神，相比之下的男足真的丢人~无语啊', '2022-02-06', NULL, 0);
INSERT INTO `diary_list` VALUES ('8200cf50-78ce-11ec-a8a0-ed6c16441632', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', '午夜闲聊、美女', '今天是年初七，晚上超哥睡觉还是不让我脱眼镜，难道是因为脱了不是爸爸？真是奇怪了~超哥还是对鞭炮声害怕，一响鞭炮就开始扁嘴，眼泪在眼眶里打转，委屈极了~如果我身边安慰他的话，还会把头埋在我怀里，这小屁孩真是的。睡前跟老婆聊了很多她那边家的情况，真的家家有本难念的经，每个人的处境各有不同，虽然都盼着大家好才是真的好，但很多时候的确爱莫能助，尤其是经济或金钱上。\nBTW，今天看了电影《007-无暇赴死》，简单说下主要剧情:退休的007邦德和女1正在度假，结果遇上了幽灵帮的爆炸埋伏，邦德并从中得知，女1的父亲是幽灵帮的女儿，因此对其产生怀疑，虽然女1竭力解释自己对此毫不知情，但邦德还是选择将其送上火车，与她告别。转眼来到5年后，幽灵帮得到了一批生化武器，原本是英国私自研究用于暗杀使用的，所以英国中央六局和美国中央情报局各自开展调查，并请出了邦德去执行任务，在执行任务过程中，一开始是去古巴营救那个幸存的科学家(Ps.科学家是坏人，跟邦德合作的那个女搭档挺漂亮的，尤其是穿着那个黑色真空吊带晚礼服)，在执行这次任务的过程中，无意发现还有幕后主使，他用病毒把幽灵帮的人赶尽杀绝，并想着用该病毒净化人口，这个病毒是通过DNA编程进行定点靶向的，最后邦德上演类似手撕日本鬼子的夸张戏码，一人独闯虎穴，破坏了整个计划，最后也牺牲了。(亮点: 1.抢生化武器的时候，用的技术挺新颖的，高空坠落通过磁悬浮稳稳接住；2. 营救科学家时候那个女搭档漂亮 3. 在这部丹尼尔·克雷格的卸任之作中，两位邦女郎——“玛德琳”(女1爱人)蕾雅·赛杜和“帕洛玛”(女搭档)安娜·德·阿玛斯)', '2022-02-07', NULL, 0);
INSERT INTO `diary_list` VALUES ('8200cf50-78ce-11ec-a8a0-ed6c16442496', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', '坏消息', '今天是年初八，平淡无奇的一天，但是晚上收到了不好的消息，四姑妈初七的检查报告出来了，确诊急性白血病(俗称血癌)，最严重的一种白血病，不接受治疗保守3个月生存，有点可怕。百度了不少资料，这个病还真的不太简单，挺替四姑妈担心的，她本人听起来好像还是依旧乐观开朗，实际上我估计还是有点慌了，希望她好好听医生的话，迈过这道坎。', '2022-02-08', NULL, 0);
INSERT INTO `diary_list` VALUES ('8200cf50-78ce-11ec-a8a0-ed6c16443360', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', '启程返深', '今天是年初九，开始启程回深圳了，打算1点左右出发，结果收拾东西拖到了两点多才出发，一路上不算塞车，走了广佛肇环线，第一次走这条路，路况可以，但是比较多限速，距离应该也稍近一些(相比于珠三角环线)，回到深圳大概4点30左右，卸货，回公司放车，顺便打个卡，改个需求，上线部署，下班...回到家，了解到发生了段惊魂事件，海雪扛东西扛得呕吐了，唉，性子太急了，总要吃点教训，幸亏没什么大问题，不过可怕二老吓了一哆嗦。超哥在我们房间睡，睡得还可以，慢慢将他的生物钟调整过来吧！btw，四姑的病情好像加重了，希望她能稳稳渡过这一劫吧', '2022-02-09', NULL, 0);
INSERT INTO `diary_list` VALUES ('8200cf50-78ce-11ec-a8a0-ed6c16444224', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', '上班、开始', '今天是年初十，工作上还是在摸鱼状态，不过已经写出了上传文件且文件整理的后台逻辑，晚上下班运动了一会，能出汗，有点运动量，当做跑前热身吧。回到家快8点半了吧，干了一大碗饭，晚上想看会冰壶比赛，正到关键时候，去哄超哥睡觉觉，唉，有点生气妈妈怎么不把超哥哄睡再出来，冷静下来觉得自己不该这样。左肩膀的痛似乎没见好转，哄完超哥睡着后，自己起来揣摩了下，发现左肩抬臂会有点响声，右肩不会，再观察会吧，实在没见好转应该挂骨科吧。睡了，安', '2022-02-10', NULL, 0);
INSERT INTO `diary_list` VALUES ('8200cf50-78ce-11ec-a8a0-ed6c16445088', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', '工作、担忧、运动', '今天阳光不错哦，工作上中规中矩，没什么问题，但发现集团换总经理了？刘新宇换成了章伟，不知道对我们智慧建造部有没有什么影响，好在还是属于深投控旗下的子企业。晚上下班打了会球，有其他人一起投投球，相比下运动量更没昨天的多，下周开始跑下步吧。晚上回到家快8点半，超哥冲出来迎接，哈哈，笑得那么开心，可惜忘了拍照，以后要养成习惯，记录生活的点点滴滴，对了，说起这个，还得弄相册呢，类似手帐这种东西。肩膀晚上似乎更痛了，感觉明显点，主要是抬肩会痛，好像要某种特殊体位触发一样，再继续观察吧。', '2022-02-11', NULL, 0);
INSERT INTO `diary_list` VALUES ('8200cf50-78ce-11ec-a8a0-ed6c16445952', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', '电影、周末', '今天周六，回公司加了会班，日记管理模块基本完成，就差文件导入了。晚上看了部电影，《追凶者也》，主演刘烨，张译，段博文。故事讲述的方式很特别，片子搞笑是一回事，最印象深刻的就是它讲故事的方式了。\n下面说了故事内容:\n故事内容其实很简单的，在云南的一个偏远的地区，有人因土地征用问题雇了杀手杀害土地主人（刘烨），结果杀手（张译）因为照片丢失，杀错了人，并且作案证据被人无意偷走了（段博文），也正因此引发了杀手为了找回证据及挽回杀错人的面子而陆续杀人，最终被警察制服。故事虽然简单，但是讲述的方式却与众不同；以杀手杀错人的开始到被警察制服为时间主线，分别以不同人的视角进行拍摄，让观众有很强的代入感，部分人物故事线所埋下的伏笔又能在别人的视角中得以破解，十分有趣。值得一看（btw，完整版中王子文有小牺牲片段）', '2022-02-12', NULL, 0);
INSERT INTO `diary_list` VALUES ('8200cf50-78ce-11ec-a8a0-ed6c16446816', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', '周末带娃，调整生物钟', '今天周日，上午带娃去打疫苗，来得有点晚，N多人，信息登记那里效率实在太慢了。超哥还没开始打就准备哭了，扎进去的时候就哭得更厉害了，哈哈，别说小孩子了，大人都有些许害怕打针，打完针后又去做了简单的体检，果不其然有点发育跟不上，实在是吃得太少了，哄他吃东西真的超级难，体检的时候超哥以为要打针，奋力反抗，哭得更厉害了，抓都抓不住...全部搞完回到家应该12点多了，趁着他睡意并不是很浓，赶紧把午饭给喂了，喂完差不多2点就睡着了，然后睡到3点半过后吧，这样的作息时间还可以，然后就是运动了。就这样一天下来，有秩有序地慢慢把超哥的生物钟调整回来。\n今天看了部电影，《太极2》，是被抖音上疯和尚的片段吸引过来的，以前看过，现在回味一下，整体一般，不过里面的机关倒是挺有趣的：\n话说陈家村有套拳法远近闻名，但有个不成文规定（引出疯和尚-吴彦祖片段）：拳法不可教给外村人，否则铜钟夜响，村毁人亡。然后转眼来到现在的掌门（梁家辉），其有三子一女，大儿子从小喜欢造机器，甚至练习功夫也通过机器取巧，被其父亲一直责骂，赶出家门。如今女儿结婚，嫁给了一位“傻小子”（外村人-亚运会武术冠军，演技一般般，生硬），掌门觉得他是不可多得的练武奇才，于是想把陈家拳教给他，这时大儿子突然回来，并翻出了那条不成文规定，而且通过机关把铜钟弄响，把陈家村搞得人心惶惶，原来掌门从他回来那一刻就觉得不对劲，经查发现是回来捣乱的，目的是受敌人（方子敬-彭于晏饰演）唆使回村捣乱，明面上好令铁路从陈家村建设开通，实际上是实现其复仇大计（啥子仇恨我就忘了，估计太极1有说吧...）被拆穿后，方子敬利用铲除乱党的罪名讨伐陈家村，掌门及傻小子、女儿出面阻挡而陷入险境，这时大儿子通过自己制造的机器拯救了其妹妹和‘傻小子’，但自己与父亲却被抓住了，后续就是成功逃脱的两人去京城请救兵（傻小子在醇亲王面前展示陈家拳的威力，并被赐名太极拳），大牢中的父子也化解了误会，从新和好，一部一般般的片子就结束了，总得来说功夫上的慢镜头拍得挺好的。结束时有彩蛋，方子敬被抓走做人体试验，估计造机器人了？可能出太极3，网上一搜，结果好像因为前两部反映太差，第三部流产了...', '2022-02-13', NULL, 0);
INSERT INTO `diary_list` VALUES ('8200cf50-78ce-11ec-a8a0-ed6c16447680', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', '情人节、比心', '今天是情人节，没准备什么礼物给老婆，早上看新闻听说今天的红包可以发520，于是发了过去顺便验证一下，嘿嘿，偷懒了。情人节，晚上也没加班，下班就回家了，回家果然要我表示表示，灵机一动，用右手比了个心给她，哈哈；好像不太满意，问我还有啥，于是左手比了个心；看样子还是不满意，没法子了，双手比了个心，把老婆逗笑了，感觉逗笑了成功了一半，能遮掩下我那天的偷懒没准备啥惊喜，哈哈...', '2022-02-14', NULL, 0);
INSERT INTO `diary_list` VALUES ('8200cf50-78ce-11ec-a8a0-ed6c16448544', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', '元宵汤圆、坏脾气', '今天周二，农历十五的元宵节，工作上中规中矩，股票上也没什么行情，阴跌站稳中？补了点国电和地产股，下班后没有加班，直接回家了，毕竟过节嘛，听说超哥今天很不听话，把奶奶都惹火了，虽然火不完全是超哥引起，但是导火线吧，唉，带娃是不容易的，耐性都耗没了，超哥啥时候懂事点呢。也正因此，我回到家后对超哥也没什么耐性，还带了些许责怪，过后想想的确不应该呀，他毕竟还什么都不懂，只能通过哭来反抗，说什么都不懂呢，有些时候好像又懂点，最近会说好多话了，爷爷奶奶，爸爸妈妈，姑姑，婆婆等等...明显有很大进步了，不过吃东西上，还是比较折腾，要看心情吃饭，而且脾气也大，若是不顺他意的话，会立马躺地上哭闹，我觉得在无理由的发脾气哭闹上不能过于惯他，让他知道采取这种过激的行为是达不到目的的，感觉等会说话，能表达自己意愿的时候，必须严格执行，不能再这样发脾气了。晚饭过后吃了汤圆，小家伙很爱吃，毕竟是甜食嘛，有时候吃不上（奶奶要吹凉了给他）又发脾气，真是的...晚上我早早哄他睡觉，毕竟明早要出远门呢，早睡早起。', '2022-02-15', NULL, 0);
INSERT INTO `diary_list` VALUES ('8200cf50-78ce-11ec-a8a0-ed6c16449408', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', '篮球、韩剧、婚姻', '今天是周三，公司例行篮球活动，打得中规中矩吧，投进了几个球，不过有些关键球就手软了，上篮也不中，投篮也较为犹豫，突破还是欠缺，后半程就更为明显了，竞技状态下滑很快，基本划水状态。打完是走回家的，因为今天中山有位兄弟（木成）的儿子结婚，爸妈他们一同去赴宴了，他们回到家大概十点，我走回去差不多九点半吧，拿了快递、拿了菜，烧了水吃了泡面，待他们到了后，我再把车停回公司，然后骑电动车回去，到家十点半过后吧，吃了点打包的点心，睡前和老婆看了部韩剧，在抖音上快餐式地观看——《认识的妻子》，剧情还算可以。故事讲述的是，男主因为不堪女主（妻子）的婚后暴躁和无理取闹，无意得到穿越过去的秘诀，于是回到过去改了自己和妻子的人生轨迹，迎娶了校园女神，但脱离男主的女主的人生截然不同，无论是工作还是生活上，散发着不一样的魅力，但是此时的女主对男主有种说不清的熟悉感，并慢慢发现自己喜欢上他，并多次向其表白，男主也逐渐意识到前世女主的暴躁和坏脾气是因为自己造成的，于是内疚并拒绝女主的表白，在一番纠缠下，男主跟女主和盘托出所有事情，女主一方也从其母亲得知穿越过去的秘诀，决定回到过去改变人生轨迹，男主害怕女主回到过去继续和他交往，也一同回到过去，在一连串插曲过后，男主认清自己内心的感受，决定努力给女主幸福，最后就happyending啦...建议已婚人士可以观看一下，能更好地面对自己的婚姻情况，正如剧中所提，不可能永远保持着婚前如胶似漆的腻歪生活，婚后（不仅婚后，恋爱的过程也许也会经历）总会慢慢回归到生活中的财米油盐酱醋茶，虽然每天三点一线奔波于生活，但两人也要懂得互相理解，互相体谅，多沟通，适当保持新鲜感、仪式感，偶尔创造独处的生活，相互欣赏，相互成长，加油', '2022-02-16', NULL, 0);
INSERT INTO `diary_list` VALUES ('8200cf50-78ce-11ec-a8a0-ed6c16450272', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', '肩痛、生气', '今天周四，果不然打完球后一身痛，为啥呢？得查一下百度....脖子好像有点睡歪了，肌肉酸痛，左肩好像疼得更明显，还是挂个号看一下吧。晚上到家给超哥拆玩具，发现不太适合他，打算退货好了，又在网上下了两单鞋子，如果退鞋不用什么成本的话，这样还挺好的，真是生意难做啊。晚上差不多11点，超哥才入睡，入睡前好像还亢奋了一下，手舞足蹈的，嘴巴还嘟囔着什么...甚是可爱。晚上老婆给我看超哥的生日蛋糕，看得眼睛都累了，好像还有点生我气。也不晚安，也不抱抱，也不亲亲，就挨着超哥睡觉觉了，接着我也挨着过去，依偎了一会也自个睡了。', '2022-02-17', NULL, 0);
INSERT INTO `diary_list` VALUES ('8200cf50-78ce-11ec-a8a0-ed6c16451136', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', '摸鱼、周末', '测试文件上传', '2022-02-18', NULL, 0);
INSERT INTO `diary_list` VALUES ('8200cf50-78ce-11ec-a8a0-ed6c16452000', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', '两周岁', '今天是正月十九，星期六，超哥的两周岁生日，上午吃东西有点闹腾，于是就随性，想吃多少就吃多少吧。吃完带他去了天虹，最近香港疫情超级严重，顺带着深圳也变得紧张起来，零零散散的又开始有新增个例了，所以天虹也变严格起来，没有做核酸的不让进，幸亏我昨天做了，才能带超哥进去，这样也好，商场人少了，四楼的滑滑梯超哥能独享了。下午，做了麻薯包，又订了生日蛋糕，等老婆回来后开始布置生日场景，吃过晚饭后，开始给超哥庆祝啦，拍了好多好看的照片，超哥笑得好开心啊，哈哈。蛋糕说实话一般般，不过图了个好看罢了，准备洗澡时，肚子一直感觉有点涨气，并且恶心，吐了三回，都不知道是因为过期的黄油还是说那个生日蛋糕惹得祸。', '2022-02-19', NULL, 0);
INSERT INTO `diary_list` VALUES ('8200cf50-78ce-11ec-a8a0-ed6c16452864', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', '改变、下雨、寒冷', '周日，今天开始不让超哥看手机来吃饭了，他爱吃多少是多少。由于天气寒冷，且下着雨，也没什么地方去，就在家呆了一天。', '2022-02-20', NULL, 0);
INSERT INTO `diary_list` VALUES ('8200cf50-78ce-11ec-a8a0-ed6c16453728', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', '冻雨、骤冷', '周一，今天居然落冻雨，天寒地冻的，估计就7度左右吧，早上冒雨骑着小电驴上班，戴着雨衣也能把裤子给弄湿，幸亏不算太湿，不然就麻烦了。', '2022-02-21', NULL, 0);
INSERT INTO `diary_list` VALUES ('8200cf50-78ce-11ec-a8a0-ed6c16454592', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', '核酸、停雨', '今日周二，昨天已经下了一天的冻雨了，今天继续，无奈只能选择搭公交出行了。上午得到消息说明天周三下午过投控开会，好像也很久没去开会了，了解下项目整体的方向也好，探探消息。下午睡醒，看着外面停雨了，于是直接去高新园做核酸去了，一路畅通，很快就搞定，回来路上也遇到恒鑫去做。果不其然，做完核酸不久，又开始下雨了，幸亏下班的时候没什么雨，偶尔有点雨花。此外，今天行情一般，地产股始终没力上涨，不过美好置业保持涨了点，大概七八百盈利吧，老爸建议入上海建工(跌了大概一两个点)，正好我也有余钱，而且还不打算出美好，于是用剩余的资金买了四千手上海建工，大概一万四千五百。', '2022-02-22', NULL, 0);
INSERT INTO `diary_list` VALUES ('8200cf50-78ce-11ec-a8a0-ed6c16455456', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', '战争、投资、欧冠', '周三，今天果真如天气预报所说的，停雨了，据说天气开始转好，气温开始上升，挺好的，下雨天太麻烦了。今日本打算是过福田开会的，但是中午睡醒收到消息，那边划为管控区了，所以会议只好延期了。下午，跟恒鑫一块去做核酸，聊了点关于年终奖的事情，原来年终奖不是由他那边发，可能谭总，或叶经理发，不清楚发的依据是什么，每个人都不一样，有的可能还没有？工作上今天搞了下redis，与后台开发人员聊了下文件存储，redis管理，以及websocket聊天室的开发模式，长知识了，对自己的项目大有益处。行情上，受俄乌事件的影响（好像升级了，俄罗斯直接宣布乌克兰的两个洲为独立共和国，事情闹大了）全球股市大跌，其实昨天就有点迹象了，一时间没意识到股票有可能受到影响，感觉自己买股票没有经过思考，更多的只是参考K线来做一个波段，没有经过分析，结合时势，简直就是在投机，而不是投资。晚上，应该算是第二天的凌晨4点，看了场欧冠比赛，曼联与马竞的第一回合较量，一开场马竞直接开足马力，趁着主场优势，不到十分钟就进了一球，好像是来自葡萄牙的新星，很年轻，技术挺不错的，就有些关键球处理得不够老练，整个上半场曼联都处于被动的一方，中场和前场无办法产生很多有效的配合，往往在中场就被逼抢而破坏掉进攻了；到了下半场，曼联开始加强了逼抢，也有几次不错的前场配合，但始终差了点，不得不说这场比赛，拉师傅有点拉跨，很多球传不好、控不住；好在经过几番换人调整，在临终场十来二十分钟，经过一次反击的前场配合，打进了一球，在客场握手言和，还算可以吧，下一回合3月16号，同样凌晨4点，曼联主场，还是希望C罗能有很好的发挥，另外一边的梅西也要加油，感觉两人的统治力的时代已经渐行渐远了，一代人的青春啊！', '2022-02-23', NULL, 0);
INSERT INTO `diary_list` VALUES ('c362d810-79b1-11ec-877a-b30f16445952', 'c362d810-79b1-11ec-877a-b30fb9b4ce28', '测试标题', '有没有搞错啊！', '2022-02-12', NULL, 1);

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
INSERT INTO `invest_history` VALUES ('07934db0-8d5a-11ec-8c56-6383ac76f0bc', 'f58b36f0-8d59-11ec-8c56-6383ac76f0bc', '07921530-8d5a-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('0c47e700-8d58-11ec-8c56-6383ac76f0bc', 'f0751980-8d57-11ec-8c56-6383ac76f0bc', '0c466060-8d58-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('154e0ab0-8d57-11ec-8c56-6383ac76f0bc', 'ee698780-8d56-11ec-8c56-6383ac76f0bc', '154c35f0-8d57-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('17bfedb0-8d5a-11ec-8c56-6383ac76f0bc', 'f58b36f0-8d59-11ec-8c56-6383ac76f0bc', '17bda3c0-8d5a-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('1faeca70-8d58-11ec-8c56-6383ac76f0bc', 'f0751980-8d57-11ec-8c56-6383ac76f0bc', '1facf5b0-8d58-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('24a06b90-8d3c-11ec-b769-a5950aa661da', 'a7a57880-8a32-11ec-ad33-c98a95271994', '249d8560-8d3c-11ec-b769-a5950aa661da');
INSERT INTO `invest_history` VALUES ('25cb7f40-8d56-11ec-8c56-6383ac76f0bc', '25c71270-8d56-11ec-8c56-6383ac76f0bc', '25ca94e0-8d56-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('28998c00-8d59-11ec-8c56-6383ac76f0bc', '28971b00-8d59-11ec-8c56-6383ac76f0bc', '2898c8b0-8d59-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('2ba242b0-8d5a-11ec-8c56-6383ac76f0bc', 'f58b36f0-8d59-11ec-8c56-6383ac76f0bc', '2b9f0e60-8d5a-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('37c03840-8d5a-11ec-8c56-6383ac76f0bc', 'f58b36f0-8d59-11ec-8c56-6383ac76f0bc', '37be8a90-8d5a-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('3ac86c00-8d56-11ec-8c56-6383ac76f0bc', '25c71270-8d56-11ec-8c56-6383ac76f0bc', '3ac5fb00-8d56-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('3bb27680-8d59-11ec-8c56-6383ac76f0bc', '28971b00-8d59-11ec-8c56-6383ac76f0bc', '3bb0c8d0-8d59-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('430c10c0-8d5a-11ec-8c56-6383ac76f0bc', 'f58b36f0-8d59-11ec-8c56-6383ac76f0bc', '430ad840-8d5a-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('46366b20-8d59-11ec-8c56-6383ac76f0bc', '28971b00-8d59-11ec-8c56-6383ac76f0bc', '46350b90-8d59-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('4d922510-8d56-11ec-8c56-6383ac76f0bc', '25c71270-8d56-11ec-8c56-6383ac76f0bc', '4d90ec90-8d56-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('50595e90-8d5a-11ec-8c56-6383ac76f0bc', 'f58b36f0-8d59-11ec-8c56-6383ac76f0bc', '5057ff00-8d5a-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('55a507c0-8d58-11ec-8c56-6383ac76f0bc', 'f0751980-8d57-11ec-8c56-6383ac76f0bc', '55a296c0-8d58-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('64cac9a0-8d59-11ec-8c56-6383ac76f0bc', '64c80a80-8d59-11ec-8c56-6383ac76f0bc', '64c9df40-8d59-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('65dce7d0-8d57-11ec-8c56-6383ac76f0bc', '65d96560-8d57-11ec-8c56-6383ac76f0bc', '65dbd660-8d57-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('6b881820-8d3f-11ec-8681-37c5fb39410b', '6b7d69c0-8d3f-11ec-8681-37c5fb39410b', '6b869180-8d3f-11ec-8681-37c5fb39410b');
INSERT INTO `invest_history` VALUES ('73053690-8d59-11ec-8c56-6383ac76f0bc', '64c80a80-8d59-11ec-8c56-6383ac76f0bc', '730313b0-8d59-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('740c73c0-8d61-11ec-b459-41cebc5fb334', 'f58b36f0-8d59-11ec-8c56-6383ac76f0bc', '740547d0-8d61-11ec-b459-41cebc5fb334');
INSERT INTO `invest_history` VALUES ('76f45d00-8d57-11ec-8c56-6383ac76f0bc', '65d96560-8d57-11ec-8c56-6383ac76f0bc', '76f28840-8d57-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('7b999790-8d56-11ec-8c56-6383ac76f0bc', '7b944060-8d56-11ec-8c56-6383ac76f0bc', '7b97e9e0-8d56-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('8d0fa780-8d56-11ec-8c56-6383ac76f0bc', '7b944060-8d56-11ec-8c56-6383ac76f0bc', '8d0dabb0-8d56-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('92c14900-8d55-11ec-8c56-6383ac76f0bc', '92bc18e0-8d55-11ec-8c56-6383ac76f0bc', '92bf9b50-8d55-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('95f24700-8d3c-11ec-b769-a5950aa661da', 'a7a57880-8a32-11ec-ad33-c98a95271994', '95ee7670-8d3c-11ec-b769-a5950aa661da');
INSERT INTO `invest_history` VALUES ('a0751970-8d58-11ec-8c56-6383ac76f0bc', 'a06ed7e0-8d58-11ec-8c56-6383ac76f0bc', 'a073b9e0-8d58-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('a5decfd0-8ef4-11ec-bf24-cb62b9f0aa7e', 'a5d8b550-8ef4-11ec-bf24-cb62b9f0aa7e', 'a5dd7040-8ef4-11ec-bf24-cb62b9f0aa7e');
INSERT INTO `invest_history` VALUES ('a84a2620-7b4e-11ec-a9d1-7730d6510543', '52249570-7b42-11ec-95ae-535d65a411fa', 'a8473ff0-7b4e-11ec-a9d1-7730d6510543');
INSERT INTO `invest_history` VALUES ('ab9ecb50-8d55-11ec-8c56-6383ac76f0bc', '92bc18e0-8d55-11ec-8c56-6383ac76f0bc', 'ab9ccf80-8d55-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('ac7d8b30-8d58-11ec-8c56-6383ac76f0bc', 'a06ed7e0-8d58-11ec-8c56-6383ac76f0bc', 'ac7c2ba0-8d58-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('ad8d5f70-8d56-11ec-8c56-6383ac76f0bc', 'ad8aee70-8d56-11ec-8c56-6383ac76f0bc', 'ad8c7510-8d56-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('b0eb5020-8d59-11ec-8c56-6383ac76f0bc', 'b0e81bd0-8d59-11ec-8c56-6383ac76f0bc', 'b0ea65c0-8d59-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('b32c7d80-8ecd-11ec-b406-f38c6b715ebf', 'b32885e0-8ecd-11ec-b406-f38c6b715ebf', 'b32b1df0-8ecd-11ec-b406-f38c6b715ebf');
INSERT INTO `invest_history` VALUES ('b5cdd740-8d57-11ec-8c56-6383ac76f0bc', 'b5c9b890-8d57-11ec-8c56-6383ac76f0bc', 'b5cc77b0-8d57-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('ba617e40-8d59-11ec-8c56-6383ac76f0bc', 'b0e81bd0-8d59-11ec-8c56-6383ac76f0bc', 'ba5a5250-8d59-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('bcd74090-8d56-11ec-8c56-6383ac76f0bc', 'ad8aee70-8d56-11ec-8c56-6383ac76f0bc', 'bcd544c0-8d56-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('cb93f310-953c-11ec-a4ef-8b0c17022404', 'cb8ffb70-953c-11ec-a4ef-8b0c17022404', 'cb92ba90-953c-11ec-a4ef-8b0c17022404');
INSERT INTO `invest_history` VALUES ('cba5bab0-8d57-11ec-8c56-6383ac76f0bc', 'b5c9b890-8d57-11ec-8c56-6383ac76f0bc', 'cba43410-8d57-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('d6e4f390-8d58-11ec-8c56-6383ac76f0bc', 'd6e05fb0-8d58-11ec-8c56-6383ac76f0bc', 'd6e3bb10-8d58-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('e6c304a0-8ee8-11ec-ad8b-37d77df37e4e', 'e6bdad70-8ee8-11ec-ad8b-37d77df37e4e', 'e6c1a510-8ee8-11ec-ad8b-37d77df37e4e');
INSERT INTO `invest_history` VALUES ('ed367b30-8d55-11ec-8c56-6383ac76f0bc', 'ed328390-8d55-11ec-8c56-6383ac76f0bc', 'ed3569c0-8d55-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('ee6ce2e0-8d56-11ec-8c56-6383ac76f0bc', 'ee698780-8d56-11ec-8c56-6383ac76f0bc', 'ee6bd170-8d56-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('efa4ecb0-8d61-11ec-b459-41cebc5fb334', 'ef9d4b90-8d61-11ec-b459-41cebc5fb334', 'efa2a2c0-8d61-11ec-b459-41cebc5fb334');
INSERT INTO `invest_history` VALUES ('f079ad60-8d57-11ec-8c56-6383ac76f0bc', 'f0751980-8d57-11ec-8c56-6383ac76f0bc', 'f07826c0-8d57-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('f58dcf00-8d59-11ec-8c56-6383ac76f0bc', 'f58b36f0-8d59-11ec-8c56-6383ac76f0bc', 'f58ce4a0-8d59-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('fa4ae940-8d56-11ec-8c56-6383ac76f0bc', 'ee698780-8d56-11ec-8c56-6383ac76f0bc', 'fa491480-8d56-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('fca764f0-8d58-11ec-8c56-6383ac76f0bc', 'd6e05fb0-8d58-11ec-8c56-6383ac76f0bc', 'fca5b740-8d58-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('fdc70d20-8d55-11ec-8c56-6383ac76f0bc', 'ed328390-8d55-11ec-8c56-6383ac76f0bc', 'fdc5ad90-8d55-11ec-8c56-6383ac76f0bc');
INSERT INTO `invest_history` VALUES ('ff8fd450-8d57-11ec-8c56-6383ac76f0bc', 'f0751980-8d57-11ec-8c56-6383ac76f0bc', 'ff8e26a0-8d57-11ec-8c56-6383ac76f0bc');

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
INSERT INTO `invest_item` VALUES ('25b7eb80-8d3b-11ec-b769-a5950aa661da', '1', '国电电力', '2022-02-01', 2.000, 10000, 2.000, 20000.0000, 20000.0000, NULL, NULL, NULL, 1, 'sh600795', NULL, NULL, 1, 'c362d810-79b1-11ec-877a-b30fb9b4ce28');
INSERT INTO `invest_item` VALUES ('25c71270-8d56-11ec-8c56-6383ac76f0bc', '1', '南国置业', '2021-09-07', 1.960, 0, 0.000, 19600.0000, 0.0000, '2021-12-17', 2.090, 1075.0000, 0, 'sz002305', NULL, NULL, 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('28971b00-8d59-11ec-8c56-6383ac76f0bc', '1', '华远地产', '2021-12-22', 2.190, 0, 0.000, 12702.0000, 0.0000, '2022-01-20', 2.330, 1650.0000, 0, 'sh600743', NULL, NULL, 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('52249570-7b42-11ec-95ae-535d65a411fa', '1', '国电电力', '2022-01-01', 2.000, 0, 0.000, 28500.0000, 0.0000, '2022-01-07', 2.850, 8500.0000, 0, 'sh600795', 2.850, '2022-01-22', 0, 'c362d810-79b1-11ec-877a-b30fb9b4ce28');
INSERT INTO `invest_item` VALUES ('64c80a80-8d59-11ec-8c56-6383ac76f0bc', '1', '唐山港', '2021-12-22', 2.850, 0, 0.000, 28500.0000, 0.0000, '2022-02-09', 3.000, 1500.0000, 0, 'sh601000', NULL, NULL, 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('65d96560-8d57-11ec-8c56-6383ac76f0bc', '1', '香江控股', '2021-09-23', 2.040, 0, 0.000, 10404.0000, 0.0000, '2021-12-22', 2.490, 2295.0000, 0, 'sh600162', NULL, NULL, 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('6b7d69c0-8d3f-11ec-8681-37c5fb39410b', '1', '国电电力', '2022-02-04', 2.000, 10000, 2.000, 27900.0000, 20000.0000, NULL, NULL, 7900.0000, 1, 'sh600795', 2.790, '2022-02-14', 0, 'c362d810-79b1-11ec-877a-b30fb9b4ce28');
INSERT INTO `invest_item` VALUES ('7b944060-8d56-11ec-8c56-6383ac76f0bc', '1', '上海建工', '2021-09-08', 2.950, 0, 0.000, 21240.0000, 0.0000, '2021-09-10', 3.080, 936.0000, 0, 'sh600170', NULL, NULL, 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('92bc18e0-8d55-11ec-8c56-6383ac76f0bc', '1', '香江控股', '2021-09-01', 1.860, 0, 0.000, 18600.0000, 0.0000, '2021-09-06', 1.920, 600.0000, 0, 'sh600162', NULL, NULL, 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('a06ed7e0-8d58-11ec-8c56-6383ac76f0bc', '1', '中国中治', '2021-12-20', 4.090, 0, 0.000, 8180.0000, 0.0000, '2022-01-07', 4.150, 120.0000, 0, 'sh601618', NULL, NULL, 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('a5d8b550-8ef4-11ec-bf24-cb62b9f0aa7e', '1', '中国能建', '2022-02-16', 2.780, 5000, 2.780, 13450.0000, 13900.0000, NULL, NULL, -450.0000, 1, 'sh601868', 2.690, '2022-02-24', 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('a7a57880-8a32-11ec-ad33-c98a95271994', '1', '国电电力', '2022-02-04', 2.000, 0, 0.000, 14100.0000, 0.0000, '2022-02-08', 4.000, 15000.0000, 0, 'sh600795', 2.820, '2022-02-14', 0, 'c362d810-79b1-11ec-877a-b30fb9b4ce28');
INSERT INTO `invest_item` VALUES ('ad8aee70-8d56-11ec-8c56-6383ac76f0bc', '1', '美好置业', '2021-09-13', 1.800, 0, 0.000, 18000.0000, 0.0000, '2021-09-16', 1.900, 1000.0000, 0, 'sz000667', NULL, NULL, 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('b0e81bd0-8d59-11ec-8c56-6383ac76f0bc', '1', '省广集团', '2020-10-21', 6.672, 0, 0.000, 9340.8000, 0.0000, '2022-02-11', 5.870, -1122.8000, 0, 'sz002400', NULL, NULL, 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('b32885e0-8ecd-11ec-b406-f38c6b715ebf', '1', '美好置业', '2022-02-16', 1.710, 10000, 1.710, 16700.0000, 17100.0000, NULL, NULL, -400.0000, 1, 'sz000667', 1.670, '2022-02-24', 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('b5c9b890-8d57-11ec-8c56-6383ac76f0bc', '1', '唐山港', '2021-12-03', 2.760, 0, 0.000, 5244.0000, 0.0000, '2021-12-20', 2.780, 38.0000, 0, 'sh601000', NULL, NULL, 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('cb8ffb70-953c-11ec-a4ef-8b0c17022404', '1', '上海建工', '2022-02-22', 3.620, 4000, 3.620, 13240.0000, 14480.0000, NULL, NULL, -1240.0000, 1, 'sh600170', 3.310, '2022-02-24', 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('d6e05fb0-8d58-11ec-8c56-6383ac76f0bc', '1', '南国置业', '2022-01-20', 2.270, 12500, 2.250, 26000.0000, 28125.0000, NULL, NULL, -2125.0000, 1, 'sz002305', 2.080, '2022-02-24', 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('e6bdad70-8ee8-11ec-ad8b-37d77df37e4e', '1', '唐山港', '2022-02-16', 2.890, 5000, 2.890, 13950.0000, 14450.0000, NULL, NULL, -500.0000, 1, 'sh601000', 2.790, '2022-02-24', 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('ed328390-8d55-11ec-8c56-6383ac76f0bc', '1', '美好置业', '2021-09-07', 1.730, 0, 0.000, 17300.0000, 0.0000, '2021-09-08', 1.840, 1100.0000, 0, 'sz000667', NULL, NULL, 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('ee698780-8d56-11ec-8c56-6383ac76f0bc', '1', '西南证券', '2021-09-16', 5.410, 7500, 5.214, 35400.0000, 39102.0000, NULL, NULL, -3705.0000, 1, 'sh600369', 4.720, '2022-02-24', 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('ef9d4b90-8d61-11ec-b459-41cebc5fb334', '1', '香江控股', '2022-02-14', 2.220, 5000, 2.220, 10900.0000, 11100.0000, NULL, NULL, -200.0000, 1, 'sh600162', 2.180, '2022-02-24', 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('f0751980-8d57-11ec-8c56-6383ac76f0bc', '1', '中国能建', '2021-12-17', 2.720, 0, 0.000, 5168.0000, 0.0000, '2022-02-10', 2.980, 1267.2000, 0, 'sh601868', NULL, NULL, 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');
INSERT INTO `invest_item` VALUES ('f58b36f0-8d59-11ec-8c56-6383ac76f0bc', '1', '国电电力', '2021-12-03', 2.670, 10000, 2.704, 26200.0000, 27038.0000, NULL, NULL, -840.0000, 1, 'sh600795', 2.620, '2022-02-24', 0, '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6');

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
-- Records of invest_moneyflowing
-- ----------------------------
INSERT INTO `invest_moneyflowing` VALUES ('13736500-8d5c-11ec-8c56-6383ac76f0bc', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', 2, 1, 22000.000, 22000.000, '2021-12-09');
INSERT INTO `invest_moneyflowing` VALUES ('28035690-8d45-11ec-8c56-6383ac76f0bc', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', 1, 1, 1500.000, 4500.000, '2021-02-10');
INSERT INTO `invest_moneyflowing` VALUES ('31056620-8d45-11ec-8c56-6383ac76f0bc', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', 1, 0, 18.760, 4481.240, '2021-02-18');
INSERT INTO `invest_moneyflowing` VALUES ('407aeb20-8d45-11ec-8c56-6383ac76f0bc', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', 1, 1, 20000.000, 24481.240, '2021-06-10');
INSERT INTO `invest_moneyflowing` VALUES ('5105f440-8d44-11ec-8dc4-f59ca79851b8', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', 1, 1, 3000.000, 3000.000, '2021-02-09');
INSERT INTO `invest_moneyflowing` VALUES ('54430160-8d45-11ec-8c56-6383ac76f0bc', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', 1, 0, 15000.000, 9481.240, '2021-07-10');
INSERT INTO `invest_moneyflowing` VALUES ('62414980-8d62-11ec-b459-41cebc5fb334', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', 2, 0, 22000.000, 0.000, '2022-02-14');
INSERT INTO `invest_moneyflowing` VALUES ('62738340-8d45-11ec-8c56-6383ac76f0bc', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', 1, 1, 28000.000, 37481.240, '2021-08-04');
INSERT INTO `invest_moneyflowing` VALUES ('70055420-8d45-11ec-8c56-6383ac76f0bc', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', 1, 0, 10014.700, 27466.540, '2021-09-10');
INSERT INTO `invest_moneyflowing` VALUES ('7dfb3e00-8d45-11ec-8c56-6383ac76f0bc', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', 1, 1, 85000.000, 112466.540, '2021-11-18');
INSERT INTO `invest_moneyflowing` VALUES ('8698e670-8d45-11ec-8c56-6383ac76f0bc', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', 1, 1, 2000.000, 114466.540, '2022-01-18');
INSERT INTO `invest_moneyflowing` VALUES ('89c0da40-8ecd-11ec-b406-f38c6b715ebf', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', 1, 1, 30000.000, 144466.540, '2022-02-16');
INSERT INTO `invest_moneyflowing` VALUES ('a8c1b550-811b-11ec-b329-59888a27188f', 'c362d810-79b1-11ec-877a-b30fb9b4ce28', 1, 1, 100000.000, 100000.000, '2022-01-29');
INSERT INTO `invest_moneyflowing` VALUES ('d8066d50-811c-11ec-b329-59888a27188f', 'c362d810-79b1-11ec-877a-b30fb9b4ce28', 1, 0, 5000.000, 95000.000, '2022-01-30');
INSERT INTO `invest_moneyflowing` VALUES ('e62710b0-811c-11ec-b329-59888a27188f', 'c362d810-79b1-11ec-877a-b30fb9b4ce28', 2, 1, 12000.000, 12000.000, '2022-01-30');
INSERT INTO `invest_moneyflowing` VALUES ('f957a2d0-955d-11ec-a4ef-8b0c17022404', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', 1, 1, 10000.000, 154466.540, '2022-02-22');

-- ----------------------------
-- Table structure for invest_record
-- ----------------------------
DROP TABLE IF EXISTS `invest_record`;
CREATE TABLE `invest_record`  (
  `id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '操作主键',
  `date` date NOT NULL COMMENT '成交时间',
  `investOpt` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '操作类型：0-买入；1-加仓；2-减仓；3-清仓',
  `investCost` double(13, 3) NOT NULL COMMENT '成交价格',
  `investNum` int(64) NOT NULL COMMENT '成交数量',
  `latestCost` double(13, 3) NOT NULL COMMENT '成交后成本',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of invest_record
-- ----------------------------
INSERT INTO `invest_record` VALUES ('07921530-8d5a-11ec-8c56-6383ac76f0bc', '2021-12-15', '1', 2.870, 1800, 2.770);
INSERT INTO `invest_record` VALUES ('0c466060-8d58-11ec-8c56-6383ac76f0bc', '2021-12-22', '1', 2.820, 900, 2.828);
INSERT INTO `invest_record` VALUES ('154c35f0-8d57-11ec-8c56-6383ac76f0bc', '2022-02-11', '1', 4.920, 2500, 5.214);
INSERT INTO `invest_record` VALUES ('17bda3c0-8d5a-11ec-8c56-6383ac76f0bc', '2021-12-17', '2', 3.050, 1800, 2.490);
INSERT INTO `invest_record` VALUES ('1facf5b0-8d58-11ec-8c56-6383ac76f0bc', '2021-12-31', '1', 2.760, 2500, 2.804);
INSERT INTO `invest_record` VALUES ('249d8560-8d3c-11ec-b769-a5950aa661da', '2022-02-05', '2', 3.000, 5000, 1.000);
INSERT INTO `invest_record` VALUES ('25ca94e0-8d56-11ec-8c56-6383ac76f0bc', '2021-09-07', '0', 1.960, 10000, 1.960);
INSERT INTO `invest_record` VALUES ('2898c8b0-8d59-11ec-8c56-6383ac76f0bc', '2021-12-22', '0', 2.190, 5800, 2.190);
INSERT INTO `invest_record` VALUES ('2b9f0e60-8d5a-11ec-8c56-6383ac76f0bc', '2021-12-20', '1', 2.910, 2800, 2.746);
INSERT INTO `invest_record` VALUES ('37be8a90-8d5a-11ec-8c56-6383ac76f0bc', '2021-12-31', '2', 3.190, 2200, 2.338);
INSERT INTO `invest_record` VALUES ('3ac5fb00-8d56-11ec-8c56-6383ac76f0bc', '2021-12-15', '2', 2.060, 7500, 1.660);
INSERT INTO `invest_record` VALUES ('3bb0c8d0-8d59-11ec-8c56-6383ac76f0bc', '2021-12-22', '1', 2.130, 4200, 2.165);
INSERT INTO `invest_record` VALUES ('430ad840-8d5a-11ec-8c56-6383ac76f0bc', '2022-01-04', '1', 3.060, 600, 2.483);
INSERT INTO `invest_record` VALUES ('46350b90-8d59-11ec-8c56-6383ac76f0bc', '2022-01-20', '2', 2.330, 10000, 0.000);
INSERT INTO `invest_record` VALUES ('4d90ec90-8d56-11ec-8c56-6383ac76f0bc', '2021-12-17', '2', 2.090, 2500, 0.000);
INSERT INTO `invest_record` VALUES ('5057ff00-8d5a-11ec-8c56-6383ac76f0bc', '2022-01-10', '1', 2.850, 3000, 2.666);
INSERT INTO `invest_record` VALUES ('55a296c0-8d58-11ec-8c56-6383ac76f0bc', '2022-02-10', '2', 2.980, 7200, 0.000);
INSERT INTO `invest_record` VALUES ('64c9df40-8d59-11ec-8c56-6383ac76f0bc', '2021-12-22', '0', 2.850, 10000, 2.850);
INSERT INTO `invest_record` VALUES ('65dbd660-8d57-11ec-8c56-6383ac76f0bc', '2021-09-23', '0', 2.040, 5100, 2.040);
INSERT INTO `invest_record` VALUES ('6b869180-8d3f-11ec-8681-37c5fb39410b', '2022-02-04', '0', 2.000, 10000, 2.000);
INSERT INTO `invest_record` VALUES ('730313b0-8d59-11ec-8c56-6383ac76f0bc', '2022-02-09', '2', 3.000, 10000, 0.000);
INSERT INTO `invest_record` VALUES ('740547d0-8d61-11ec-b459-41cebc5fb334', '2022-02-14', '1', 2.760, 4000, 2.704);
INSERT INTO `invest_record` VALUES ('76f28840-8d57-11ec-8c56-6383ac76f0bc', '2021-12-22', '2', 2.490, 5100, 0.000);
INSERT INTO `invest_record` VALUES ('7b97e9e0-8d56-11ec-8c56-6383ac76f0bc', '2021-09-08', '0', 2.950, 7200, 2.950);
INSERT INTO `invest_record` VALUES ('8d0dabb0-8d56-11ec-8c56-6383ac76f0bc', '2021-09-10', '2', 3.080, 7200, 0.000);
INSERT INTO `invest_record` VALUES ('92bf9b50-8d55-11ec-8c56-6383ac76f0bc', '2021-09-01', '0', 1.860, 10000, 1.860);
INSERT INTO `invest_record` VALUES ('95ee7670-8d3c-11ec-b769-a5950aa661da', '2022-02-08', '2', 4.000, 5000, 0.000);
INSERT INTO `invest_record` VALUES ('a073b9e0-8d58-11ec-8c56-6383ac76f0bc', '2021-12-20', '0', 4.090, 2000, 4.090);
INSERT INTO `invest_record` VALUES ('a5dd7040-8ef4-11ec-bf24-cb62b9f0aa7e', '2022-02-16', '0', 2.780, 5000, 2.780);
INSERT INTO `invest_record` VALUES ('a8473ff0-7b4e-11ec-a9d1-7730d6510543', '2022-01-07', '2', 2.850, 10000, 0.000);
INSERT INTO `invest_record` VALUES ('ab9ccf80-8d55-11ec-8c56-6383ac76f0bc', '2021-09-06', '2', 1.920, 10000, 0.000);
INSERT INTO `invest_record` VALUES ('ac7c2ba0-8d58-11ec-8c56-6383ac76f0bc', '2022-01-07', '2', 4.150, 2000, 0.000);
INSERT INTO `invest_record` VALUES ('ad8c7510-8d56-11ec-8c56-6383ac76f0bc', '2021-09-13', '0', 1.800, 10000, 1.800);
INSERT INTO `invest_record` VALUES ('b0ea65c0-8d59-11ec-8c56-6383ac76f0bc', '2020-10-21', '0', 6.672, 1400, 6.672);
INSERT INTO `invest_record` VALUES ('b32b1df0-8ecd-11ec-b406-f38c6b715ebf', '2022-02-16', '0', 1.710, 10000, 1.710);
INSERT INTO `invest_record` VALUES ('b5cc77b0-8d57-11ec-8c56-6383ac76f0bc', '2021-12-03', '0', 2.760, 1900, 2.760);
INSERT INTO `invest_record` VALUES ('ba5a5250-8d59-11ec-8c56-6383ac76f0bc', '2022-02-11', '2', 5.870, 1400, 0.000);
INSERT INTO `invest_record` VALUES ('bcd544c0-8d56-11ec-8c56-6383ac76f0bc', '2021-09-16', '2', 1.900, 10000, 0.000);
INSERT INTO `invest_record` VALUES ('cb92ba90-953c-11ec-a4ef-8b0c17022404', '2022-02-22', '0', 3.620, 4000, 3.620);
INSERT INTO `invest_record` VALUES ('cba43410-8d57-11ec-8c56-6383ac76f0bc', '2021-12-20', '2', 2.780, 1900, 0.000);
INSERT INTO `invest_record` VALUES ('d6e3bb10-8d58-11ec-8c56-6383ac76f0bc', '2022-01-20', '0', 2.270, 10000, 2.270);
INSERT INTO `invest_record` VALUES ('e6c1a510-8ee8-11ec-ad8b-37d77df37e4e', '2022-02-16', '0', 2.890, 5000, 2.890);
INSERT INTO `invest_record` VALUES ('ed3569c0-8d55-11ec-8c56-6383ac76f0bc', '2021-09-07', '0', 1.730, 10000, 1.730);
INSERT INTO `invest_record` VALUES ('ee6bd170-8d56-11ec-8c56-6383ac76f0bc', '2021-09-16', '0', 5.410, 4200, 5.410);
INSERT INTO `invest_record` VALUES ('efa2a2c0-8d61-11ec-b459-41cebc5fb334', '2022-02-14', '0', 2.220, 5000, 2.220);
INSERT INTO `invest_record` VALUES ('f07826c0-8d57-11ec-8c56-6383ac76f0bc', '2021-12-17', '0', 2.720, 1900, 2.720);
INSERT INTO `invest_record` VALUES ('f58ce4a0-8d59-11ec-8c56-6383ac76f0bc', '2021-12-03', '0', 2.670, 1800, 2.670);
INSERT INTO `invest_record` VALUES ('fa491480-8d56-11ec-8c56-6383ac76f0bc', '2021-12-20', '1', 5.100, 800, 5.360);
INSERT INTO `invest_record` VALUES ('fca5b740-8d58-11ec-8c56-6383ac76f0bc', '2022-02-14', '1', 2.170, 2500, 2.250);
INSERT INTO `invest_record` VALUES ('fdc5ad90-8d55-11ec-8c56-6383ac76f0bc', '2021-09-08', '2', 1.840, 10000, 0.000);
INSERT INTO `invest_record` VALUES ('ff8e26a0-8d57-11ec-8c56-6383ac76f0bc', '2021-12-21', '1', 2.940, 1900, 2.830);

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
-- Records of invest_usercount
-- ----------------------------
INSERT INTO `invest_usercount` VALUES ('a0a85810-811b-11ec-b329-59888a27188f', 'c362d810-79b1-11ec-877a-b30fb9b4ce28', 95000.000, 12000);
INSERT INTO `invest_usercount` VALUES ('f0dd2c60-8a31-11ec-9237-1f1428622ccb', '8200cf50-78ce-11ec-a8a0-ed6c3ba62da6', 154466.540, 0);

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
INSERT INTO `sys_user` VALUES ('c362d810-79b1-11ec-877a-b30fb9b4ce28', 'admin', 'MjEyMzJmMjk3YTU3YTVhNzQzODk0YTBlNGE4MDFmYzM=', 'admin');

SET FOREIGN_KEY_CHECKS = 1;
