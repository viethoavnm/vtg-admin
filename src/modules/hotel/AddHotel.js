import React from 'react';
import { Icon, Form, Input, Button, message } from 'antd';
import { FormattedMessage } from 'react-intl';
import Upload from '../common/components/Upload';
import { createHotel } from './HotelServices';
import './Hotel.css';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

class CreateHotel extends React.Component {
  state = { loading: false }
  onSubmit = () => {
    this.form.props.form.validateFields((err, values) => {
      if (!err) {
        const model = { ...values, contentNames: values.contentNames.map((file) => (file.response.name)) }
        this.create(model);
      }
    });
  }

  create = (hotel) => {
    this.setState({ loading: true })
    createHotel({ ...hotel, hotelType: 'KHACH_SAN' })
      .then(() => {
        this.form.props.form.resetFields();
        this.setState({ loading: false })
        message.success('Tạo thành công!')
      })
      .catch(() => {
        this.setState({ loading: false })
        message.error('Tạo thất bại!')
      });
  }

  render() {
    return (
      <div className="container-fluid create-hotel">
        <div className="create-hotel__title">
          Thêm khách sạn
        </div>
        <FormWrapper placeholder={"Input..."} wrappedComponentRef={(form) => this.form = form} />
        <div className="create-hotel__right">
          <Button type="dashed" onClick={this.onSubmit} loading={this.state.loading}>Thêm khách sạn</Button>
        </div>
      </div >)
  }
}

class FormInput extends React.PureComponent {
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  render = () => {
    const { form, placeholder } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label={'Tên khách sạn'}>
          {getFieldDecorator('name', { rules: [{ required: true }] })(
            <Input placeholder={placeholder} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'Địa chỉ'}>
          {getFieldDecorator('address', { rules: [{ required: true }] })(
            <Input placeholder={placeholder} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'Slogan'}>
          {getFieldDecorator('slogan', { rules: [{ required: true }] })(
            <Input placeholder={placeholder} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'Giới thiệu về khách sạn'}>
          {getFieldDecorator('introduction', { rules: [{ required: true }] })(
            <TextArea placeholder={placeholder} rows={5} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'Ảnh về khách sạn'}>
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

export default CreateHotel;