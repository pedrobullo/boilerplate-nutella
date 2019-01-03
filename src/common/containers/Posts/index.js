import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import PostList from '../../components/PostList';

// Import Actions, Selectors
import { addPost, fetchPosts, deletePost, getPosts } from '../../redux/modules/post';

const styleInput = {
  width: '100%',
  padding: '5px 0 5px',
  lineHeight: '100%',
  fontSize: '20px',
};

class Posts extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        dateAdded: PropTypes.number.isRequired,
      })).isRequired,
    addPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  // Actions required to provide didMount data for this component to render in SSR.
  // Must return array. See more at common/lib/Dataloader.fetchData.
  static need = ({ dispatch }, { params, query }) => [
    dispatch(fetchPosts(params, query)),
    console.log('need: Random dispatch from Posts container'),
  ];

  state = {
    title: '',
  };

  onChange = event => this.setState({ title: event.target.value });

  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();

      this.props.addPost({
        name: 'User',
        title: `New post #${this.props.posts.length + 1}`,
        content: event.target.value,
        slug: `post-post-${this.props.posts.length + 1}`,
        dateAdded: Date.now(),
      });

      return this.setState({ title: '' });
    }
    return true;
  };

  handleDeletePost = (post) => {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      this.props.deletePost(post);
    }
  };

  render() {
    return (
      <div className="PostPage">
        <label htmlFor="addpost">Add post:
          <input
            name="addpost"
            style={styleInput}
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            value={this.state.title} />
        </label>
        <PostList
          handleDeletePost={this.handleDeletePost}
          posts={this.props.posts} />
      </div>
    );
  }
}

// Retrieve data from store as props
const mapStateToProps = state => ({
  posts: getPosts(state),
});

const mapDispatchToProps = {
  addPost,
  deletePost,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Posts);
