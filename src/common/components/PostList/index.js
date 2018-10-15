import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import PostListItem from '../PostListItem';

function PostList(props) {
  return (
    <div style={{ padding: '12px' }}>
      {
        props.posts.map(post => (
          <PostListItem
            post={post}
            key={post.slug}
            onDelete={() => props.handleDeletePost(post.slug)} />
        ))
      }
    </div>
  );
}

PostList.propTypes = {
  handleDeletePost: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    dateAdded: PropTypes.number.isRequired,
  })).isRequired,
};

export default PostList;
