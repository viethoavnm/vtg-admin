import React from 'react';
import { normFile } from '../../utils';
import Prompt from 'components/Prompt';
import { Upload } from '../common/components';
import { FormattedMessage } from 'react-intl';
import { createProvince, updateProvince } from './services'
import { RESOURCES_PATH } from '../common/constants';
import { Modal, Button, Form, Input, Icon, Select, message } from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class ProvinceModal extends React.Component {
  state = { loading: false }

  onClose = () => {
    if (!this.state.loading)
      this.props.toggle()
  }

  onSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          ...this.props.data,
          ...values,
          adsList: [
            { adsUrl: values.url1, name: values.ads1[0].response.name },
            { adsUrl: values.url2, name: values.ads2[0].response.name }],
          contentNames: values.contentNames.map(({ response }) => (response.name))
        }
        delete data.ads1
        delete data.ads2
        delete data.url1
        delete data.url2
        const onSuccess = () => {
          message.success(this.props.t(this.props.addMode
            ? 'PROVINCE_ADD_DONE'
            : 'PROVINCE_UPDATE_DONE'));
          this.setState({ loading: false }, this.onClose)
        }
        const onFail = () => {
          message.error(this.props.t(this.props.addMode
            ? 'PROVINCE_ADD_EXITS'
            : 'PROVINCE_MODIFY_EXITS'));
          this.setState({ loading: false })
        }
        if (this.props.addMode)
          createProvince(data)
            .then(onSuccess)
            .catch(onFail)
        else
          updateProvince(data)
            .then(onSuccess)
            .catch(onFail)
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.show && this.props.show) {
      const { data } = this.props;
      if (this.props.addMode)
        this.props.form.resetFields(
          ['name',
            'slogan',
            'latitude',
            'longitude',
            'introduction',
            'contentNames',
            'countryId',
            'url1',
            'url2',
            'ads1',
            'ads2'])
      else
        this.props.form.setFieldsValue({
          name: data.name,
          slogan: data.slogan,
          latitude: data.latitude,
          longitude: data.longitude,
          countryId: data.countryId,
          introduction: data.introduction,
          url1: data.adsList[0] ? data.adsList[0].adsUrl : undefined,
          url2: data.adsList[1] ? data.adsList[1].adsUrl : undefined,
          ads1: data.adsList[0] ? [{ uid: data.adsList[0].name, url: RESOURCES_PATH + data.adsList[0].name, response: { name: data.adsList[0].name } }] : [],
          ads2: data.adsList[1] ? [{ uid: data.adsList[1].name, url: RESOURCES_PATH + data.adsList[1].name, response: { name: data.adsList[1].name } }] : [],
          contentNames: data.contentNames ? data.contentNames.filter((i) => (!!i)).map((id) => ({ uid: id, url: RESOURCES_PATH + id, response: { name: id } })) : []
        })
    }
  }

  render = () => {
    const { show, form, addMode } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        centered
        visible={show}
        onCancel={this.onClose}
        title={<FormattedMessage id={addMode ? "ADD_CITY" : "MODIFY_CITY"} />}
        footer={[
          <Button key="back" onClick={this.onClose}>
            <FormattedMessage id="ACT_CANCEL" />
          </Button>,
          <Button key="submit" type="primary" onClick={this.onSubmit}>
            <FormattedMessage id={addMode ? "ACT_ADD" : "ACT_SAVE"} />
          </Button>
        ]}>
        <Form>
          <Prompt when={show} hide callback={this.props.toggle} />
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="CITY_NAME" />}>
            {getFieldDecorator('name',
              { rules: [{ required: true, message: this.props.t('INPUT_REQUIRED') }] })(
                <Input maxLength={50} />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="COUNTRY_NAME" />}>
            {getFieldDecorator('countryId',
              { rules: [{ required: true, message: this.props.t('INPUT_REQUIRED') }] })(
                <Select>
                  {this.props.countries.map(({ name, id }) => (
                    <Select.Option key={id} value={id}>{name}</Select.Option>
                  ))}
                </Select>
              )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="SLOGAN" />}>
            {getFieldDecorator('slogan',
              { rules: [{ required: true, message: this.props.t('INPUT_REQUIRED') }] })(
                <Input maxLength={100} />)}
          </FormItem>
          <FormItem
            style={{ display: 'none' }}
            {...formItemLayout}
            label={<FormattedMessage id="LOCATION" />}>
            {getFieldDecorator('latitude')(<Input />)}
          </FormItem>
          <FormItem
            style={{ display: 'none' }}
            {...formItemLayout}
            label={<FormattedMessage id="LOCATION" />}>
            {getFieldDecorator('longitude')(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="IMG_BANNER" />}>
            {getFieldDecorator('contentNames', {
              valuePropName: 'fileList',
              getValueFromEvent: normFile,
              rules: [{ required: true, message: this.props.t('INPUT_REQUIRED') }]
            })(
              <Upload listType="picture" multiple>
                <Button>
                  <Icon type="upload" /><FormattedMessage id="ACT_UPLOAD" />
                </Button>
              </Upload>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="IMG_ADS_1" />}>
            {getFieldDecorator('ads1', {
              valuePropName: 'fileList',
              getValueFromEvent: normFile,
              rules: [{ required: true, message: this.props.t('INPUT_REQUIRED') }]
            })(
              <Upload listType="picture" multiple>
                <Button>
                  <Icon type="upload" /><FormattedMessage id="ACT_UPLOAD" />
                </Button>
              </Upload>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="LINK_ADS_1" />}>
            {getFieldDecorator('url1', { rules: [{ required: true, message: this.props.t('INPUT_REQUIRED') }] })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="IMG_ADS_2" />}>
            {getFieldDecorator('ads2', {
              valuePropName: 'fileList',
              getValueFromEvent: normFile,
              rules: [{ required: true, message: this.props.t('INPUT_REQUIRED') }]
            })(
              <Upload listType="picture">
                <Button>
                  <Icon type="upload" /><FormattedMessage id="ACT_UPLOAD" />
                </Button>
              </Upload>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="LINK_ADS_2" />}>
            {getFieldDecorator('url2', { rules: [{ required: true, message: this.props.t('INPUT_REQUIRED') }] })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="DESCRIPTION" />}>
            {getFieldDecorator('introduction')(<Input.TextArea rows={3} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(ProvinceModal);

