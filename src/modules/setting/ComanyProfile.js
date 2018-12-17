import React from 'react';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Message from 'antd/lib/message';
import Upload from '../common/components/Upload';
import Location from '../common/components/Location';
import { injectIntl, FormattedMessage } from 'react-intl';
import { setCompanyInfo, getCompanyInfo } from './settingServices';
import { RESOURCES_PATH } from '../common/constants';
import './Settings.css';

const FormItem = Form.Item;

class CompanyProfile extends React.PureComponent {
  state = {};
  onSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          ...values,
          headerLogo: values.headerLogo[0].response.name,
          footerLogo: values.footerLogo[0].response.name
        }
        console.log("#Submit:", data);
        setCompanyInfo(data)
          .then(() => { Message.success('Updated!') })
          .catch(() => { Message.error('Update failed!') })
      }
    });
  }

  componentDidMount() {
    getCompanyInfo()
      .then((data) => {
        this.props.form.setFieldsValue({
          ...data,
          headerLogo: [{ uid: -1, url: RESOURCES_PATH + data.headerLogo, response: { name: data.headerLogo } }],
          footerLogo: [{ uid: -1, url: RESOURCES_PATH + data.footerLogo, response: { name: data.footerLogo } }]
        });
      });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const placeholder = this.props.intl.formatMessage({ id: 'INPUT_INFORMATION' });
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <Form>

              {/* --------------------------------------------------------------------------------------------------------------------------------------- */}
              <span className="text-strike"><FormattedMessage id="GENARAL_INFOMATION" /></span>

              <FormItem {...layout} label={<FormattedMessage id="FULL_COMPANY_NAME" />} >
                {getFieldDecorator('companyName', { rules: [{ required: true, message: <FormattedMessage id="REQUIRED_INPUT" /> }] })(
                  <Input placeholder={placeholder} />
                )}
              </FormItem>
              <FormItem {...layout} label={<FormattedMessage id="OFFICIAL_WEBSITE" />} >
                {getFieldDecorator('website', { rules: [{ required: true, message: <FormattedMessage id="REQUIRED_INPUT" /> }] })(
                  <Input placeholder={placeholder} />
                )}
              </FormItem>
              <FormItem {...layout} label={<FormattedMessage id="CERT" />} >
                {getFieldDecorator('cert', { rules: [{ required: true, message: <FormattedMessage id="REQUIRED_INPUT" /> }] })(
                  <Input placeholder={placeholder} />
                )}
              </FormItem>
              <FormItem {...layout} label={<FormattedMessage id="EMAIL" />} >
                {getFieldDecorator('email', { rules: [{ required: true, message: <FormattedMessage id="REQUIRED_INPUT" /> }] })(
                  <Input placeholder={placeholder} />
                )}
              </FormItem>
              <FormItem {...layout} label={<FormattedMessage id="COMPANY_PHONE" />} >
                {getFieldDecorator('phone', { rules: [{ required: true, message: <FormattedMessage id="REQUIRED_INPUT" /> }] })(
                  <Input placeholder={placeholder} />
                )}
              </FormItem>
              <FormItem {...layout} label={<FormattedMessage id="COMPANY_HOTLINE" />} >
                {getFieldDecorator('hotline', { rules: [{ required: true, message: <FormattedMessage id="REQUIRED_INPUT" /> }] })(
                  <Input placeholder={placeholder} />
                )}
              </FormItem>
              <FormItem {...layout} label={<FormattedMessage id="COMPANY_FAX" />} >
                {getFieldDecorator('fax', { rules: [{ required: true, message: <FormattedMessage id="REQUIRED_INPUT" /> }] })(
                  <Input placeholder={placeholder} />
                )}
              </FormItem>
              <FormItem {...layout} label={<FormattedMessage id="SKYPE" />} >
                {getFieldDecorator('skype', { rules: [{ required: true, message: <FormattedMessage id="REQUIRED_INPUT" /> }] })(
                  <Input placeholder={placeholder} />
                )}
              </FormItem>
              <FormItem {...layout} label={<FormattedMessage id="OPENING_HOURS" />} >
                {getFieldDecorator('openHours', { rules: [{ required: true, message: <FormattedMessage id="REQUIRED_INPUT" /> }] })(
                  <Input placeholder={placeholder} />
                )}
              </FormItem>

              {/* --------------------------------------------------------------------------------------------------------------------------------------- */}
              <span className="text-strike"><FormattedMessage id="LOGO" /></span>

              <FormItem {...layout} label={<FormattedMessage id="HEADER_LOGO" />}>
                {getFieldDecorator('headerLogo',
                  {
                    valuePropName: 'fileList',
                    getValueFromEvent: (e) => (Array.isArray(e) ? e : e && e.fileList),
                    rules: [{ required: true, message: <FormattedMessage id="REQUIRED_INPUT" /> }]
                  })(
                    <Upload listType="picture-card">
                      <div>
                        <Icon type="plus" />
                        <div className="ant-upload-text"><FormattedMessage id="ACT_UPLOAD" /></div>
                      </div>
                    </Upload>
                  )}
              </FormItem>
              <FormItem {...layout} label={<FormattedMessage id="FOOTER_LOGO" />}>
                {getFieldDecorator('footerLogo',
                  {
                    valuePropName: 'fileList',
                    getValueFromEvent: (e) => (Array.isArray(e) ? e : e && e.fileList),
                    rules: [{ required: true, message: <FormattedMessage id="REQUIRED_INPUT" /> }]
                  })(
                    <Upload listType="picture-card">
                      <div>
                        <Icon type="plus" />
                        <div className="ant-upload-text"><FormattedMessage id="ACT_UPLOAD" /></div>
                      </div>
                    </Upload>
                  )}
              </FormItem>

              {/* --------------------------------------------------------------------------------------------------------------------------------------- */}
              <span className="text-strike"><FormattedMessage id="BUSSINESS_ADDRESS" /></span>

              <FormItem {...layout} label={<FormattedMessage id="ADDRESS_LINE_1" />} >
                {getFieldDecorator('addressLineF', { rules: [{ required: true, message: <FormattedMessage id="REQUIRED_INPUT" /> }] })(
                  <Input.TextArea rows={3} placeholder={placeholder} />
                )}
              </FormItem>
              <FormItem {...layout} label={<FormattedMessage id="ADDRESS_LINE_2" />} >
                {getFieldDecorator('addressLineS', { rules: [{ required: true, message: <FormattedMessage id="REQUIRED_INPUT" /> }] })(
                  <Input.TextArea rows={3} placeholder={placeholder} />
                )}
              </FormItem>
              <FormItem {...layout} label={<FormattedMessage id="COPYRIGHT" />} >
                {getFieldDecorator('copyright', { rules: [{ required: true, message: <FormattedMessage id="REQUIRED_INPUT" /> }] })(
                  <Input placeholder={placeholder} />
                )}
              </FormItem>

              {/* --------------------------------------------------------------------------------------------------------------------------------------- */}
              <span className="text-strike"><FormattedMessage id="SOCIAL_MEDIA" /></span>

              <FormItem {...layout} label={<FormattedMessage id="FACEBOOK_LINK" />} >
                {getFieldDecorator('fbLink', { rules: [{ required: true, message: <FormattedMessage id="REQUIRED_INPUT" /> }] })(
                  <Input placeholder={placeholder} />
                )}
              </FormItem>
              <FormItem {...layout} label={<FormattedMessage id="INSTAGRAM_LINK" />} >
                {getFieldDecorator('insLink', { rules: [{ required: true, message: <FormattedMessage id="REQUIRED_INPUT" /> }] })(
                  <Input placeholder={placeholder} />
                )}
              </FormItem>
              <FormItem {...layout} label={<FormattedMessage id="TWITTER_LINK" />} >
                {getFieldDecorator('twLink', { rules: [{ required: true, message: <FormattedMessage id="REQUIRED_INPUT" /> }] })(
                  <Input placeholder={placeholder} />
                )}
              </FormItem>
              <FormItem {...layout} label={<FormattedMessage id="YOUTUBE_LINK" />} >
                {getFieldDecorator('ytbLink', { rules: [{ required: true, message: <FormattedMessage id="REQUIRED_INPUT" /> }] })(
                  <Input placeholder={placeholder} />
                )}
              </FormItem>
              <FormItem {...layout} label={<FormattedMessage id="GOOGLE_LINK" />} >
                {getFieldDecorator('gpLink', { rules: [{ required: true, message: <FormattedMessage id="REQUIRED_INPUT" /> }] })(
                  <Input placeholder={placeholder} />
                )}
              </FormItem>
              <FormItem {...tailLayout}>
                <Button type="primary" onClick={this.onSubmit}><FormattedMessage id="ACT_SAVE" /></Button>
              </FormItem>
            </Form>
          </div>
          <div className="col-md-6">
            <span className="text-strike"><FormattedMessage id="LOCATION" /></span>
            <Location />
          </div>
        </div>
      </div>
    )
  }
}

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default injectIntl(Form.create()(CompanyProfile));