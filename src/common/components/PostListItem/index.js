import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Hr = styled.hr`
  border-color: #999;
`;

function PostListItem(props) {
  return (
    <div>
      <h3>
        {props.post.title}
      </h3>
      <p>{props.post.content}</p>
      <Hr color="#EEE" />
    </div>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    dateAdded: PropTypes.number.isRequired,
  }).isRequired,
};

export default PostListItem;
