import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Upload from '../common/components/Upload';
import * as services from './settingServices';
import { getPageList } from './settingRedux';
import { Table, Divider, Button, Popconfirm, Form, Input, Icon, Modal } from 'antd';
import { RESOURCES_PATH } from '../common/constants';
import './Settings.less';

const FormItem = Form.Item;

const DEFAULT_PAGE_SIZE = 10;

class PageInfo extends React.PureComponent {
  state = {
    addMode: false,
    pop: true
  }

  temp = {};

  columns = [
    {
      title: <FormattedMessage id="PLACE_NAME" />,
      dataIndex: 'name',
    },
    {
      title: <FormattedMessage id="ASSETS" />,
      dataIndex: 'contentNames',
      render: (values) => (values.map((name) => (<img key={name} alt={name} src={RESOURCES_PATH + name} className="tbl__img--preview" />)))
    },
    {
      title: <FormattedMessage id="DESCRIPTION" />,
      dataIndex: 'description',
    },
    {
      title: <FormattedMessage id="ACTION" />,
      key: "action",
      width: 128,
      render: (item) => (
        <span>
          <a href="/" onClick={this.onOpenModify.bind(this, item)}>
            <FormattedMessage id="ACT_MODIFY" />
          </a>
          <Divider type="vertical" />
          <Popconfirm
            placement="topRight"
            title={<FormattedMessage id="DELETE_CONFIRM" />}
            onConfirm={this.remove.bind(this, item)}
            okText={<FormattedMessage id="ACT_DELETE" />}
            cancelText={<FormattedMessage id="ACT_CANCEL" />}
          >
            <a href="/"><FormattedMessage id="ACT_DELETE" /></a>
          </Popconfirm>
        </span>
      )
    }
  ];

  onOpenModify = (item, e) => {
    e.preventDefault();
    this.temp = item;
    this.setState({ pop: true, addMode: false });
    if (this.form)
      this.form.props.form.setFieldsValue({
        name: item.name,
        description: item.description,
        contentNames: item.contentNames
          ? item.contentNames.map((url, i) => ({ uid: i, url: RESOURCES_PATH + url, response: { name: url } }))
          : []

      });
  }

  onOpenAdd = () => {
    this.temp = {};
    this.setState({ pop: true, addMode: true })
  }

  onSubmit = () => {
    this.form.props.form.validateFields((err, values) => {
      if (!err) {
        const model = { ...values, contentNames: values.contentNames.map((file) => (file.response.name)) }
        if (this.state.addMode)
          this.create(model);
        else
          this.update(model);
      }
    });
  }

  onClose = () => {
    this.form.props.form.resetFields();
    this.setState({ pop: false });
  }

  fetch = (pageSize = DEFAULT_PAGE_SIZE) => {
    this.props.getPageList({ pageSize });
  }

  create = (item) => {
    services.createPage(item)
      .then(this.done);
  }

  update = (item) => {
    services.updatePage({ id: this.temp.id, ...item })
      .then(this.done);
  }

  remove = (item, e) => {
    e.preventDefault();
    services.removePage(item.id);
  }

  done = () => {
    this.form.props.form.resetFields();
    this.setState({ pop: false });
    this.fetch();
  }

  componentDidMount() {
    this.setState({ pop: false });
    this.fetch();
  }

  render() {
    const { pop, addMode } = this.state;
    const { list } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="bgc-white bd bdrs-3 p-20 mB-20">
              <div className="table-toolbar">
                <span className="toolbar-left"><FormattedMessage id="LIST_OF_PAGES" /></span>
                <span className="toolbar-right">
                  <Button type="primary" onClick={this.onOpenAdd}>
                    <FormattedMessage id="ADD_PAGE" />
                  </Button>
                </span>
              </div>
              <Table rowKey="id" columns={this.columns} dataSource={list.content} />
            </div>
          </div>
        </div>
        <Modal
          centered
          visible={pop}
          title={<FormattedMessage id={addMode ? "ADD_PAGE" : "MODIFY_PAGE"} />}
          onCancel={this.onClose}
          footer={[
            <Button key="back" onClick={this.onClose}>
              <FormattedMessage id="ACT_CANCEL" />
            </Button>,
            <Button key="submit" type="primary" onClick={this.onSubmit}>
              <FormattedMessage id={addMode ? "ACT_ADD" : "ACT_SAVE"} />
            </Button>,
          ]}
        >
          <FormWrapper wrappedComponentRef={(form) => this.form = form} />
        </Modal>
      </div>
    )
  }
};

class FormInput extends React.PureComponent {
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <FormItem label={<FormattedMessage id="PLACE_NAME" />} >
          {getFieldDecorator('name', { rules: [{ required: true, message: <FormattedMessage id="REQUIRED_INPUT" /> }] })(
            <Input />
          )}
        </FormItem>
        <FormItem label={<FormattedMessage id="DESCRIPTION" />}>
          {getFieldDecorator('description', { rules: [{ required: true, message: <FormattedMessage id="REQUIRED_INPUT" /> }] })(
            <Input.TextArea rows={3} />
          )}
        </FormItem>
        <FormItem label={<FormattedMessage id="ASSETS" />}>
          {getFieldDecorator('contentNames',
            {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
              rules: [{ required: true, message: <FormattedMessage id="REQUIRED_INPUT" /> }]
            })(
              <Upload listType="picture-card" multiple>
                <div>
                  <Icon type="plus" />
                  <div className="ant-upload-text"><FormattedMessage id="ACT_UPLOAD" /></div>
                </div>
              </Upload>
            )}
        </FormItem>
      </Form>
    )
  }
}
const FormWrapper = Form.create()(FormInput);
const mapState = (state) => ({
  list: state.settings.pageList
})
export default connect(mapState, { getPageList })(PageInfo);