import React from 'react';
import PropTypes from 'prop-types';

function PostListItem(props) {
  return (
    <div>
      <h3>
        {props.post.title}
      </h3>
      <p>{props.post.content}</p>
      <hr />
    </div>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostListItem;
