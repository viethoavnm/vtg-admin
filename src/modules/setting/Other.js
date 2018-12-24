import React from 'react';
import injectIntl from 'intl';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Form, Input, Button, message } from 'antd';
import { putSetting, getSetting } from './settingServices';
import './Settings.less';

const FormItem = Form.Item;

const LIST = {
  "MENU_SETTING_COPYRIGHT": 3,
  "MENU_SETTING_ABOUT_US": 4,
  "MENU_SETTING_CONDITIONS": 5,
  "MENU_SETTING_ACTIVITY": 6,
  "MENU_SETTING_SUPPORT": 7,
  "MENU_SETTING_CONTACT": 8,
  "MENU_SETTING_CAREER": 9,
}

class CompanyProfile extends React.PureComponent {
  state = { editable: false, loading: false };

  onModify = () => {
    this.setState({ editable: true }, () => { document.querySelector('#content').focus(); })
  }

  onSubmit = () => {
    this.setState({ loading: true })
    const value = this.props.form.getFieldValue('content');
    const name = this.props.mode;
    const data = { value, id: LIST[name], name }
    putSetting(data)
      .then(() => {
        message.success(this.props.t('DONE'));
        this.setState({ loading: false, editable: false });
      })
      .catch(() => {
        message.error(this.props.t('ERROR'));
        this.setState({ loading: false });
      })
  }

  componentDidMount() {
    getSetting(LIST[this.props.mode])
      .then(({ value }) => {
        this.props.form.setFieldsValue({ content: value })
      })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const placeholder = this.props.t('INPUT_INFORMATION');
    return (
      <div className="container-fluid">
        <span className="text-strike"><FormattedMessage id={this.props.mode} /></span>
        <Form>
          <FormItem>
            {getFieldDecorator('content',
              {
                rules: [{
                  required: true,
                  message: <FormattedMessage id="REQUIRED_INPUT" />
                }]
              })(
                <Input.TextArea
                  id="content"
                  rows={10}
                  placeholder={placeholder}
                  readOnly={!this.state.editable} />)}
          </FormItem>
        </Form>
        <div style={{ float: "right" }}>
          <Button
            type="dashed"
            disabled={this.state.editable}
            onClick={this.onModify}
            style={{ marginRight: 8 }}>
            <FormattedMessage id="ACT_MODIFY" />
          </Button>
          <Button
            type="primary"
            onClick={this.onSubmit}
            loading={this.state.loading}
            disabled={!this.state.editable}>
            <FormattedMessage id="ACT_SAVE" />
          </Button>
        </div>
      </div>
    )
  }
}

export default withRouter(injectIntl(Form.create()(CompanyProfile)));