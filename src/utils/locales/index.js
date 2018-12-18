/*
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LocaleProvider } from 'antd';
import { addLocaleData, IntlProvider } from 'react-intl/lib/index';
import 'moment/locale/vi';

const DEFAULT_LANG = 'en';

const locale = require(`react-intl/locale-data/en`);
const messages = require(`./${DEFAULT_LANG}.json`);
const viVN = require('antd/lib/locale-provider/vi_VN');
// const enUS = require('antd/lib/locale-provider/en_US');

class IntlWrapper extends React.Component {
  constructor(props) {
    super(props);
    addLocaleData(locale);
    this.state = { locale: DEFAULT_LANG, messages };
    this.loadAsync(props.locale);
  }
  async loadAsync(lang) {
    const locale = await import(`react-intl/locale-data/${lang}`);
    addLocaleData(locale);
  }

  render() {
    const { locale, messages } = this.state;
    return (
      <IntlProvider
        locale={locale}
        messages={messages}>
        <LocaleProvider locale={viVN}>
          {React.Children.only(this.props.children)}
        </LocaleProvider>
      </IntlProvider>
    );
  }
}


IntlWrapper.propTypes = {
  locale: PropTypes.string,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = (state) => ({ locale: state.common.locale });

export default connect(mapStateToProps)(IntlWrapper);
