import React from 'react';
import BlogEditable from './BlogEditable';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { initCategories, getPost, getPlacesList } from '../blogReudux';
import * as Services from '../BlogServices';
import message from 'antd/lib/message';
import './Blog.css'

class BlogWrapper extends React.Component {
  ready = (mode, search) => {
    if (mode !== 'CREATE_MODE') {
      try {
        const id = search.split('=')[1];
        this.props.getPost(id);
      } catch (error) {
        window.history.back();
      }
    }
  }

  onSubmit = (item, backToList = false) => {
    const success = (data) => {
      if (backToList)
        this.props.history.push('/blog-management');
      else
        window.location = (`/blog/post?postId=${data.id}`);

    }

    function trimImages() {
      return item.imageNames.filter((name) => (item.content.indexOf(name) !== -1));
    }
    item.imageNames = trimImages();

    if (this.props.mode === 'CREATE_MODE') {
      Services.createBlog(item)
        .then(success)
        .catch(this.showError)
    } else {
      Services.modifyBlog({ ...this.props.blog, ...item })
        .then(success)
        .catch(this.showError)
    }
  }

  showError = () => {
    message.error(<span>Something error! Please try again.</span>);
  }

  componentDidMount() {
    this.ready(this.props.mode, this.props.location.search);
    this.props.initCategories();
    this.props.getPlacesList();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.location.search !== this.props.location.search) {
      this.ready(newProps.mode, newProps.location.search)
    }
  }

  render() {
    const { mode, blog, categories, places } = this.props
    switch (mode) {
      case 'CREATE_MODE':
        return (
          <BlogEditable
            blog={{}}
            places={places}
            categories={categories}
            onSubmit={this.onSubmit}
          />
        );
      case 'MODIFY_MODE':
        return (
          <BlogEditable
            editMode
            blog={blog}
            places={places}
            categories={categories}
            onSubmit={this.onSubmit}
          />
        );
      default:
        return null;
    }
  }
}
const mapProps = (state) => ({
  categories: state.blog.categories,
  blog: state.blog.post,
  places: state.blog.places
})
export default withRouter(connect(mapProps, {
  initCategories,
  getPlacesList,
  getPost
})(BlogWrapper));