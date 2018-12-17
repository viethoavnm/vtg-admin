import React from 'react';
import Spin from 'antd/lib/spin';

export default (props) => {
  return (<div className="loading">
    {props.error
      ? <div>Error! <button onClick={props.retry}>Retry</button></div>
      : <Spin size="large" />}
  </div>);
}