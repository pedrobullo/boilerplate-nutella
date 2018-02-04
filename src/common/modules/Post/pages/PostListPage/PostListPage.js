import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import PostList from '../../components/PostList/PostList';

// Import Actions
import { addPost, fetchPosts } from '../../PostActions';

// Import Selectors
import { getPosts } from '../../PostReducer';

class PostListPage extends Component {
  handleDeletePost = (post) => {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      console.log('dispatch delete post', post)
    }
  };

  handleAddPost = (name, title, content) => {
    this.props.dispatch(addPost({ name, title, content }));
  };

  render() {
    return (
      <div className="PostPage">
        <h1 className="title">Post List</h1>
        <PostList
          handleDeletePost={this.handleDeletePost}
          posts={this.props.posts} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
PostListPage.need = ({ dispatch }, { params }) => dispatch(fetchPosts(params));

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    posts: getPosts(state),
  };
}

PostListPage.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      cuid: PropTypes.string.isRequired,
    })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

PostListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(PostListPage);
