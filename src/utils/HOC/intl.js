import React from 'react';
import { injectIntl } from 'react-intl';

export default function inject(Component) {
  class WrappIntl extends React.Component {
    t = (id, values) => (this.props.intl.formatMessage({ id }, values))
    render() {
      <Component t={t} {...props} />
    }
  }
  WrappIntl.displayName = `Intl${getDisplayName(Component)}`;
  return injectIntl(WrappIntl)
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}