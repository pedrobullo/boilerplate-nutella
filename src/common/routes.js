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

    // You can add subroutes
    // Remember to add NotFound each end of branch
    routes: [
      {
        path: '/posts',
        component: loadable(() => import('./containers/PostListPage')),
        exact: true,
      },
      { component: loadable(() => import('./components/NotFound')) },
    ]
  },
  { component: loadable(() => import('./components/NotFound')) },
];
