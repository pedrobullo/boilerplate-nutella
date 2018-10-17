import Loadable from 'react-loadable';

const loadComponent = (path) => Loadable({
  loader: () => import(`${path}`),
  loading: () => null,
});

export default [
  {
    path: '/',
    component: loadComponent('./containers/App'),
    routes: [
      {
        path: '/posts',
        component: loadComponent('./containers/PostListPage'),
      },
      { component: loadComponent('./components/NotFound') },
    ],
  },
  { component: loadComponent('./components/NotFound') },
];
