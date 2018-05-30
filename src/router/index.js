// https://reacttraining.com/react-router/web/guides/code-splitting

import Loadable from 'react-loadable';

const Home = Loadable({
  loader: () => import('@/views/Home/Home'),
  loading: () => null,
});

const NotFound = Loadable({
  loader: () => import('@/views/NotFound/NotFound'),
  loading: () => null,
});

export default [
  {
    label: 'home',
    path: '/',
    isExact: true,
    component: Home,
  },
  {
    label: '404',
    path: '',
    isExact: false,
    component: NotFound,
  },
];
