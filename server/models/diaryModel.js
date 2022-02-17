/*
 * @Author: Vincent
 * @Date: 2022-02-12 15:06:26
 * @LastEditTime: 2022-02-16 14:52:55
 * @LastEditors: Vincent
 * @Description:
 */

const { Mysql, PamDatabase } = require('../config/mysql');
const sequelize = require('sequelize');
const DiaryList = Mysql.diary_list;
const AttachmentList = Mysql.attachment_list;

/**
 * @description: 根据条件获取日记记录
 * @param {*} data
 * @return {*}
 */
const getDiaryByOptionsModel = async (data) => {
  const { userId, date } = data;
  const diaryInfo = await DiaryList.findOne({
    where: {
      userId,
      date,
      isDel: 0,
    },
  });
  return diaryInfo;
};

/**
 * @description: 获取当月日记录入情况
 * @param {*}
 * @return {*}
 */
const getDiaryStatByMonth = async (data) => {
  const { userId, month } = data;
  const diaryStat = await PamDatabase.query(
    `select date,diaryTitle from diary_list where userId = '${userId}' AND DATE_FORMAT(date,'%Y-%m') = '${month}'`,
  );
  return diaryStat;
};

/**
 * @description: 根据日记id获取附件信息
 * @param {*} data
 * @return {*}
 */
const getAttachmentListByDiaryIdModel = async (data) => {
  const { diaryId } = data;
  const attachments = await AttachmentList.findAll({
    where: {
      diaryId,
      isDel: 0,
    },
  });
  return attachments;
};

/**
 * @description: 根据id删除日记记录及取消附件关联
 * @param {*} id
 * @return {*}
 */
const deleteDiaryByIdModel = async (id) => {
  await DiaryList.update(
    {
      isDel: 1,
    },
    {
      where: {
        id: id,
      },
    },
  );
  await AttachmentList.update(
    {
      isDel: 1,
    },
    {
      where: {
        diaryId: id,
      },
    },
  );
  return true;
};

const saveDiaryInfoModel = async (data) => {
  const { id, diaryTitle, diaryContent, date, userId } = data;
  const hasDiary = await DiaryList.findOne({
    where: {
      id: id,
    },
  });
  if (hasDiary) {
    //   存在则更新
    await DiaryList.update(
      {
        diaryTitle,
        diaryContent,
      },
      {
        where: {
          id: id,
        },
      },
    );
  } else {
    //   不存在则新建
    await DiaryList.create({
      id,
      diaryTitle,
      diaryContent,
      userId,
      date,
    });
  }
  return true;
};

module.exports = {
  getDiaryByOptionsModel,
  getAttachmentListByDiaryIdModel,
  deleteDiaryByIdModel,
  saveDiaryInfoModel,
  getDiaryStatByMonth,
};
