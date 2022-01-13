import React, { useEffect, useState } from 'react';
import {
  Button,
  Table,
  Divider,
  Select,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  message,
} from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.less';
import {
  getInvestListByOptService,
  addInvestService,
  deleteInvestItemService,
} from '@/services/pamsystem/investmng';
import { InvestType, InvestOpt } from '@/utils/constant';

const { MonthPicker } = DatePicker;
const { Option } = Select;

const Page = () => {
  const [pagination, setPagination] = useState({ pageSize: 10, currentPage: 1 });
  const [recordsTotal, setRecordsTotal] = useState(0);
  const [investList, setInvestList] = useState([]);
  const [statInfo, setStatInfo] = useState({});
  const [searchForm] = Form.useForm();
  const [addForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [searchParams, setSearchParams] = useState({});
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [isRefresh, setIsRefresh] = useState('');
  const [curRecord, setCurRecord] = useState({});

  const columns = [
    {
      title: '序号',
      render: (text, record, index) =>
        (pagination.currentPage - 1) * pagination.pageSize + index + 1,
    },
    {
      title: '投资类型',
      dataIndex: 'investType',
      render: (text) => InvestType[text],
    },
    {
      title: '名称',
      dataIndex: 'investName',
    },
    {
      title: '买入时间',
      dataIndex: 'buyTime',
    },
    {
      title: '成本',
      dataIndex: 'buyCost',
    },
    {
      title: '投资金额',
      dataIndex: 'totalMoney',
    },
    {
      title: '卖出时间',
      dataIndex: 'sellTime',
      render: (text) => text || '/',
    },
    {
      title: '卖出价格',
      dataIndex: 'sellCost',
      render: (text) => text || '/',
    },
    {
      title: '盈亏',
      dataIndex: 'profit',
      render: (text) => text || '/',
    },
    {
      title: '盈亏率',
      dataIndex: 'profitRate',
      render: (text) => text || '/',
    },
    {
      title: '操作',
      render: (text, record) => {
        return (
          <>
            <span className="linkCls" onClick={() => handleUpdateOpt(record)}>
              更新
            </span>
            <Divider type="vertical" />
            <span className="linkCls" onClick={() => handleDelInvestItem(record.id)}>
              删除
            </span>
          </>
        );
      },
    },
  ];

  // 渲染展开的dom
  const expandedRowRender = (record) => {
    const columns = [
      { title: '时间', dataIndex: 'date' },
      {
        title: '操作类型',
        dataIndex: 'investOpt',
        render: (text) => (text ? InvestOpt[text] : '/'),
      },
      { title: '成交价格', dataIndex: 'investCost' },
      { title: '成交数量', dataIndex: 'investNum' },
      { title: '成交后成本', dataIndex: 'latestCost' },
    ];
    return <Table pagination={false} columns={columns} dataSource={record?.optHistory ?? []} />;
  };

  // 新增表单
  const addFormFinish = async (val) => {
    const { buyTime } = val;
    const params = { ...val, buyTime: buyTime.format('YYYY-MM-DD') };
    try {
      const response = await addInvestService({ ...params });
      if (response && response.code === '0') {
        message.success('新增成功');
        setAddModalVisible(false);
        setIsRefresh(new Date().valueOf());
      }
    } catch (e) {
      console.log(e);
    }
  };

  //   根据条件搜索
  const onSearchFun = (val) => {
    const params = {};
    Object.keys(val).forEach((item) => {
      if (val[item]) {
        params[item] = val[item];
      }
    });
    setSearchParams(params);
  };

  //   切换页数
  const handleTableChange = ({ current, pageSize }) => {
    setPagination({ currentPage: current, pageSize: pageSize });
  };

  //   表头统计项
  const HeaderTitleData = [
    { name: '盈亏：', value: 'profit' },
    { name: '盈亏率：', value: 'profitRate' },
  ];

  // 当操作交易数量发生变化时，动态计算操作后的数值
  const handleInvestNumChange = (val) => {
    // 操作后的成本、盈亏、总投资
    console.log(val);
  };

  // 进行加/减/清仓操作
  const handleUpdateOpt = (record) => {
    setUpdateModalVisible(true);
    setCurRecord(record);
  };

  // 删除投资项
  const handleDelInvestItem = async (id) => {
    try {
      const response = await deleteInvestItemService(id);
      if (response && response.code === '0') {
        message.success('删除成功！');
        setCurRecord({});
        setIsRefresh(new Date().valueOf());
      } else {
        message.error(response?.desc ?? '删除失败，请联系管理人员！');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchInvestList = async (data) => {
      try {
        const response = await getInvestListByOptService(data);
        let list = [];
        let total = 0;
        if (response && response.code === '0' && response.msg) {
          list = response.msg?.rows ?? [];
          total = response.msg?.count ?? 0;
        }
        setRecordsTotal(total);
        setInvestList(list);
      } catch (e) {
        console.log(e);
      }
    };
    fetchInvestList({ ...searchParams, ...pagination });
  }, [searchParams, pagination, isRefresh]);

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <div>
          {HeaderTitleData.map((item) => (
            <>
              <span className="headTitleName">{item.name}</span>
              <span
                className={`headTitleValue ${statInfo[item.value] > 0 ? 'redCls' : 'greenCls'}`}
              >
                {statInfo[item.value] ?? '00.00'} 元
              </span>
            </>
          ))}
        </div>
        <div>
          <Form layout="inline" form={searchForm} onFinish={onSearchFun}>
            <Form.Item name="investName">
              <Input className="inputWidth" placeholder="请输入投资项名称" />
            </Form.Item>
            <Form.Item name="time">
              <MonthPicker className="inputWidth" />
            </Form.Item>
            <Form.Item name="investType" initialValue="">
              <Select className="inputWidth">
                <Option value="">全部</Option>
                {Object.keys(InvestType).map((item) => (
                  <Option key={item} value={item}>
                    {InvestType[item]}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                <SearchOutlined />
                搜索
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={() => setAddModalVisible(true)}>
                <PlusOutlined />
                新增
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={investList}
          expandable={{
            expandRowByClick: true,
            expandedRowRender,
            rowExpandable: (record) => record?.optHistory?.length > 0,
          }}
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
        />
      </div>
      {addModalVisible ? (
        <Modal
          title="新增投资项"
          visible={addModalVisible}
          destroyOnClose
          maskClosable={false}
          footer={false}
          centered
          onCancel={() => setAddModalVisible(false)}
        >
          <Form layout="vertical" form={addForm} onFinish={addFormFinish}>
            <Form.Item label="投资类型" name="investType" required>
              <Select placeholder="请选择投资类型">
                {Object.keys(InvestType).map((item) => (
                  <Option key={item} value={item}>
                    {InvestType[item]}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="名称" name="investName" required>
              <Input placeholder="请输入名称" />
            </Form.Item>
            <Form.Item label="买入时间" name="buyTime" required>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="买入成本" name="buyCost" required>
              <Input placeholder="买入成本" />
            </Form.Item>
            <Form.Item label="投资金额" name="totalMoney" required>
              <Input placeholder="投资金额" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                确认
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      ) : null}
      {updateModalVisible ? (
        <Modal
          title="交易操作"
          visible={updateModalVisible}
          maskClosable={false}
          destroyOnClose
          footer={false}
          centered
          onCancel={() => setUpdateModalVisible(false)}
        >
          <Form form={updateForm}>
            <div className={styles.beforeOpt}>
              （当前成本：<span>{curRecord?.buyCost ?? '/'}</span>当前总投资：
              <span>{curRecord?.totalMoney ?? '/'}</span>当前盈亏：
              <span>{curRecord?.profit ?? '/'}</span>）
            </div>
            <Form.Item label="交易操作" name="investOpt" required>
              <Radio.Group defaultValue="1">
                {Object.keys(InvestOpt).map((item) => (
                  <Radio.Button value={item}>{InvestOpt[item]}</Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item label="成交时间" name="date" required>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="交易价" name="investCost" required>
              <Input placeholder="(加/减)价位" />
            </Form.Item>
            <Form.Item label="交易量" name="investNum" required>
              <Input
                placeholder="(加/减)多少手 -- 最低100手"
                suffix="手"
                onChange={(val) => handleInvestNumChange(val)}
              />
            </Form.Item>
            <div className={styles.afterOpt}>
              （更新成本：<span></span>更新总投资：<span></span>更新盈亏：<span></span>）
            </div>
            <Form.Item>
              <Button htmlType="submit" type="primary">
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
