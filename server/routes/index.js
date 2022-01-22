/*
 * @Author: Vincent
 * @Date: 2021-12-07 14:12:16
 * @LastEditTime: 2022-01-22 17:00:04
 * @LastEditors: Vincent
 * @Description: 接口映射
 */
// import userCtrl from '../controllers/userCtrl';

// 实例化路由
const router = require('koa-router')();
const userCtrl = require('../controllers/userCtrl');
const investCtrl = require('../controllers/investCtrl');

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
router.get('/investmng/addmoneyflowing', investCtrl.addMoneyFlowingCtrl);

module.exports = router;
