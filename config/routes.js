/*
 * @Author: Vincent
 * @Date: 2021-12-06 10:50:51
 * @LastEditTime: 2022-01-08 16:14:31
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
        path: '/financial',
        name: '投资管理',
        icon: 'icon-asset',
        isRoutes: true,
        routes: [
          {
            path: '/financial',
            redirect: '/financial/overview',
          },
          {
            path: '/financial/overview',
            name: '投资概览',
            icon: 'icon-analysis',
            component: './financial/OverView',
          },
          {
            path: '/financial/investlist',
            name: '投资清单',
            icon: 'icon-project-overview',
            component: './financial/InvestList',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
