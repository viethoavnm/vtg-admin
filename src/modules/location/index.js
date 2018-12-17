import React from 'react';
import Country from './Country';
import Province from './Province';
import { injectIntl } from 'react-intl';
import './Location.css';

const LocationWrapper = ({ intl }) => (
  <div className="container-fluid">
    <Country intl={intl} />
    <Province intl={intl} />
  </div>
)

export default injectIntl(LocationWrapper)