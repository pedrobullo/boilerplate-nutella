import App from './components/App/App';
import NotFound from './components/NotFound/NotFound';
import PostListPage from './containers/PostListPage';

export default [
  {
    component: App,
    routes: [
      {
        path: '/posts',
        component: PostListPage,
      },
      {
        component: NotFound,
      },
    ],
  },
];
