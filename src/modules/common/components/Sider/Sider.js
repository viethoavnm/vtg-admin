import React from 'react';
import { Icon, Layout, Menu } from 'antd';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import PATH from '../../../../routerModule/path';

const Sider = Layout.Sider;
const SubMenu = Menu.SubMenu;

class AppSlider extends React.Component {
  state = { collapsed: false };

  onCollapse = (collapsed) => {
    const element = document.querySelector('#root');
    if (collapsed) {
      element.classList.add('is-collapsed');
    } else {
      element.classList.remove('is-collapsed');
    }
    this.setState({ collapsed });
  }

  onSelect = ({ key }) => {
    this.props.history.push(key);
  }

  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        className="sidebar"
        breakpoint="lg"
      >
        <div className="logo">
          <a href="/admin">
            <h2>Spetrip<span style={{ color: 'cornflowerblue' }}>.com</span></h2>
          </a>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[this.props.location.pathname]}
          onSelect={this.onSelect}
        >
          {PATH.map((menu) => {
            if (menu.hide) {
              return null;
            }
            if (menu.subComponent) {
              return (<SubMenu
                key={menu.url}
                title={<span><Icon type={menu.icon} /><FormattedMessage id={menu.title} /></span>}
              >
                {menu.subComponent.map((subMenu) => subMenu.hide
                  ? null
                  : (
                    <Menu.Item key={subMenu.url}>
                      <FormattedMessage id={subMenu.title} />
                    </Menu.Item>
                  ))}
              </SubMenu>)
            } else {
              return (
                <Menu.Item key={menu.url}>
                  <Icon type={menu.icon} />
                  <FormattedMessage id={menu.title} />
                </Menu.Item>)
            }
          })}
        </Menu>
      </Sider>
    );
  }
};

export default withRouter(AppSlider);