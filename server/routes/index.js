/*
 * @Author: Vincent
 * @Date: 2021-12-07 14:12:16
 * @LastEditTime: 2021-12-21 15:39:52
 * @LastEditors: Vincent
 * @Description: 接口映射
 */
// import userCtrl from '../controllers/userCtrl';

// 实例化路由
const router = require('koa-router')();
const userCtrl = require('../controllers/userCtrl');

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

module.exports = router;
