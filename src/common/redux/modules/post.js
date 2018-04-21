// import callApi from '../../util/callApi';
import reducerHandler from '../utils/reducer';
import { postValidation } from '../../models/post';

// Workaround for non-universal libs
const swal = typeof window !== 'undefined' ? require('sweetalert2') : fn => fn();

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';

// Export Actions
export const addPost = post => ({ type: ADD_POST, post });
export const addPosts = posts => ({ type: ADD_POSTS, posts });
export const deletePost = slug => ({ type: DELETE_POST, slug });

const posts = [
  {
    name: 'User',
    title: 'Example Post #1',
    content: 'First post',
    slug: 'first-post',
    dateAdded: Date.now(),
  },
  {
    name: 'User',
    title: 'Example Post #2',
    content: 'Second post',
    slug: 'second-post',
    dateAdded: Date.now(),
  },
];

export const callApiTest = x => new Promise(resolve => setTimeout(() => resolve(x), 2000));

export const fetchPosts = () => dispatch =>
  callApiTest(posts, '/api/posts', 'get')
    .then(res => dispatch(addPosts(res)));

export const savePost = (post) => {
  // Validate - JSON Schema
  const validateSchema = postValidation(post);

  if (!validateSchema.valid) {
    const errors = validateSchema.errors.map(error => error.message);
    const errorMsg = `${errors.join('<br/>')}`;

    if (swal) {
      swal('Erro', errorMsg, 'error').catch(swal.noop);
    }
  }

  return addPost(post);
};

// Initial State
const initialState = { data: [] };

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_POST]: (state, action) => ({
    data: [action.post, ...state.data],
  }),

  [ADD_POSTS]: (state, action) => ({
    data: action.posts,
  }),

  [DELETE_POST]: (state, action) => ({
    data: state.data.filter(post => post.slug !== action.slug),
  }),
};

// Get all posts
export const getPosts = state => state.posts.data;

// Get post by cuid
export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

// Export Reducer
export default (state = initialState, action) => reducerHandler(state, ACTION_HANDLERS, action);
