import loadable from 'react-loadable';

const loading = () => null;

const App = loadable({ loader: () => import('./containers/App'), loading }) ;
const Posts = loadable({ loader: () => import('./containers/Posts'), loading });
const NotFound = loadable({ loader: () => import('./components/NotFound'), loading });

// Server-Side Fetching will run synchronously each route nest level
// posts <---- prefetch A 
// -- postList <---- has prefetch A, prefetch B
// -- postDetails <---- has prefetch A, prefetch C
//
export default [
  {
    path: '/',
    component: App,

    // You can add subroutes
    // Remember to add NotFound each end of branch
    routes: [
      {
        path: '/posts',
        component: Posts,
        exact: true,
      },
      { component: NotFound },
    ]
  },
  { component: NotFound },
];
