import React from 'react';
import injectIntl from 'intl';
import Tags from 'components/Tags';
import Upload from 'components/Upload';
import Editor from 'components/Editor';
import { normFile } from 'utils';
import { connect } from 'react-redux';
import { getBlog, modifyBlog, createBlog } from '../BlogServices';
import { Input, Form, Button, Divider, Icon, Select, message, Modal } from 'antd';
import { RESOURCES_PATH } from 'consts';

const STATUS_PUBLIC = 1;
const STATUS_PRIVATE = 0;
const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

class Blog extends React.Component {
  state = { content: '', tagList: [], error: false }
  t = (id, values) => (this.props.intl.formatMessage({ id }, values))

  onContentChange = (content) => {
    this.setState({ content, error: false })
  }

  onTagChange = (tagList) => {
    this.setState({ tagList })
  }

  onSaveDraft = () => {
    const values = this.props.form.getFieldsValue();
    this.submit({
      ...values,
      ...this.state, bannerContentName:
        values.bannerContentName ? values.bannerContentName[0].response.name : null
    }, false)
  }

  onSubmit = () => {
    this.props.form.validateFields((error, values) => {
      if (!error && this.state.content.length > 300) {
        this.submit({
          ...values,
          ...this.state,
          bannerContentName: values.bannerContentName[0].response.name
        }, true)
      } else if (this.state.content.length <= 300) {
        this.setState({ error: true })
        message.warning(this.t('POST_REQUIRED_CONTENT'));
        document.querySelector('#content').scrollIntoViewIfNeeded();
      } else {
        message.warning(this.t('POST_INPUT_REQUIRED'));
        document.querySelector(`#${Object.keys(error)[0]}`).focus();
        document.querySelector(`#${Object.keys(error)[0]}`).scrollIntoViewIfNeeded();
      }
    })
  }

  onBack = () => {
    window.history.back();
  }

  submit = (item, pub = false) => {
    item.status = pub ? STATUS_PUBLIC : STATUS_PRIVATE;
    if (this.props.addMode)
      createBlog(item)
        .then(this.redirect)
    else
      modifyBlog({ ...this.post, ...item })
        .then(this.redirect)
  }

  redirect = ({ id, status }) => {
    Modal.confirm({
      title: this.t(status ? 'POST_SUBMIT_DONE' : 'POST_SAVE_DRAFT'),
      okText: this.t('VIEW_POST'),
      cancelText: this.t('ACT_BACK'),
      onOk: () => { window.open(`/blog/post?postId=${id}`) },
      onCancel: this.onBack
    })
  }


  componentDidMount() {
    if (!this.props.addMode) {
      getBlog(this.props.id)
        .then((data) => {
          this.props.form.setFieldsValue({
            title: data.title,
            categoryId: data.categoryId,
            provinceId: data.provinceId,
            introduction: data.introduction,
            bannerContentName: data.bannerContentName ? [{
              uid: -1,
              url: RESOURCES_PATH + data.bannerContentName,
              response: { name: data.bannerContentName }
            }] : []
          })
          this.setState({
            content: data.content,
            tagList: data.tagList
          })
          this.post = data;
        })
    }
  }

  render = () => {
    const { places, categories, form } = this.props;
    const { tagList, content } = this.state;
    const { getFieldDecorator } = form;
    const placeholder = this.props.t('INPUT_INFORMATION')
    const showUpload = !form.getFieldValue('bannerContentName')
      || (form.getFieldValue('bannerContentName') && !form.getFieldValue('bannerContentName').length);
    return (
      <Form>
        <div className="editable container-fluid">
          <div className="row">
            <div className="col-9">
              <div className="editable__title">{this.props.t('POST_INFO')}</div>
              <FormItem
                {...formItemLayout}
                label={this.props.t('TITLE')}>
                {getFieldDecorator('title',
                  { rules: [{ required: true, message: this.t('POST_REQUIRE_TITLE') }] })(
                    <Input placeholder={this.t('POST_TITLE_HINT')} maxLength={150} id="title" />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={this.props.t('CATEGORY')}>
                {getFieldDecorator('categoryId')(
                  <Select
                    placeholder={placeholder}
                    style={{ width: 200 }}>
                    {categories.map((cate) =>
                      (<Option key={cate.id} value={cate.id}>{cate.title}</Option>))}
                  </Select>)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={this.props.t('PLACE_NAME')}>
                {getFieldDecorator('provinceId')(
                  <Select
                    placeholder={placeholder}
                    style={{ width: 200 }}>
                    {places.map((place) =>
                      (<Option key={place.id} value={place.id}>{place.name}</Option>))}
                  </Select>)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={this.props.t('TAGS')}>
                <Tags tags={tagList.filter((tag) => (tag && true))} onChange={this.onTagChange} />
              </FormItem>
            </div>
            <div className="col-3 editable__upload">
              <div className="editable__title">{this.props.t('POST_BANNER')}</div>
              <FormItem label={this.props.t('BANNER')}>
                {getFieldDecorator('bannerContentName', {
                  valuePropName: 'fileList',
                  getValueFromEvent: normFile,
                  rules: [{ required: true, message: this.props.t('POST_REQUIRE_BANNER') }]
                })(
                  <Upload
                    id="bannerContentName"
                    listType="picture-card">
                    {showUpload && <span>
                      <Icon type="plus" />
                      {this.props.t('ACT_UPLOAD')}
                    </span>}
                  </Upload>)}
              </FormItem>
            </div>
          </div>
          <Divider />
          <div className="editable__editor">
            <div className="editable__title">{this.props.t('POST_CONTENT')}</div>
            <FormItem
              label={this.props.t('INTRODUCTION')}>
              {getFieldDecorator('introduction',
                {
                  rules: [
                    { required: true, message: this.t('POST_REQUIRE_DESCRIPTION') },
                    { min: 30, message: this.t('POST_REQUIRE_DESCRIPTION_MIN') }]
                })(
                  <Input.TextArea
                    rows={3}
                    maxLength={300}
                    id="introduction"
                    placeholder={this.props.t('EDITOR_PLACEHOLDER')}
                  />)}
            </FormItem>
            <FormItem
              label={this.props.t('CONTENT')}>
              {this.state.error && <div id="content" className="error">{this.props.t('POST_REQUIRED_CONTENT_MIN')}</div>}
              <Editor
                fullToolbar
                model={content}
                onUploadedImage={this.onUploadedImage}
                onModelChange={this.onContentChange}
              />
            </FormItem>
          </div>
          <div className="editable__footer">
            <Button type="default" onClick={this.onBack}>{this.props.t('ACT_BACK')}</Button>
            <Button type="dashed" className="mgL8" onClick={this.onSaveDraft}>{this.props.t('ACT_SAVE_DRAFT')}</Button>
            <Button type="primary" className="mgL8" onClick={this.onSubmit}>{this.props.t('ACT_POST')}</Button>
          </div>
        </div>
      </Form >);
  }
}

export default injectIntl(connect((state) => ({ user: state.common.user.user_name }))(Form.create()(Blog)));