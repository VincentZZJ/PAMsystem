/*
 * @Author: Vincent
 * @Date: 2021-12-06 10:50:51
 * @LastEditTime: 2021-12-31 17:00:55
 * @LastEditors: Vincent
 * @Description:
 */
export default [
  // {
  //   path: '/user',
  //   layout: false,
  //   routes: [
  //     {
  //       path: '/user',
  //       routes: [
  //         {
  //           name: 'login',
  //           path: '/user/login',
  //           component: './user/Login',
  //         },
  //       ],
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  {
    path: '/usercenter',
    layout: false,
    routes: [
      {
        path: '/usercenter/login',
        component: './usercenter/Login',
      },
    ],
  },
  // {
  //   path: '/welcome',
  //   name: 'welcome',
  //   icon: 'smile',
  //   component: './Welcome',
  // },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  // 新路由
  {
    path: '/',
    layout: false,
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/welcome',
      },
      {
        path: '/welcome',
        name: '欢迎页',
        icon: 'icon-duomeiti',
        component: './Welcome',
        isRoutes: true,
      },
      {
        path: '/financial/overview',
        name: '财务管理',
        icon: 'icon-asset',
        isRoutes: true,
        routes: [
          {
            path: '/financial/overview',
            name: '财务概览',
            icon: 'icon-analysis',
            component: './financial/OverView',
          },
          {
            path: '/f2',
            name: '财务清单',
            icon: 'icon-project-overview',
            component: './Welcome',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
