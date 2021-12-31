import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { LoginService, RegisterService } from '@/services/pamsystem/usercenter';
import { useModel, history } from 'umi';
import styles from './index.less';

const Page = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const { setInitialState } = useModel('@@initialState');

  // 登录提交
  const loginFun = async (values) => {
    const result = await LoginService(values);
    if (result && result.code === '0') {
      message.success('登录成功！');
      const { phone, username, userId } = result.msg;
      const userInfo = {
        phone,
        username,
        userId,
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
      history.push('/');
    } else {
      message.warning(result?.desc || '登录失败,请联系管理人员');
    }
  };

  // 注册提交
  const registerFun = async (values) => {
    const result = await RegisterService(values);
    if (result && result.code === '0') {
      message.success('注册成功！');
      const { phone, username, token } = result.msg;
      const userInfo = {
        phone,
        username,
        userId: token,
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
      history.push('/');
    } else {
      message.warning(result?.desc || '注册失败,请联系管理人员');
    }
  };

  return (
    <div className={styles.loginWrap}>
      <div>
        <div className={styles.boxTop}>PAMSystem</div>
        <div className={styles.boxContent}>
          {!showRegister ? (
            <div>
              <Form form={loginForm} onFinish={loginFun}>
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: '请输入手机号',
                    },
                  ]}
                >
                  <Input placeholder="手机号" prefix={<PhoneOutlined />} />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: '请输入密码',
                    },
                  ]}
                >
                  <Input.Password placeholder="密码" prefix={<LockOutlined />} />
                </Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                  登录
                </Button>
              </Form>
            </div>
          ) : (
            <div>
              <Form form={registerForm} onFinish={registerFun}>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: '请输入姓名',
                    },
                  ]}
                >
                  <Input placeholder="姓名" prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: '请输入手机号',
                    },
                  ]}
                >
                  <Input placeholder="手机号" prefix={<PhoneOutlined />} />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: '请输入密码',
                    },
                  ]}
                >
                  <Input.Password placeholder="密码" prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item
                  name="check_password"
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                      message: '请再次输入密码',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('两次输入的密码不一致！'));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="再次输入密码" prefix={<LockOutlined />} />
                </Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                  注册
                </Button>
              </Form>
            </div>
          )}
        </div>
        <div className={styles.boxBottom}>
          <span
            onClick={() => setShowRegister(!showRegister)}
            style={{ color: '#1890ff', textDecoration: 'underline', cursor: 'pointer' }}
          >
            {!showRegister ? '注册用户' : '用户登录'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
