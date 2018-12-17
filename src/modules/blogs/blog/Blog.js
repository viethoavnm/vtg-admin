import React from 'react';
import moment from 'moment';
import Icon from 'antd/lib/icon';
import Skeleton from 'antd/lib/skeleton';
import Viewer from '../../common/components/Viewer';
import { RESOURCES_PATH } from '../../common/constants';
import './Blog.css';

const Blog = ({ blog, categories }) => {
  if (!Object.keys(Object(blog)).length) {
    return (
      <div className="container-fluid blog">
        <Skeleton
          active
          paragraph={{ rows: 10 }}
        />
      </div>)
  }
  const date = moment();
  const temp = categories.find(cate => cate.id === blog.category_id);
  return (
    <div className="container-fluid blog">
      <div className="blog__cover">
        {blog.bannerContentName && <img className="cover__image" src={RESOURCES_PATH + blog.bannerContentName} alt={blog.title} />}
        <div className="cover__nest">
          <span className="cover__left date-time">
            <span className="date-time___day">{date.format('dddd')}</span>
            <span className="date-time___date">{date.format('MMM Do')}</span>
          </span>
          <div className="cover__right">
            <h1 className="cover__title">{blog.title}</h1>
            <ul className="info">
              <li>
                <Icon type="user" />
                <span className="info__author">{blog.author ? blog.author : '(Anonymous)'}</span>
              </li>
              <li>
                <Icon type="folder" />
                <span className="info__category">{blog.category_id ? temp.title : '(unknown)'}</span>
              </li>
              <li>
                <Icon type="tags" />
                <span className="info__tags">{blog.tagList.length > 0 ? blog.tagList.toString() : '(No tags)'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="blog__content" >
        <Viewer model={blog.content} />
      </div>
    </div>
  )
}
export default Blog;