import loadable from '@utils/loadable'

import RouteConfig from '@routes/route.types'

const routes: Array<RouteConfig> = [
  {
    path: '/exception',
    name: '异常页',
    exact: true,
    icon: 'icon-yichang',
    children: [
      {
        path: '/exception/403',
        name: '403',
        component: loadable('exception/403'),
      },
      {
        path: '/exception/404',
        name: '404',
        component: loadable('exception/404'),
      },
      {
        path: '/exception/500',
        name: '500',
        component: loadable('exception/500'),
      },
    ],
  },
]

export default routes
