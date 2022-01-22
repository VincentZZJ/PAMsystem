/*
 * @Author: Vincent
 * @Date: 2022-01-22 15:02:50
 * @LastEditTime: 2022-01-22 16:37:30
 * @LastEditors: Vincent
 * @Description:
 */

import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Input, Radio, message, Select } from 'antd';
import { formatMoney } from '@/utils/utils';
import { InvestType } from '@/utils/constant';
import { PlusOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import {
  addMoneyFlowing,
  getUserCountInfoById,
  getMoneyFlowingList,
} from '@/services/pamsystem/investmng';
import styles from './index.less';

const { Option } = Select;

const Page = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isRefresh, setIsRefresh] = useState('');
  const [investType, setInvestType] = useState('');
  const [pagination, setPagination] = useState({ pageSize: 10, currentPage: 1 });
  const [recordsTotal, setRecordsTotal] = useState(0);
  const [moneyFlowingList, setMoneyFlowingList] = useState([]);
  const [userCountInfo, setUserCountInfo] = useState({});
  const [restMoney, setRestMoney] = useState(0);
  const { initialState } = useModel('@@initialState');
  const [addForm] = Form.useForm();

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => index + 1,
    },
    {
      title: '账户类型',
      dataIndex: 'investType',
      render: (text) => (text ? `${InvestType[text]}账户` : '/'),
    },
    {
      title: '银证转账',
      dataIndex: 'moneyOpt',
      render: (text) => (text === '1' ? '转入' : '转出'),
    },
    {
      title: '金额(元)',
      dataIndex: 'money',
      render: (text) => formatMoney(text, 2),
    },
    {
      title: '账户余额(元)',
      dataIndex: 'restMoney',
      render: (text) => formatMoney(text, 2),
    },
  ];

  //   表单提交
  const onFinish = async (values) => {
    try {
      const result = await addMoneyFlowing(values);
      if (result && result.code === '0') {
        message.success('操作成功');
        setIsRefresh(new Date().valueOf());
        setModalVisible(false);
      } else {
        message.error(result?.desc ?? '新增失败，请联系运维人员');
      }
    } catch (e) {
      console.log(e);
      message.error('新增失败，请联系运维人员');
    }
  };

  //   切换页数
  const handleTableChange = ({ current, pageSize }) => {
    setPagination({ currentPage: current, pageSize: pageSize });
  };

  //   账号切换
  const handleCountChange = (e) => {
    const val = e.target.value;
    if (userCountInfo?.id) {
      setRestMoney(val === '1' ? userCountInfo.stockCount : userCountInfo.fundCount);
    }
  };

  useEffect(() => {
    //   获取资金流水
    const fetchMoneyFlowingList = async (data) => {
      try {
        const result = await getMoneyFlowingList(data);
        let list = [];
        let total = 0;
        if (result && result.code === '0' && result.msg) {
          list = result.msg.rows;
          total = result.msg.count;
        }
        setRecordsTotal(total);
        setMoneyFlowingList(list);
      } catch (e) {
        console.log(e);
        message.error('获取失败,请联系运维人员');
      }
    };
    // 获取用户资金情况
    const fetchUserCountInfo = async (id) => {
      try {
        const result = await getUserCountInfoById(id);
        let userCountInfo = {};
        if (result && result.code === '0' && result.msg) {
          userCountInfo = result.msg;
        }
        setUserCountInfo(userCountInfo);
      } catch (e) {
        console.log(e);
      }
    };
    if (initialState?.currentUser?.userId) {
      fetchMoneyFlowingList({ ...pagination, investType });
      fetchUserCountInfo(initialState.currentUser.userId);
    }
  }, [isRefresh, pagination, investType, initialState]);

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <div className={styles.headTitle}>资金流水</div>
        <div>
          <Select value={investType} onSelect={(val) => setInvestType(val)}>
            <Option value="">资金账户(全部)</Option>
            <Option value="1">股票账户</Option>
            <Option value="2">基金账户</Option>
          </Select>
          <Button type="primary" onClick={() => setModalVisible(true)}>
            <PlusOutlined />
            银证转账
          </Button>
        </div>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={moneyFlowingList}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: false,
            total: recordsTotal,
            current: pagination.currentPage,
            showTotal: () => (
              <span>
                共{recordsTotal}条记录,第{pagination.currentPage}/
                {Math.ceil(recordsTotal / pagination.pageSize)}页
              </span>
            ),
          }}
          onChange={handleTableChange}
          scroll={{ y: 700 }}
        />
      </div>
      {modalVisible ? (
        <Modal
          title="银证转账"
          visible={modalVisible}
          centered
          destroyOnClose
          footer={false}
          onCancel={() => setModalVisible(false)}
        >
          <Form layout="horizontal" labelCol={{ span: 5 }} form={addForm} onFinish={onFinish}>
            <Form.Item label="资金账号">
              <Form.Item name="investType" noStyle initialValue="1">
                <Radio.Group onChange={handleCountChange}>
                  <Radio.Button value="1">股票账号</Radio.Button>
                  <Radio.Button value="0">基金账号</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <span style={{ marginLeft: '0.4rem' }}>(当前余额：{formatMoney(restMoney, 2)})</span>
            </Form.Item>
            <Form.Item name="moneyOpt" label="银证转账" initialValue="1">
              <Radio.Group>
                <Radio.Button value="1">转入</Radio.Button>
                <Radio.Button value="0">转出</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="money" label="金额">
              <Input placeholder="输入金额" suffix="元" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                确认
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      ) : null}
    </div>
  );
};

export default Page;
