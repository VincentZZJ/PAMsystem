/*
 * @Author: Vincent
 * @Date: 2022-02-10 15:28:06
 * @LastEditTime: 2022-09-13 15:19:18
 * @LastEditors: Vincent
 * @Description:
 */
const {
  getDiaryByOptionsModel,
  getAttachmentListByDiaryIdModel,
  deleteDiaryByIdModel,
  saveDiaryInfoModel,
  getDiaryStatByMonth,
  saveFileToDiaryModel,
  delFileByIdModel,
  updateDiaryInfoModel,
} = require('../models/diaryModel');
const {
  updateFileInfoModel,
  getFileListByBusinessId,
  resetBusinessIdModel,
} = require('../models/commonModel');
const { setResponseBody } = require('../utils/utils');
const fsPromise = require('fs').promises;
const UUID = require('node-uuid');
const path = require('path');

/**
 * @description: 根据条件获取日记记录
 * @param {*} ctx
 * @return {*}
 */
const getDiaryByOptionsCtrl = async (ctx) => {
  const { userId, date, month } = ctx.request.query;
  try {
    //   获取日记对象
    const diaryRes = await getDiaryByOptionsModel({
      userId,
      date,
    });
    const result = {
      diary: diaryRes,
      attachment: [],
      diaryStat: [],
    };
    // 根据日记id，获取相应附件
    if (diaryRes && diaryRes.id) {
      const attachRes = await getFileListByBusinessId({
        businessId: diaryRes.id,
      });
      result.attachment = attachRes || [];
    }
    // 获取当月日记录入情况
    const statRes = await getDiaryStatByMonth({
      userId,
      month,
    });
    result.diaryStat = statRes[0] || [];
    ctx.body = setResponseBody(result);
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

/**
 * @description: 根据id删除日记记录及取消附件关联
 * @param {*} ctx
 * @return {*}
 */
const deleteDiaryByIdCtrl = async (ctx) => {
  const { id } = ctx.request.query;
  try {
    const result = await deleteDiaryByIdModel(id);
    ctx.body = setResponseBody();
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

/**
 * @description: 保存日记
 * @param {*} ctx
 * @return {*}
 */
const saveDiaryInfoCtrl = async (ctx) => {
  try {
    const { fileList = [], ...rest } = ctx.request.body;
    const userId = ctx.cookies.get('userId');
    const diaryId = UUID.v1();
    const result = await saveDiaryInfoModel({ ...rest, id: diaryId, userId });
    if (fileList.length > 0) {
      fileList.forEach(async (item) => {
        await updateFileInfoModel({ ...item, businessId: diaryId });
      });
    }
    if (result) {
      ctx.body = setResponseBody();
    } else {
      ctx.body = setResponseBody({}, '-1', '保存失败');
    }
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

/**
 * @description: 保存日记
 * @param {*} ctx
 * @return {*}
 */
const updateiaryInfoCtrl = async (ctx) => {
  try {
    const { fileList, id, ...rest } = ctx.request.body;
    const result = await updateDiaryInfoModel({ ...rest, id });
    await resetBusinessIdModel({ id });
    if (fileList.length > 0) {
      fileList.forEach(async (item) => {
        await updateFileInfoModel({ ...item, businessId: id });
      });
    }
    if (result) {
      ctx.body = setResponseBody();
    } else {
      ctx.body = setResponseBody({}, '-1', '保存失败');
    }
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

/**
 * @description: 文件上传(图片)
 * @param {*} ctx
 * @return {*}
 */
const uploadFileCtrl = async (ctx) => {
  const { phone, diaryId } = ctx.request.body;
  const { file } = ctx.request;
  try {
    const newPath = path.join(__dirname, `../statics/databackup/pamid_${phone}/files`);
    const serverUrl = `/photo/pamid_${phone}/files/${file.filename}`;
    let isSave = false;
    await fsPromise
      .access(newPath)
      .then(async () => {
        isSave = true;
        await fsPromise.rename(file.path, `${newPath}/${file.filename}`);
      })
      .catch(async (err) => {
        await fsPromise.mkdir(newPath);
        isSave = true;
        await fsPromise.rename(file.path, `${newPath}/${file.filename}`);
      });
    const data = {
      diaryId,
      fileUrl: serverUrl,
      filePath: newPath,
    };
    isSave = await saveFileToDiaryModel(data);
    if (isSave) {
      ctx.body = setResponseBody(serverUrl);
    } else {
      ctx.body = setResponseBody({}, '-1', '上传失败');
    }
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

/**
 * @description: 根据文件id删除
 * @param {*} ctx
 * @return {*}
 */
const delFileByIdCtrl = async (ctx) => {
  const { id } = ctx.request.query;
  try {
    const isDel = await delFileByIdModel(id);
    if (isDel) {
      ctx.body = setResponseBody();
    } else {
      ctx.body = setResponseBody({}, '-1', '删除失败');
    }
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

module.exports = {
  getDiaryByOptionsCtrl,
  deleteDiaryByIdCtrl,
  saveDiaryInfoCtrl,
  uploadFileCtrl,
  delFileByIdCtrl,
  updateiaryInfoCtrl,
};
