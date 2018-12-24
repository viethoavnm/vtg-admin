export const REDIRECT_URL = '/blog-management';

export default [{
  title: 'MENU_BLOG',
  url: '/blogs',
  icon: 'book',
  subComponent: [
    {
      url: '/blog-management',
      title: 'MENU_BLOG_MANAGEMENT',
      component: 'BlogManagement',
    },
    {
      url: '/blogs/categogy',
      title: 'MENU_BLOG_CATEGORY',
      component: 'BlogCategory',
    },
    {
      url: '/blogs/copyright',
      title: 'MENU_BLOG_COPYRIGHT',
      component: 'BlogCopyright',
    },
    {
      hide: true,
      url: '/blog/write',
      props: { mode: 'CREATE_MODE' },
      title: 'ADD_BLOG',
      component: 'Blog',
    },
    {
      hide: true,
      url: '/blog/modify',
      props: { mode: 'MODIFY_MODE' },
      title: 'MODIFY_BLOG',
      component: 'Blog',
    }
  ]
},
{
  url: '/locations',
  title: 'MENU_LOCATION',
  component: 'Location',
  icon: 'flag'
},
{
  url: '/places',
  title: 'MENU_TOURIST_PLACES',
  component: 'Places',
  icon: 'compass'
},
{
  url: '/custom-list',
  title: 'MENU_CUSTOM_LIST',
  component: 'CustomList',
  icon: 'profile'
},
{
  url: '/setting',
  title: 'SETTING',
  component: 'Setting',
  icon: 'setting',
  subComponent: [
    {
      url: '/setting/copyright',
      title: 'MENU_SETTING_COPYRIGHT',
      props: { mode: 'MENU_SETTING_COPYRIGHT' },
      component: 'SettingOther',
    },
    {
      url: '/setting/about',
      title: 'MENU_SETTING_ABOUT_US',
      props: { mode: 'MENU_SETTING_ABOUT_US' },
      component: 'SettingOther',
    },
    {
      url: '/setting/conditions',
      title: 'MENU_SETTING_CONDITIONS',
      props: { mode: 'MENU_SETTING_CONDITIONS' },
      component: 'SettingOther',
    },
    {
      url: '/setting/activity',
      title: 'MENU_SETTING_ACTIVITY',
      props: { mode: 'MENU_SETTING_ACTIVITY' },
      component: 'SettingOther',
    },
    {
      url: '/setting/support',
      title: 'MENU_SETTING_SUPPORT',
      props: { mode: 'MENU_SETTING_SUPPORT' },
      component: 'SettingOther',
    },
    {
      url: '/setting/contact',
      title: 'MENU_SETTING_CONTACT',
      props: { mode: 'MENU_SETTING_CONTACT' },
      component: 'SettingOther',
    },
    {
      url: '/setting/career',
      title: 'MENU_SETTING_CAREER',
      props: { mode: 'MENU_SETTING_CAREER' },
      component: 'SettingOther',
    },
    {
      url: '/setting/page-info',
      title: 'MENU_PAGE_INFO',
      component: 'SettingPageInfo',
    },
    {
      url: '/setting/company-profile',
      title: 'MENU_COMPANY_PROFILE',
      component: 'SettingCompanyProfile',
    }]
},
{
  hide: true,
  url: '/user-info',
  title: 'USER_INFO',
  component: 'UserInfo',
},
{
  hide: true,
  url: '/sign-out',
  title: 'SIGN_OUT',
  component: 'Logout',
},
{
  url: '/hotel',
  title: 'MENU_HOTEL',
  component: 'AddHotel',
  icon: 'bank'
},
{
  hide: true,
  url: '/hotel/create',
  title: 'MENU_HOTEL_CREATE',
  component: 'AddHotel',
}]