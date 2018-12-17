import loadable from 'react-loadable';
import { Loading } from './common/components';

export default {
  Loading,
  Login: loadable({
    loader: () => import('./auth/Login'),
    loading: Loading
  }),
  Logout: loadable({
    loader: () => import('./auth/Logout'),
    loading: Loading
  }),
  Location: loadable({
    loader: () => import('./location'),
    loading: Loading
  }),
  Places: loadable({
    loader: () => import('./places'),
    loading: Loading
  }),
  CustomList: loadable({
    loader: () => import('./custom-list'),
    loading: Loading
  }),
  Layout: loadable({
    loader: () => import('./layout'),
    loading: Loading
  }),
  Blog: loadable({
    loader: () => import('./blogs/blog'),
    loading: Loading
  }),
  BlogManagement: loadable({
    loader: () => import('./blogs/management'),
    loading: Loading
  }),
  BlogCategory: loadable({
    loader: () => import('./blogs/category'),
    loading: Loading
  }),
  BlogSetting: loadable({
    loader: () => import('./blogs/setting'),
    loading: Loading
  }),
  Setting: loadable({
    loader: () => import('./setting'),
    loading: Loading
  }),
  SettingPageInfo: loadable({
    loader: () => import('./setting/PageInfo'),
    loading: Loading
  }),
  SettingCompanyProfile: loadable({
    loader: () => import('./setting/ComanyProfile'),
    loading: Loading
  }),
  UserInfo: loadable({
    loader: () => import('./user-info'),
    loading: Loading
  }),
  ListHotel: loadable({
    loader: () => import('./hotel/ListHotel'),
    loading: Loading
  }),
  AddHotel: loadable({
    loader: () => import('./hotel/AddHotel'),
    loading: Loading
  })
}