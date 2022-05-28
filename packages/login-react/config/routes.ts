export default [
  {
    path: '/test',
    layout: false,
    routes: [
      {
        path: '/test/login',
        name: 'test',
        component: './test/Login',
      },
      {
        path: '/test/user',
        name: 'test',
        component: './test/User',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        name: 'login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/',
    redirect: '/test/user',
  },
  {
    component: './404',
  },
];
