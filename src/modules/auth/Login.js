import React from 'react';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import message from 'antd/lib/message';
import { login } from './LoginServices';
import { injectIntl, FormattedMessage } from 'react-intl';
import common from '../common';
import './Login.css';

const { Actions } = common
const FormItem = Form.Item;

class LoginForm extends React.Component {

  state = { loading: false }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        login(values)
          .then(({ data }) => {
            this.setState({ loading: false });
            Actions.requestLogin(data, { user_name: values.username })
          })
          .catch((err) => {
            this.setState({ loading: false });
            message.error(this.props.intl.formatMessage({ id: "SIGN_IN_ERROR" }));
          });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { formatMessage } = this.props.intl;
    return (
      <div className="login">
        <Form
          onSubmit={this.handleSubmit}
          className="login__form">
          <h2><FormattedMessage id="LOGIN" /></h2>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: formatMessage({ id: "USERNAME_REQUIRED" }) }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={formatMessage({ id: "USERNAME" })} />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: formatMessage({ id: "PASSWORD_REQUIRED" }) }],
            })(
              <Input
                type="password"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={formatMessage({ id: "PASSWORD" })} />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>
                <FormattedMessage id="REMEMBER_ME" />
              </Checkbox>
            )}
            <a className="login__forgot" href="">
              <FormattedMessage id="FORGOT_PASSWORD" />
            </a>
            <Button
              type="primary"
              htmlType="submit"
              loading={this.state.loading}
            >
              <FormattedMessage id="LOGIN" />
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(injectIntl(LoginForm));