/*
 * @Author: Vincent
 * @Date: 2021-12-31 17:13:48
 * @LastEditTime: 2022-05-14 16:29:47
 * @LastEditors: Vincent
 * @Description:
 */
import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useModel, history } from 'umi';
import IconFont from '@/components/IconFont';
import styles from './BasicLayout.less';

const { SubMenu } = Menu;

const BasicLayout = (props) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [menuConfig, setMenuConfig] = useState([]);
  const { createWsServer } = useModel('useWebsocket', (model) => ({
    createWsServer: model.createWsServer,
  }));
  const { children, route } = props;
  const { currentUser } = initialState;
  // 退出登录
  const logoutFun = async () => {
    await setInitialState((s) => ({ ...s, currentUser: undefined }));
    localStorage.removeItem('userInfo');
    history.push('/usercenter/login');
    if (window.wsServer) {
      window.wsServer.close();
      window.wsServer = null;
    }
  };

  // 动态渲染菜单
  const renderMenu = (menu = []) => {
    if (menu?.length > 0) {
      return menu.map((item) => {
        if (item?.routes?.length > 0) {
          return (
            <SubMenu
              key={item.path}
              title={item.name}
              icon={<IconFont style={{ fontSize: '1rem' }} type={item.icon} />}
            >
              {renderMenu(item.routes)};
            </SubMenu>
          );
        }
        if (item.icon) {
          return (
            <Menu.Item
              key={item.path}
              icon={<IconFont style={{ fontSize: '1rem' }} type={item.icon} />}
            >
              {item.name}
            </Menu.Item>
          );
        }
      });
    }
  };

  // 点击菜单跳转
  const handleMenuClick = ({ key }) => {
    history.push(key);
  };

  useEffect(() => {
    // 给window添加事件
    window.onbeforeunload = () => {
      if (window.wsServer) {
        window.wsServer.close();
        window.wsServer = null;
      }
    };
    // 菜单渲染(根据路由配置动态渲染)
    const routesConfig = route?.children?.filter((item) => item.isRoutes === true) || [];
    setMenuConfig(routesConfig);
    setInitialState((s) => ({ ...s, routeConfig: route }));
    createWsServer();
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.pageTop}>
        <div>PAMSystem</div>
        <div>
          <span>
            <UserOutlined /> {currentUser?.username}
          </span>
          <span onClick={logoutFun}>
            <LogoutOutlined /> 退出登录
          </span>
        </div>
      </div>
      <div className={styles.pageContent}>
        <div className={styles.pageLeftSide}>
          <Menu
            mode="inline"
            onClick={handleMenuClick}
            defaultSelectedKeys={[window.location.pathname]}
            defaultOpenKeys={[window.location.pathname]}
          >
            {renderMenu(menuConfig)}
          </Menu>
        </div>
        <div className={styles.pageRightContent}>{children}</div>
      </div>
    </div>
  );
};

export default BasicLayout;
