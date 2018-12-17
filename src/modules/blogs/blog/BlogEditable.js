import React from 'react';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Icon from 'antd/lib/icon';
import Radio from 'antd/lib/radio';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import Upload from '../../common/components/Upload';
import Editor from '../../common/components/Editor';
import Tags from '../../common/components/Tags';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { RESOURCES_PATH } from '../../common/constants';

const STATUS_PUBLIC = 1;
const STATUS_PRIVATE = 0;
const RadioGroup = Radio.Group;
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
  constructor(newProps) {
    super(newProps)
    if (newProps.editMode) {
      this.state = {
        tagList: newProps.blog.tagList || [],
        bannerContentName: newProps.blog.bannerContentName || null,
        content: newProps.blog.content || '',
        introduction: newProps.blog.introduction || '',
        imageNames: newProps.blog.imageNames || []
      };
    } else {
      this.state = {
        tagList: [],
        bannerContentName: null,
        content: '',
        introduction: '',
        imageNames: []
      };
    }
  }

  onChange = (key) => (value) => {
    if (key === 'sbannerContentName')
      this.setState({ bannerContentName: value.name });
    if (key === 'rbannerContentName')
      this.setState({ bannerContentName: null });
    this.setState({ [key]: value });
  }

  onSubmit = (backToList) => () => {
    this.form.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit({ ...values, ...this.state }, backToList);
      }
    });
  }

  onUploadedImage = (name) => {
    let { imageNames } = this.state;
    imageNames.push(name);
    this.setState({ imageNames });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.editMode && JSON.stringify(newProps.blog) !== JSON.stringify(this.props.blog)) {
      this.setState({
        tagList: newProps.blog.tagList || [],
        bannerContentName: newProps.blog.bannerContentName || null,
        content: newProps.blog.content || '',
        introduction: newProps.blog.introduction || '',
        imageNames: newProps.blog.imageNames || []
      });
    }
  }

  render = () => {
    const { tagList, introduction, content, bannerContentName } = this.state;
    const { blog, places, categories, intl } = this.props;
    const placeholder = intl.formatMessage({ id: "INPUT_INFORMATION" });
    const fileList = bannerContentName ? [{ uid: -1, url: RESOURCES_PATH + bannerContentName }] : [];
    return (
      <div className="editable container-fluid">
        <div className="row">
          <div className="col-9">
            <div className="editable__title"><FormattedMessage id="POST_INFO" /></div>
            <FormWrapper
              blog={blog}
              places={places}
              tagList={tagList}
              categories={categories}
              placeholder={placeholder}
              onChange={this.onChange}
              wrappedComponentRef={(form) => this.form = form}
            />
          </div>
          <div className="col-3 editable__upload">
            <div className="editable__title"><FormattedMessage id="POST_BANNER" /></div>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onSuccess={this.onChange('sbannerContentName')}
              onRemove={this.onChange('rbannerContentName')}>
              {bannerContentName
                ? null
                : <div>
                  <Icon type="plus" />
                  <div className="ant-upload-text"><FormattedMessage id="ACT_UPLOAD" /></div>
                </div>
              }
            </Upload>
          </div>
        </div>
        <Divider />
        <div className="editable__editor">
          <div className="editable__title"><FormattedMessage id="POST_CONTENT" /></div>
          <FormItem
            label={<FormattedMessage id="INTRODUCTION" />}>
            <Editor
              model={introduction}
              onModelChange={this.onChange('introduction')}
            />
          </FormItem>
          <FormItem
            label={<FormattedMessage id="CONTENT" />}>
            <Editor
              fullToolbar
              model={content}
              onUploadedImage={this.onUploadedImage}
              onModelChange={this.onChange('content')}
            />
          </FormItem>
        </div>
        <div className="editable__footer">
          <Button type="primary" onClick={this.onSubmit()}><FormattedMessage id="ACT_SAVE" /></Button>
          <Button type="primary" className="mgL8" onClick={this.onSubmit(true)}><FormattedMessage id="ACT_SAVE_N_BACK" /></Button>
        </div>
      </div >);
  }
}

class FormInput extends React.PureComponent {
  render = () => {
    const { form, tagList, onChange, placeholder, blog, categories, places } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="TITLE" />}>
          {getFieldDecorator('title', { rules: [{ required: true }], initialValue: blog.title })(
            <Input placeholder={placeholder} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="CATEGORY" />}>
          {getFieldDecorator('categoryId', { rules: [{ required: true }], initialValue: blog['categoryId'] })(
            <Select
              placeholder={placeholder}
              style={{ width: 200 }}>
              {categories.map((cate) =>
                (<Option key={cate.id} value={cate.id}>{cate.title}</Option>))}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="PLACE_NAME" />}>
          {getFieldDecorator('provinceId', { rules: [{ required: true }], initialValue: blog['provinceId'] })(
            <Select
              placeholder={placeholder}
              style={{ width: 200 }}>
              {places.map((place) =>
                (<Option key={place.id} value={place.id}>{place.name}</Option>))}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="TAGS" />}
        >
          <Tags tags={tagList.filter((tag) => (tag && true))} onChange={onChange('tagList')} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          help={<FormattedMessage id="PRIVATE_NOTICE" />}
          label={<FormattedMessage id="STATUS" />}>
          {getFieldDecorator('status', { initialValue: blog.status || STATUS_PUBLIC })(
            <RadioGroup>
              <Radio value={STATUS_PUBLIC}><FormattedMessage id="PUBLIC" /></Radio>
              <Radio value={STATUS_PRIVATE}><FormattedMessage id="PRIVATE" /></Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="AUTHOR" />}>
          {getFieldDecorator('author', { initialValue: this.props.user })(
            <Input.TextArea rows={1} readOnly style={{ width: 200 }} />
          )}
        </FormItem>
      </Form>
    )
  }
}

const FormWrapper = connect((state) => ({ user: state.common.user.user_name }))(Form.create()(FormInput));

export default injectIntl(Blog);