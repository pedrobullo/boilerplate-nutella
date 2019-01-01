import loadable from '@loadable/component';

// Server-Side Fetching will run synchronously each route nest level
// posts <---- prefetch A 
// -- postList <---- has prefetch A, prefetch B
// -- postDetails <---- has prefetch A, prefetch C
//
export default [
  {
    path: '/',
    component: loadable(() => import('./containers/App')),
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
  {
    component: loadable(() => import('./components/NotFound')),
  },
];
