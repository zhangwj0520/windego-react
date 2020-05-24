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
    name: '地图',
    icon: 'icon-amap',
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
  {
    path: '/user',
    name: '表单',
    icon: 'icon-table',
    children: [
      {
        path: '/user/role',
        name: '角色管理',
        component: loadable('user/Role'),
      },
      {
        path: '/user/log',
        name: '操作日志',
        component: loadable('user/Log'),
      },
    ],
  },
  ...commonRoutes,
  ...(process.env.$OMIT_DEMO ? demoRoutes : []),
]

export default routes
