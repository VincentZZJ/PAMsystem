/*
 * @Author: Vincent
 * @Date: 2022-02-11 10:23:48
 * @LastEditTime: 2022-04-06 15:57:32
 * @LastEditors: Vincent
 * @Description:
 */
import React, { useEffect, useState } from 'react';
import PageWrapper from '@/components/PageWrapper';
import {
  Button,
  Calendar,
  Empty,
  Image,
  Tooltip,
  Popconfirm,
  Form,
  Input,
  message,
  Upload,
  Modal,
} from 'antd';
import moment from 'moment';
import { useModel } from 'umi';
import { FormOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  getDiaryByOptionsService,
  deleteDiaryByIdService,
  saveDiaryInfoService,
  deleteAttachmentByIdService,
} from '@/services/pamsystem/diarymng';
import _ from 'lodash';
import IconFont from '@/components/IconFont';
import { shortLongText, getBase64 } from '@/utils/utils';
import styles from './index.less';

const { TextArea } = Input;

const Page = () => {
  const [curSelectedDate, setCurSelectedDate] = useState(moment());
  const [attachmentList, setAttachmentList] = useState([]);
  const [diaryInfo, setDiaryInfo] = useState({});
  const [showEditPage, setShowEditPage] = useState(false);
  const [isRefresh, setIsRefresh] = useState('');
  const [monthData, setMonthData] = useState([]);
  const { initialState } = useModel('@@initialState');
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewInfo, setPreviewInfo] = useState({});
  const [diaryForm] = Form.useForm();

  // 选择日期
  const handleCalendarSelect = (val) => {
    setCurSelectedDate(moment(val));
  };

  // 删除日记
  const handleDeleteDiary = async () => {
    if (diaryInfo?.id) {
      try {
        const result = await deleteDiaryByIdService(diaryInfo.id);
        if (result && result.code === '0') {
          message.success('删除成功');
          setIsRefresh(new Date().valueOf());
          setDiaryInfo({});
        } else {
          message.warning(result?.desc || '删除失败！');
        }
      } catch (e) {
        console.log(e);
        message.error('服务出错，请联系运维人员！');
      }
    } else {
      message.warning('该日期没有日记记录！');
    }
  };

  // 保存日记
  const handleDiarySave = async () => {
    const fieldValues = diaryForm.getFieldsValue();
    const { diaryTitle, diaryContent } = fieldValues;
    if (diaryTitle === '' || diaryContent === '') {
      message.warning('标题或内容不能为空！');
      return;
    }
    const userId = initialState.currentUser.userId;
    const params = {
      diaryTitle,
      diaryContent,
      userId,
      date: curSelectedDate.format('YYYY-MM-DD'),
    };
    const diaryId = diaryInfo?.id || createDiaryId();
    try {
      const result = await saveDiaryInfoService({ ...params, id: diaryId });
      if (result && result.code === '0') {
        message.success('保存成功');
        setShowEditPage(false);
        setIsRefresh(new Date().valueOf());
      } else {
        message.warning(result?.desc || '服务出错，请联系运维人员');
      }
    } catch (e) {
      message.error('服务出错');
    }
  };

  // 新生成日记id（userId后8位拼接当日时间戳前8位）
  const createDiaryId = () => {
    const userId = initialState.currentUser.userId;
    const t = curSelectedDate.startOf('day').valueOf().toString();
    return `${userId.substring(0, userId.length - 8)}${t.substring(0, 8)}`;
  };

  // 新增或修改日记
  const handleShowEdit = () => {
    setShowEditPage(true);
    const list = [];
    if (attachmentList?.length > 0) {
      attachmentList.forEach((item) => {
        list.push({
          ...item,
          uuid: item.id,
          status: 'done',
          url: item.fileUrl,
        });
      });
    }
    setFileList(list);
    diaryForm.resetFields();
    diaryForm.setFieldsValue(diaryInfo ?? {});
  };

  // 渲染日期框
  const renderDateCellCmp = (date) => {
    let info = '';
    let dom = null;
    if (curSelectedDate.month() === date.month() && moment().valueOf() >= date.valueOf()) {
      monthData.forEach((item) => {
        if (item.date === date.format('YYYY-MM-DD')) {
          info = item.diaryTitle;
        }
      });
      dom = (
        <div style={{ textAlign: 'center' }}>
          <Tooltip title={info ? `标题：${info}` : ''} placement="top">
            <IconFont
              type={info ? 'icon-yiwancheng' : 'icon-weiwancheng'}
              style={{ color: `${info ? 'green' : 'red'}`, fontSize: '4rem' }}
            />
          </Tooltip>
        </div>
      );
    }
    return dom;
  };

  // 更新图片列表
  const handleChange = ({ fileList }) => setFileList(fileList);

  // 图片预览
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewVisible(true);
    setPreviewInfo({
      previewImage: file.url || file.preview,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  // 图片移除
  const handleRemove = async (file) => {
    const { uuid } = file;
    try {
      const res = await deleteAttachmentByIdService(uuid);
      if (res && res.code === '0') {
        message.success('删除成功');
      } else {
        message.warning(res?.desc || '删除失败');
        return false;
      }
    } catch (e) {
      console.log(e);
      message.error('服务出错');
    }
  };

  useEffect(() => {
    // 日期发生变化后查询
    const fetchDiaryByDate = async (data) => {
      try {
        const result = await getDiaryByOptionsService(data);
        let _diaryInfo = {},
          attachments = [],
          _monthData = [];
        if (result && result.code === '0') {
          const { diary = {}, attachment = [], diaryStat = [] } = result.msg;
          _diaryInfo = _.clone(diary);
          attachments = attachment;
          _monthData = diaryStat;
        } else {
          message.warning(result?.desc || '获取失败');
        }
        // const buf = new Uint8Array(_diaryInfo.diaryContent.data);
        // const blob = new Blob([buf]);
        // var reader = new FileReader();
        // reader.readAsText(blob, 'utf-8');
        // reader.onload = function (e) {
        //   alert(reader.result); //a Hello world!
        // };
        setDiaryInfo(_diaryInfo);
        setAttachmentList(attachments);
        setMonthData(_monthData);
      } catch (e) {
        console.log(e);
        message.error('服务出错，请联系运维人员');
      }
    };
    if (initialState?.currentUser?.userId) {
      fetchDiaryByDate({
        date: curSelectedDate.format('YYYY-MM-DD'),
        month: curSelectedDate.format('YYYY-MM'),
        userId: initialState.currentUser.userId,
      });
    }
  }, [curSelectedDate, initialState, isRefresh]);

  return (
    <PageWrapper
      pageTitleCmp={
        showEditPage ? `日记新增/修改 - ${curSelectedDate.format('YYYY-MM-DD')}` : '日记管理'
      }
      pageTitleExtraCmp={
        showEditPage ? (
          <>
            <Button type="primary" onClick={handleDiarySave}>
              保存
            </Button>
            <Button
              type="primary"
              style={{ marginLeft: '0.2rem' }}
              onClick={() => setShowEditPage(false)}
            >
              返回
            </Button>
          </>
        ) : null
      }
    >
      {!showEditPage ? (
        <div className={styles.contentWrap}>
          <div className={styles.contentTop}>
            <div>
              <Calendar
                value={curSelectedDate}
                onSelect={handleCalendarSelect}
                dateCellRender={renderDateCellCmp}
              />
            </div>
            <div>
              <div className={styles.rightTop}>
                <div>{curSelectedDate.format('YYYY-MM-DD')}</div>
                <div>
                  <span onClick={handleShowEdit}>
                    <Tooltip title="新增/修改" placement="top">
                      <FormOutlined style={{ color: '#1890ff' }} />
                    </Tooltip>
                  </span>
                  {diaryInfo?.id ? (
                    <span>
                      <Popconfirm
                        title="确定删除该日记？"
                        onConfirm={handleDeleteDiary}
                        placement="left"
                      >
                        <Tooltip title="删除" placement="top">
                          <DeleteOutlined style={{ color: '#ff4d4f' }} />
                        </Tooltip>
                      </Popconfirm>
                    </span>
                  ) : null}
                </div>
              </div>
              <div>
                {diaryInfo?.id ? (
                  <>
                    <div className={styles.detailTitle}>标题：{diaryInfo.diaryTitle}</div>
                    <div className={styles.detailTitle}>内容梗概：</div>
                    <div>{shortLongText(diaryInfo.diaryContent, 700)}</div>
                  </>
                ) : (
                  <Empty description="暂无内容" />
                )}
              </div>
            </div>
          </div>
          <div className={styles.contentBtm}>
            {attachmentList.length > 0 ? (
              <Image.PreviewGroup>
                {attachmentList.map((item) => (
                  <Image className={styles.imageCls} src={item.fileUrl} />
                ))}
              </Image.PreviewGroup>
            ) : (
              <Empty description="暂无上传图片" />
            )}
          </div>
        </div>
      ) : (
        <div className={styles.diaryWrap}>
          <div>
            <Form form={diaryForm} layout="vertical" style={{ height: '100%' }}>
              <Form.Item
                label="日记标题"
                name="diaryTitle"
                required
                // initialValue={diaryInfo?.diaryTitle}
              >
                <Input placeholder="请输入日记标题或简介..." />
              </Form.Item>
              <Form.Item
                label="日记内容"
                name="diaryContent"
                required
                // initialValue={diaryInfo?.diaryContent}
              >
                <TextArea placeholder="正文内容" style={{ height: '43rem' }} />
              </Form.Item>
            </Form>
          </div>
          <div>
            <div className={styles.rightTop}>上传附件</div>
            <div>
              <Upload
                accept="image/*"
                action="/pamsystem/uploadFile"
                data={{
                  phone: initialState.currentUser.phone,
                  diaryId: diaryInfo?.id || createDiaryId(),
                }}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={handleRemove}
              >
                <Tooltip title="上传附件" placement="right">
                  <PlusOutlined style={{ fontSize: '3rem' }} />
                </Tooltip>
              </Upload>
            </div>
          </div>
        </div>
      )}
      {previewVisible ? (
        <Modal
          visible={previewVisible}
          title={previewInfo?.previewTitle || '图片预览'}
          footer={null}
          className={styles.modelCls}
          maskClosable={false}
          destroyOnClose
          onCancel={() => {
            setPreviewVisible(false);
            setPreviewInfo({});
          }}
        >
          <img alt="example" style={{ width: '100%' }} src={previewInfo?.previewImage || '#'} />
        </Modal>
      ) : null}
    </PageWrapper>
  );
};

export default Page;
