import App from './modules/App/App';
import NotFound from './modules/NotFound/NotFound';
import PostListPage from './modules/Post/pages/PostListPage/PostListPage';
import PostListIndex from './modules/Post/components/PostListIndex';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        component: App,
        exact: true,
      },
      {
        path: '/posts',
        component: PostListPage,
        routes: [
          {
            path: '/posts',
            component: PostListIndex,
            exact: true,
          },
          {
            path: '/blog/:slug',
            // component: Postetails,
            exact: true,
          },
          {
            component: NotFound,
          },
        ],
      },
      {
        component: NotFound,
      },
    ],
  },
];
