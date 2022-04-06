/*
 * @Author: Vincent
 * @Date: 2021-12-07 14:12:16
 * @LastEditTime: 2022-04-02 19:08:51
 * @LastEditors: Vincent
 * @Description: 接口映射
 */
// import userCtrl from '../controllers/userCtrl';

// 实例化路由
const router = require('koa-router')();
const multer = require('@koa/multer');
const path = require('path');
const userCtrl = require('../controllers/userCtrl');
const investCtrl = require('../controllers/investCtrl');
const diaryCtrl = require('../controllers/diaryCtrl');
const chatRoomCtrl = require('../controllers/chatRoomCtrl');

// 上传文件存放路径及文件命名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../statics'));
  },
  filename: function (req, file, cb) {
    let fileInfo = file.originalname.split('.');
    cb(null, `${fileInfo[0]}-${Date.now().toString(16)}.${fileInfo[1]}`);
  },
});

const uploader = multer({ storage });

// 定义路由前缀
router.prefix('/pamsystem');

// 业务接口
// 获取用户信息
router.get('/usercenter/getUserInfo', userCtrl.getUserInfoCtrl);

// 新增用户
router.post('/usercenter/register', userCtrl.addUserCtrl);

// 用户登录
router.post('/usercenter/login', userCtrl.userLoginCtrl);

// 根据Id删除用户
router.delete('/usercenter/delUserById', userCtrl.delUserCtrl);

// 根据ID更新用户信息
router.post('/usercenter/updateUserById', userCtrl.updateUserInfoByIdCtrl);

// 增加投资项
router.post('/investmng/addInvest', investCtrl.addInvestItemCtrl);

// 根据查询条件查询所有投资项
router.get('/investmng/getAllInvestByOpts', investCtrl.getInvestListByOptionsCtrl);

// 根据投资项id删除
router.delete('/investmng/deleteInvestItemById', investCtrl.deleteInvestItemByIdCtrl);

// 更新投资项
router.post('/investmng/addInvestRecord', investCtrl.addInvestRecordCtrl);

// 更新现价
router.get('/investmng/getLatestPriceByCode', investCtrl.updateLatestPriceCtrl);

// 获取资金流水列表
router.get('/investmng/getmoneyflowinglist', investCtrl.getMoneyFlowingListCtrl);

// 根据用户id获取资金账户情况
router.get('/investmng/getUserCountById', investCtrl.getUserCountInfoCtrl);

// 新增资金流水信息
router.post('/investmng/addmoneyflowing', investCtrl.addMoneyFlowingCtrl);

// 上传文件接口(接收file命名的字段)
router.post('/uploadFile', uploader.single('file'), diaryCtrl.uploadFileCtrl);

// 根据条件获取日记记录
router.get('/diarymng/getDiaryByOptions', diaryCtrl.getDiaryByOptionsCtrl);

// 根据id删除日记记录及取消附件关联
router.delete('/diarymng/deleteDiaryById', diaryCtrl.deleteDiaryByIdCtrl);

// 保存日记
router.post('/diarymng/saveDiaryInfo', diaryCtrl.saveDiaryInfoCtrl);

// 根据文件id移除文件
router.delete('/diarymng/delAttachmentById', diaryCtrl.delFileByIdCtrl);

// 根据userId查询聊天室列表
router.get('/chatroom/getRoomList', chatRoomCtrl.getRoomListCtrl);

// 根据手机号查询好友
router.get('/chatroom/searchFriend', chatRoomCtrl.searchFriendsCtrl);

// 添加好友
router.post('/chatroom/addFriend', chatRoomCtrl.addFriendCtrl);

module.exports = router;
