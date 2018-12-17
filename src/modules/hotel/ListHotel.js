import React from 'react';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

export default class HotelList extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="bgc-white bd bdrs-3 p-20 mB-20">
              <div className="table-toolbar">
                <span className="toolbar-left"><FormattedMessage id="LIST_OF_HOTELS" /></span>
                <span className="toolbar-right">
                  <Link to="/hotel/create">
                    <Button type="primary">
                      <FormattedMessage id="ADD_HOTEL" />
                    </Button>
                  </Link>
                </span>
              </div>
              <Table rowKey="id" columns={[]} dataSource={[]} />
            </div>
          </div>
        </div>
      </div>)
  }
}