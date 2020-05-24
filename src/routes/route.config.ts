import loadable from '@utils/loadable'

import RouteConfig from '@routes/route.types'
import demoRoutes from '@routes/demos.route'
import commonRoutes from '@routes/common.roue'
// import AUTH_MAP from '@constants/auth';

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: '首页',
    exact: true,
    icon: 'icon-home',
    component: loadable('welcome'),
    // component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@pages/welcome')),
  },
  {
    path: '/redux',
    name: 'Redux',
    icon: 'icon-react',
    children: [
      {
        path: '/redux/countera',
        name: 'counterA',
        component: loadable('redux-demo/counter'),
      },
      {
        path: '/redux/counterb',
        name: 'counterB',
        component: loadable('redux-demo/counterb'),
      },
    ],
  },
  {
    path: '/amap',
    name: 'amap',
    icon: 'icon-react',
    children: [
      {
        path: '/amap/polygon',
        name: 'polygon',
        component: loadable('amap/polygon'),
      },
      {
        path: '/amap/navigate',
        name: 'navigate',
        component: loadable('amap/navigate'),
      },
      {
        path: '/amap/trackPlayer',
        name: 'trackplayer',
        component: loadable('amap/trackPlayer'),
      },
      {
        path: '/amap/circle',
        name: 'circle',
        component: loadable('amap/circle'),
      },
    ],
  },
  // {
  //   path: '/user',
  //   name: '账号权限',
  //   icon: 'home',
  //   children: [
  //     {
  //       path: '/user/role',
  //       name: '角色管理',
  //       component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@src/pages/counter')),
  //     },
  //     {
  //       path: '/user/account',
  //       name: '账号管理',
  //       component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@src/pages/counter')),
  //     },
  //     {
  //       path: '/user/log',
  //       name: '操作日志',
  //       component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@src/pages/counter')),
  //     },
  //   ],
  // },
  ...commonRoutes,
  ...(process.env.$OMIT_DEMO ? demoRoutes : []),
]

export default routes
