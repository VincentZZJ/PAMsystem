/*
 * @Author: Vincent
 * @Date: 2022-08-29 15:41:40
 * @LastEditTime: 2022-10-09 16:43:02
 * @LastEditors: Vincent
 * @Description:
 */
const { setResponseBody } = require('../utils/utils');
const { saveFileInfoModel } = require('../models/commonModel');
const fsPromise = require('fs').promises;
const path = require('path');
const UUID = require('node-uuid');
const Redis = require('koa-redis');

// 新建redis客户端
const Store = new Redis().client;

// 上传文件
const uploadFileCtrl = async (ctx) => {
  const { file } = ctx.request;
  const userId = ctx.cookies.get('userId');
  try {
    if (userId) {
      const userInfo = await Store.get(userId);
      const userInfoObj = JSON.parse(userInfo);
      const filePath = path.join(__dirname, '../statics/files');
      const serverUrl = `/photo/files/${file.filename}`;
      const fileUrl = `${filePath}/${file.filename}`;
      await fsPromise
        .access(filePath)
        .then(async () => {
          await fsPromise.rename(file.path, fileUrl);
        })
        .catch(async () => {
          await fsPromise.mkdir(filePath);
          await fsPromise.rename(file.path, fileUrl);
        });
      // 写入数据库
      const fileId = UUID.v1();
      await saveFileInfoModel({
        id: fileId,
        filePath: fileUrl,
        fileName: file.filename,
        fileType: file.mimetype,
        serverUrl: serverUrl,
        uploader: userInfoObj.username,
      });
      // 返回给前端
      ctx.body = setResponseBody({
        id: fileId,
        fileName: file.filename,
        filePath: serverUrl,
        fileType: file.mimetype,
        uploader: userInfoObj.username,
      });
    } else {
      ctx.body = setResponseBody(e, '-1', '服务出错');
    }
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

module.exports = {
  uploadFileCtrl,
};
