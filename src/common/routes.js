import loadable from '@loadable/component';

const loadComponent = page => loadable(() => import(`${page}`));

// Server-Side Fetching will run synchronously each route nest level
// posts <---- prefetch A 
// -- postList <---- has prefetch A, prefetch B
// -- postDetails <---- has prefetch A, prefetch C
//
export default [
  {
    path: '/',
    component: loadComponent('./containers/App'),
    exact: true,
  },
  {
    path: '/posts',
    component: loadable(() => import('./containers/PostListPage')),
    exact: true,
    routes: [
      // You can add subroutes
      // Remember to add NotFound each end of branch
    ]
  },
  { component: loadComponent('./components/NotFound') },
];
