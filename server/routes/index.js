/*
 * @Author: Vincent
 * @Date: 2021-12-07 14:12:16
 * @LastEditTime: 2021-12-07 17:24:15
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
router.get('/getUserInfo', userCtrl.getUserInfo);

// 新增用户
router.post('/addUser', userCtrl.addUser);

// 根据Id删除用户
router.delete('/delUserById', userCtrl.delUser);

// 根据ID更新用户信息
router.post('/updateUserById', userCtrl.updateUserInfoById);

module.exports = router;
