import React from 'react';
import Upload from '../../common/components/Upload';
import Editor from '../../common/components/Editor';
import Tags from '../../common/components/Tags';
import { connect } from 'react-redux';
import { normFile } from '../../../utils';
import { injectIntl } from 'react-intl';
import {
  Input,
  Radio,
  Form,
  Button,
  Divider,
  Icon,
  Select
} from 'antd';

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
  state = { content: '', tagList: [] }

  onContentChange = (content) => {
    this.setState({ content })
  }

  onTagChange = (tagList) => {
    this.setState({ tagList })
  }

  t = (id, values) => (this.props.intl.formatMessage({ id }, values))

  render = () => {
    const { places, categories, form } = this.props;
    const { tagList, content } = this.state;
    const { getFieldDecorator } = form;
    const placeholder = this.t('INPUT_INFORMATION');
    return (
      <Form>
        <div className="editable container-fluid">
          <div className="row">
            <div className="col-9">
              <div className="editable__title">{this.t('POST_INFO')}</div>
              <FormItem
                {...formItemLayout}
                label={this.t('TITLE')}>
                {getFieldDecorator('title',
                  { rules: [{ required: true, message: this.t('INPUT_REQUIRED') }] })(
                    <Input placeholder={placeholder} maxLength={256} />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={this.t('CATEGORY')}>
                {getFieldDecorator('categoryId',
                  { rules: [{ required: true, message: this.t('INPUT_REQUIRED') }] })(
                    <Select
                      placeholder={placeholder}
                      style={{ width: 200 }}>
                      {categories.map((cate) =>
                        (<Option key={cate.id} value={cate.id}>{cate.title}</Option>))}
                    </Select>)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={this.t('PLACE_NAME')}>
                {getFieldDecorator('provinceId',
                  { rules: [{ required: true, message: this.t('INPUT_REQUIRED') }] })(
                    <Select
                      placeholder={placeholder}
                      style={{ width: 200 }}>
                      {places.map((place) =>
                        (<Option key={place.id} value={place.id}>{place.name}</Option>))}
                    </Select>)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={this.t('TAGS')}>
                <Tags tags={tagList.filter((tag) => (tag && true))} onChange={this.onTagChange} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                help={this.t('PRIVATE_NOTICE')}
                label={this.t('STATUS')}>
                {getFieldDecorator('status',
                  { initialValue: STATUS_PRIVATE })(
                    <RadioGroup>
                      <Radio value={STATUS_PUBLIC}>{this.t('PUBLIC')}</Radio>
                      <Radio value={STATUS_PRIVATE}>{this.t('PRIVATE')}</Radio>
                    </RadioGroup>)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={this.t('AUTHOR')}>
                {getFieldDecorator('author',
                  { initialValue: this.props.user })(
                    <Input readOnly style={{ width: 200 }} />)}
              </FormItem>
            </div>
            <div className="col-3 editable__upload">
              <div className="editable__title">{this.t('POST_BANNER')}</div>
              <FormItem label={this.t('BANNER')}>
                {getFieldDecorator('bannerContentName', {
                  valuePropName: 'fileList',
                  getValueFromEvent: normFile,
                  rules: [{ required: true, message: this.t('INPUT_REQUIRED') }]
                })(
                  <Upload
                    listType="picture-card">
                    <Icon type="plus" />
                    {this.t('ACT_UPLOAD')}
                  </Upload>)}
              </FormItem>
            </div>
          </div>
          <Divider />
          <div className="editable__editor">
            <div className="editable__title">{this.t('POST_CONTENT')}</div>
            <FormItem
              label={this.t('INTRODUCTION')}>
              {getFieldDecorator('introduction',
                { rules: [{ required: true, message: this.t('INPUT_REQUIRED') }] })(
                  <Input.TextArea
                    rows={3}
                    minLength={30}
                    maxLength={300}
                    placeholder={this.t('EDITOR_PLACEHOLDER')}
                  />)}
            </FormItem>
            <FormItem
              label={this.t('CONTENT')}>
              <Editor
                fullToolbar
                model={content}
                onUploadedImage={this.onUploadedImage}
                onModelChange={this.onContentChange}
              />
            </FormItem>
          </div>
          <div className="editable__footer">
            <Button type="primary" onClick={this.onSubmit}>{this.t('ACT_SAVE')}</Button>
            <Button type="primary" className="mgL8" onClick={this.onSubmitAndBack}>{this.t('ACT_SAVE_N_BACK')}</Button>
          </div>
        </div>
      </Form >);
  }
}

export default injectIntl(connect((state) => ({ user: state.common.user.user_name }))(Form.create()(Blog)));