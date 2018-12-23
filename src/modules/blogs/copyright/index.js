import React from 'react';
import injectIntl from 'intl';
import { FormattedMessage } from 'react-intl';
import { Form, Input, Button, message } from 'antd';
import { setCopyrightInfo, getCopyrightInfo } from '../BlogServices';
const FormItem = Form.Item;

class CompanyProfile extends React.PureComponent {
  state = { editable: false, loading: false };

  onModify = () => {
    this.setState({ editable: true }, () => { document.querySelector('#content').focus(); })
  }

  onSubmit = () => {
    this.setState({ loading: true })
    const content = this.props.form.getFieldValue('content');
    setCopyrightInfo(content)
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
    getCopyrightInfo()
      .then(({ value }) => {
        this.props.form.setFieldsValue({ content: value })
      })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const placeholder = this.props.t('INPUT_INFORMATION');
    return (
      <div className="container-fluid">
        <Form>
          <FormItem label={<FormattedMessage id="BLOG_COPYRIGHT" />} >
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

export default injectIntl(Form.create()(CompanyProfile));