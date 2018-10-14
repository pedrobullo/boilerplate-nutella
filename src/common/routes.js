import App from './containers/App';
import NotFound from './components/NotFound/NotFound';
import PostListPage from './containers/PostListPage';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        component: PostListPage,
      },
      {
        component: NotFound,
      },
    ],
  },
];
