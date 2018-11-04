import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

// Import Components
import PostList from '../components/PostList';

// Import Actions, Selectors
import { addPost, fetchPosts, deletePost, getPosts } from '../redux/modules/post';

const Input = styled.input`
  width: 100%;
  padding: 5px 0 5px;
  border: solid 1px #999;
  background-color: #3f3c3c;
  line-height: 100%;
  font-size: 20px;
  color: lightgray;
`;

class PostListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };
  }

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
        <h1>Post List</h1>
        <label htmlFor="addpost">Add post:
          <Input
            name="addpost"
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

// Actions required to provide didMount data for this component to render in SSR.
// Must return array. See more at common/lib/Dataloader.fetchData.
PostListPage.need = ({ dispatch }, { params }) => [
  dispatch(fetchPosts(params)),
  console.log('need: Random dispatch from PostListPage'),
];

// Retrieve data from store as props
const mapStateToProps = state => ({
  posts: getPosts(state),
});

const mapDispatchToProps = {
  addPost,
  deletePost,
};

PostListPage.propTypes = {
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
};

PostListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostListPage);
