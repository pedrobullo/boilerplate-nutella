// import callApi from '../../util/callApi';

import { postValidation } from '../../models/post';

const swal = typeof window !== 'undefined' ? require('sweetalert2') : fn => fn();

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';

// Export Actions
export const addPost = post => ({ type: ADD_POST, post });
export const addPosts = posts => ({ type: ADD_POSTS, posts });

const posts = [
  {
    title: 'Example Post #1',
    content: 'First post',
    slug: 'first-post',
    cuid: '1',
    dateAdded: Date.now(),
  },
  {
    title: 'Example Post #2',
    content: 'Second post',
    slug: 'second-post',
    cuid: '2',
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
