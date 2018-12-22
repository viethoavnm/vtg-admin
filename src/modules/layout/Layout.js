import React from 'react';
import { Layout } from 'antd';
import Header from '../common/components/Header';
import Sider from '../common/components/Sider';
import Footer from '../common/components/Footer';
import Loading from '../common/components/Loading';
import { connect } from 'react-redux';
import './Layout.less';

const { Content } = Layout;

class AppLayout extends React.PureComponent {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider />
        <Layout className="page-container">
          <Header />
          <Content className='main-content'>
            <div id='mainContent'>
              {this.props.children}
            </div>
          </Content>
          <Footer />
        </Layout>
        {this.props.loading && <Loading />}
      </Layout>)
  }
};

const mapProps = (state) => ({
  loading: state.common.loadingCount !== 0
})

export default connect(mapProps)(AppLayout);