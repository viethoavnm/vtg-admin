import React from 'react';
import Header from '../common/components/Header';
import Sider from '../common/components/Sider';
import Footer from '../common/components/Footer';
import Loading from '../common/components/Loading';
import { connect } from 'react-redux';
import './Layout.css';

class AppLayout extends React.PureComponent {
  render() {
    return (<React.Fragment>
      <Sider />
      <div className="page-container">
        <Header />
        <main className='main-content'>
          <div id='mainContent'>
            {this.props.children}
          </div>
        </main>
        <Footer />
      </div>
      {this.props.loading && <Loading />}
    </React.Fragment>)
  }
};

const mapProps = (state) => ({
  loading: state.common.loadingCount !== 0
})

export default connect(mapProps)(AppLayout);