import React from 'react';
import injectIntl from 'intl';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Button, message } from 'antd';
import { putSetting, getSetting } from './settingServices';
import Editor from 'components/Editor';
import './Settings.less';

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
  state = { loading: false };
  onSubmit = () => {
    this.setState({ loading: true })
    const { mode } = this.props;
    const data = { id: LIST[mode], name: mode, value: this.state.content, }
    putSetting(data)
      .then(() => {
        message.success(this.props.t('DONE'));
        this.setState({ loading: false });
      })
      .catch(() => {
        message.error(this.props.t('ERROR'));
        this.setState({ loading: false });
      })
  }

  onModelChange = (content) => {
    this.setState({ content })
  }

  componentDidMount() {
    getSetting(LIST[this.props.mode])
      .then(({ value }) => {
        this.setState({ content: value })
      })
  }

  render() {
    const { content } = this.state;
    return (
      <div className="container-fluid">
        <span className="text-strike"><FormattedMessage id={this.props.mode} /></span>
        <div style={{ padding: '16px 0' }}>
          <Editor
            model={content}
            onModelChange={this.onContentChange} />
        </div>
        <div style={{ float: "right" }}>
          <Button
            type="primary"
            onClick={this.onSubmit}
            loading={this.state.loading}>
            <FormattedMessage id="ACT_SAVE" />
          </Button>
        </div>
      </div>
    )
  }
}

export default withRouter(injectIntl(CompanyProfile));