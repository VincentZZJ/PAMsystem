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
  Tooltip,
  Popconfirm,
  Popover,
} from 'antd';
import { SearchOutlined, PlusOutlined, InfoCircleOutlined, SyncOutlined } from '@ant-design/icons';
import styles from './index.less';
import {
  getInvestListByOptService,
  addInvestService,
  deleteInvestItemService,
  updateInvestService,
  updatePriceByCodeService,
} from '@/services/pamsystem/investmng';
import IconFont from '@/components/IconFont';
import { useModel, history } from 'umi';
import { InvestType, InvestOpt } from '@/utils/constant';
import { formatMoney } from '@/utils/utils';

const { MonthPicker } = DatePicker;
const { Option } = Select;

const Page = () => {
  const [pagination, setPagination] = useState({ pageSize: 10, currentPage: 1 });
  const [recordsTotal, setRecordsTotal] = useState(0);
  const [investList, setInvestList] = useState([]);
  const [statInfo, setStatInfo] = useState({});
  const [latestInfo, setLatestInfo] = useState({});
  const [searchForm] = Form.useForm();
  const [addForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [searchParams, setSearchParams] = useState({});
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [isRefresh, setIsRefresh] = useState('');
  const [curRecord, setCurRecord] = useState({});
  const { initialState } = useModel('@@initialState');

  const columns = [
    {
      title: '序号',
      width: '4%',
      render: (text, record, index) =>
        (pagination.currentPage - 1) * pagination.pageSize + index + 1,
    },
    {
      title: '状态',
      width: '6%',
      dataIndex: 'status',
      render: (text) => (
        <span className={`statusTag ${text ? 'isDoingCls' : 'isDoneCls'}`}>
          {text ? '进行中' : '已结束'}
        </span>
      ),
    },
    {
      title: '投资类型',
      width: '6%',
      dataIndex: 'investType',
      render: (text) => InvestType[text],
    },
    {
      title: '名称',
      dataIndex: 'investName',
      render: (text, record) => `${text}(${record?.code})`,
    },
    {
      title: '买入时间',
      width: '7%',
      dataIndex: 'buyTime',
    },
    {
      title: '买入价格(元)',
      dataIndex: 'buyPrice',
      render: (text) => formatMoney(text),
    },
    {
      title: '持仓(手)',
      width: '6%',
      dataIndex: 'position',
    },
    {
      title: '成本(元)',
      width: '5%',
      dataIndex: 'cost',
      render: (text) => formatMoney(text),
    },
    {
      title: '现价(元)',
      dataIndex: 'latestPrice',
      render: (text, record) => (
        <span>
          {formatMoney(text)}
          <Tooltip title={`更新时间:${record?.latestDate ?? 'xxx'}`} placement="rightTop">
            <InfoCircleOutlined style={{ marginLeft: '0.3rem' }} />
          </Tooltip>
        </span>
      ),
    },
    {
      title: '投资金额(元)',
      dataIndex: 'totalInvest',
      render: (text) => formatMoney(text),
    },
    {
      title: '市值(元)',
      dataIndex: 'totalMoney',
      render: (text) => formatMoney(text),
    },
    {
      title: '卖出时间',
      width: '7%',
      dataIndex: 'sellTime',
      render: (text) => text || '/',
    },
    {
      title: '卖出价格(元)',
      dataIndex: 'sellPrice',
      render: (text) => formatMoney(text),
    },
    {
      title: () => (
        <span>
          盈亏(元)
          <Tooltip title="批量更新" placement="top">
            <SyncOutlined
              style={{ color: '#000', marginLeft: '0.4rem' }}
              onClick={(e) => {
                e.stopPropagation();
                batchUpdateItemPrice();
              }}
            />
          </Tooltip>
        </span>
      ),
      dataIndex: 'profit',
      render: (text, record) => (
        <span className={`${text > 0 ? 'redCls' : 'greenCls'}`}>
          {formatMoney(text)}
          {/* <Tooltip
            title={`更新现价(上次更新-时间:${record?.latestDate ?? 'xxx'}-现价:${
              record?.latestPrice ?? 'xxx'
            })`}
            placement="leftTop"
          >
            <SyncOutlined
              style={{ color: '#000', marginLeft: '0.4rem' }}
              onClick={(e) => {
                e.stopPropagation();
                updateItemPrice(record);
              }}
            />
          </Tooltip> */}
        </span>
      ),
    },
    {
      title: '盈亏率',
      width: '6%',
      render: (text, record) => {
        const { totalMoney, profit } = record;
        const totalInvest = totalMoney - profit;
        const rate = (parseFloat(profit / totalInvest) * 100).toFixed(2);
        return <span className={`${profit > 0 ? 'redCls' : 'greenCls'}`}>{`${rate}%`}</span>;
      },
    },
    {
      title: '操作',
      render: (text, record) => {
        return (
          <>
            {record?.status ? (
              <>
                <span
                  className="linkCls"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateOpt(record);
                  }}
                >
                  更新
                </span>
                <Divider type="vertical" />
              </>
            ) : null}
            <Popconfirm title="确定删除吗？" onConfirm={() => handleDelInvestItem(record.id)}>
              <span
                className="linkCls"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                删除
              </span>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const formLayouts = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  // 渲染展开的dom
  const expandedRowRender = (record) => {
    const columns = [
      { title: '时间', dataIndex: 'date' },
      {
        title: '操作类型',
        dataIndex: 'investOpt',
        render: (text) => (
          <span
            style={{
              padding: '0.2rem 0.5rem',
              borderRadius: '0.2rem',
              fontWeight: 'bold',
              color: `${text === '1' ? 'red' : 'green'}`,
              // color: '#fff',
            }}
          >
            <IconFont
              style={{ fontSize: '1rem', marginRight: '0.5rem' }}
              type={text === '1' ? 'icon-jiacang' : 'icon-jiancang'}
            />
            {InvestOpt[text]}
          </span>
        ),
      },
      { title: '成交价格', dataIndex: 'investCost' },
      { title: '成交数量', dataIndex: 'investNum' },
      { title: '成交后成本', dataIndex: 'latestCost' },
    ];
    return <Table pagination={false} columns={columns} dataSource={record?.optHistory ?? []} />;
  };

  // 批量更新现价
  const batchUpdateItemPrice = () => {
    if (investList && investList.length > 0) {
      const promiseArray = [];
      investList.forEach((item) => {
        const { code, id, cost, position, status } = item;
        // 针对进行中的投资项才更新现价
        if (status) {
          const itemPromise = new Promise(async (resolve, reject) => {
            try {
              await updatePriceByCodeService({ code, id, cost, position });
              resolve();
            } catch (e) {
              console.log(e);
              reject(e);
            }
          });
          promiseArray.push(itemPromise);
        }
      });
      Promise.all(promiseArray)
        .then(() => {
          setIsRefresh(new Date().valueOf());
          message.success('更新成功');
        })
        .catch((err) => {
          message.error('更新失败');
          console.log(err);
        });
    }
  };

  // 单个更新现价
  const updateItemPrice = async (record) => {
    const { code, id, cost, position, status } = record;
    if (!status) {
      message.error('投资已结束');
      return;
    }
    try {
      const result = await updatePriceByCodeService({ code, id, cost, position });
      if (result && result.code === '0') {
        message.success('更新成功');
        setIsRefresh(new Date().valueOf());
      } else {
        message.error(result?.desc || '数据更新出错');
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 新增表单
  const addFormFinish = async (val) => {
    const { buyTime } = val;
    const params = { ...val, buyTime: buyTime.format('YYYY-MM-DD') };
    const { currentUser = {} } = initialState;
    if (!currentUser.userId) {
      message.error('用户登录失效，请重新登录');
      history.push('/usercenter/login');
      return;
    }
    try {
      const response = await addInvestService({ ...params, userid: currentUser.userId });
      if (response && response.code === '0') {
        message.success('新增成功');
        setAddModalVisible(false);
        setIsRefresh(new Date().valueOf());
        addForm.resetFields();
      } else {
        message.error(response?.desc ?? '新增失败，请联系运维人员');
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 更新投资项
  const updateFormFinish = async (val) => {
    const { date } = val;
    const params = { ...val, date: date.format('YYYY-MM-DD'), ...latestInfo, id: curRecord.id };
    try {
      const response = await updateInvestService({ ...params });
      if (response && response.code === '0') {
        message.success('更新成功');
        setUpdateModalVisible(false);
        setCurRecord({});
        setIsRefresh(new Date().valueOf());
        updateForm.resetFields();
      } else {
        message.error(response?.desc ?? '更新失败，请联系运维人员');
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
        params[item] = item === 'buyTime' ? val[item].format('YYYY-MM') : val[item];
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
  const handleInvestNumChange = (ev) => {
    const investNum = parseInt(ev.target.value);
    const investCost = parseFloat(updateForm.getFieldValue('investCost'));
    if (investCost) {
      updateLatestInfo(investCost, investNum);
    }
  };

  // 交易价格发生变化
  const handleInvestCostChange = (ev) => {
    const investCost = parseFloat(ev.target.value);
    const investNum = parseInt(updateForm.getFieldValue('investNum'));
    if (investNum) {
      updateLatestInfo(investCost, investNum);
    }
  };

  const updateLatestInfo = (investCost, investNum) => {
    const optType = updateForm.getFieldValue('investOpt');
    const { totalInvest, position, cost } = curRecord;
    let investMoney = totalInvest;
    let num = position;
    if (optType === '1') {
      // 加仓
      investMoney = investMoney + investCost * investNum;
      num = position + investNum;
    } else if (optType === '2') {
      // 减仓
      num = position - investNum;
      investMoney = num ? investMoney - investCost * investNum : 0;
    }
    const profit = position * (investCost - cost);
    const latestCost = num ? parseFloat(investMoney / num) : 0;
    // const latestMoney = totalMoney + profit;
    // const profit = latestMoney - investMoney;
    setLatestInfo({
      totalInvest: investMoney,
      // totalMoney: latestMoney,
      position: num,
      latestCost,
      profit,
    });
  };

  // 进行加/减/清仓操作
  const handleUpdateOpt = (record) => {
    setUpdateModalVisible(true);
    setCurRecord(record);
    setLatestInfo({});
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
        let statObj = {};
        if (response && response.code === '0' && response.msg) {
          list = response.msg?.rows ?? [];
          total = response.msg?.count ?? 0;
          statObj = response.msg?.statObj ?? {};
        }
        setRecordsTotal(total);
        setInvestList(list);
        setStatInfo(statObj);
      } catch (e) {
        console.log(e);
      }
    };
    if (initialState?.currentUser?.userId) {
      fetchInvestList({ ...searchParams, ...pagination, userid: initialState.currentUser.userId });
    }
  }, [searchParams, pagination, isRefresh, initialState]);

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <div>
          <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>（金额单位：元）</span>
          <Popover
            title="投资概览"
            content={
              <>
                <p>
                  股票总投资：
                  <span style={{ fontWeight: 'bold' }}>
                    {formatMoney(statInfo.investStockMoney)}元
                  </span>
                </p>
                <p>
                  在投总市值：
                  <span style={{ fontWeight: 'bold' }}>{formatMoney(statInfo.allMoney)}元</span>
                </p>
                <p>
                  股票累计盈亏：
                  <span className={statInfo?.cumulativeStockProfit > 0 ? 'redCls' : 'greenCls'}>
                    {formatMoney(statInfo.cumulativeStockProfit)}元
                  </span>
                </p>
                <p>
                  基金总投资：
                  <span style={{ fontWeight: 'bold' }}>
                    {formatMoney(statInfo.investFundMoney)}元
                  </span>
                </p>
                <p>
                  基金累计盈亏：
                  <span className={statInfo?.cumulativeFundProfit > 0 ? 'redCls' : 'greenCls'}>
                    {formatMoney(statInfo.cumulativeFundProfit)}元
                  </span>
                </p>
                <Divider />
                <p>
                  账户总投资：
                  <span style={{ fontWeight: 'bold' }}>
                    {formatMoney(statInfo.investStockMoney + statInfo.investFundMoney)}元
                  </span>
                </p>
                <p>
                  累计总盈亏：
                  <span
                    className={
                      statInfo?.cumulativeFundProfit + statInfo?.cumulativeStockProfit > 0
                        ? 'redCls'
                        : 'greenCls'
                    }
                  >
                    {formatMoney(statInfo.cumulativeStockProfit + statInfo.cumulativeFundProfit)}元
                  </span>
                </p>
              </>
            }
            placement="rightBottom"
          >
            <IconFont type="icon-caiwutouzi" style={{ fontSize: '1.25rem', cursor: 'pointer' }} />
          </Popover>
          {/* {HeaderTitleData.map((item) => (
            <>
              <span className="headTitleName">{item.name}</span>
              <span
                className={`headTitleValue ${statInfo[item.value] > 0 ? 'redCls' : 'greenCls'}`}
              >
                {statInfo[item.value] ?? '00.00'} 元
              </span>
            </>
          ))} */}
        </div>
        <div>
          <Form layout="inline" form={searchForm} onFinish={onSearchFun}>
            <Form.Item name="investName">
              <Input className="inputWidth" placeholder="请输入投资项名称" />
            </Form.Item>
            <Form.Item name="buyTime">
              <MonthPicker className="inputWidth" />
            </Form.Item>
            <Form.Item name="investType" initialValue="">
              <Select className="inputWidth">
                <Option value="">投资类型(全部)</Option>
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
          rowKey={(record) => record.id}
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
      {addModalVisible ? (
        <Modal
          title="新增投资项"
          visible={addModalVisible}
          destroyOnClose
          closable
          maskClosable={false}
          footer={false}
          centered
          onCancel={() => {
            setAddModalVisible(false);
            addForm.resetFields();
          }}
        >
          <Form name="addform" layout="vertical" form={addForm} onFinish={addFormFinish}>
            <Form.Item label="投资类型" name="investType" required>
              <Select placeholder="请选择投资类型">
                {Object.keys(InvestType).map((item) => (
                  <Option key={item} value={item}>
                    {InvestType[item]}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="代码" name="code" required>
              <Input placeholder="请输入投资代码(如：sh600789,sz001001)" />
            </Form.Item>
            <Form.Item label="名称" name="investName" required>
              <Input placeholder="请输入名称" />
            </Form.Item>
            <Form.Item label="买入时间" name="buyTime" required>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="买入价格" name="buyPrice" required>
              <Input placeholder="买入价格" />
            </Form.Item>
            <Form.Item label="持仓" name="position" required>
              <Input placeholder="持仓(最低100手)" suffix="手" />
            </Form.Item>
            <Form.Item label="投资金额" name="totalInvest" required>
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
          title={`交易操作 —（${curRecord.investName}）`}
          visible={updateModalVisible}
          maskClosable={false}
          destroyOnClose
          closable
          footer={false}
          centered
          onCancel={() => {
            setUpdateModalVisible(false);
            updateForm.resetFields();
          }}
        >
          <Form name="updateform" form={updateForm} {...formLayouts} onFinish={updateFormFinish}>
            <div className={styles.beforeOpt}>
              当前成本：<span>{curRecord?.cost ?? '/'}元</span>持仓：
              <span>{curRecord?.position ?? '/'}手</span>当前总投资：
              <span>{curRecord?.totalInvest ?? '/'}元</span>
            </div>
            <Form.Item label="交易操作" name="investOpt" required initialValue="1">
              <Radio.Group>
                {Object.keys(InvestOpt).map((item) => (
                  <Radio.Button value={item}>{InvestOpt[item]}</Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item label="成交时间" name="date" required>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="交易价" name="investCost" required>
              <Input placeholder="(加/减)价位" onChange={(ev) => handleInvestCostChange(ev)} />
            </Form.Item>
            <Form.Item label="交易量" name="investNum" required>
              <Input
                placeholder="(加/减)多少手 -- 最低100手"
                suffix="手"
                onChange={(ev) => handleInvestNumChange(ev)}
              />
            </Form.Item>
            <div className={styles.afterOpt}>
              更新成本：<span>{formatMoney(latestInfo?.latestCost)}元</span>更新总投资：
              <span>{formatMoney(latestInfo?.totalInvest)}元</span>盈亏：
              <span className={`${latestInfo?.profit > 0 ? 'redCls' : 'greenCls'}`}>
                {formatMoney(latestInfo?.profit)}元
              </span>
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
