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
      hide: true,
      url: '/blog',
      title: 'MENU_BLOG',
      props: { mode: 'VIEW_MODE' },
      component: 'Blog',
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
  subComponent: [{
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