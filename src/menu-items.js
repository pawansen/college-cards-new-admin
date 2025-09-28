// Menu configuration for default layout
const menuItems = {
  items: [
    // {
    //   id: 'navigation',
    //   title: 'Dashboard',
    //   type: 'group',
    //   icon: 'icon-navigation',
    //   children: [
    //     {
    //       id: 'dashboard',
    //       title: 'Dashboard',
    //       type: 'collapse',
    //       icon: 'material-icons-two-tone',
    //       iconname: 'home',
    //       url: '/dashboard',
    //     }
    //   ]
    // },
    {
      id: 'ui-element',
      title: '',
      // subtitle: 'UI Components',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'material-icons-two-tone',
          iconname: 'home',
          url: '/dashboard'
        },
        {
          id: 'users',
          title: 'Users',
          type: 'item',
          icon: 'material-icons-two-tone',
          iconname: 'people_alt',
          url: '/users'
        },
        {
          id: 'coupons',
          title: 'Coupon',
          type: 'item',
          icon: 'material-icons-two-tone',
          iconname: 'local_offer',
          url: '/coupons'
        },
        {
          id: 'cities',
          title: 'Cities',
          type: 'item',
          icon: 'material-icons-two-tone',
          iconname: 'location_city',
          url: '/cities'
        },
        {
          id: 'user-subscriptions',
          title: 'User Subscriptions',
          type: 'item',
          icon: 'material-icons-two-tone',
          iconname: 'subscriptions',
          url: '/user-subscriptions'
        },
        {
          id: 'packages',
          title: 'Subscription Plan',
          type: 'item',
          icon: 'material-icons-two-tone',
          iconname: 'subscriptions',
          url: '/packages'
        },
        {
          id: 'feedback',
          title: 'Feedback',
          type: 'item',
          icon: 'material-icons-two-tone',
          iconname: 'feedback',
          url: '/feedback'
        },
        {
          id: 'promocode',
          title: 'Promo Code',
          type: 'item',
          icon: 'material-icons-two-tone',
          iconname: 'confirmation_number',
          url: '/promocode'
        },
        {
          id: 'restaurants-logo',
          title: 'Restaurants Logo',
          type: 'item',
          icon: 'material-icons-two-tone',
          iconname: 'restaurants_logo',
          url: '/restaurants-logo'
        },
        {
          id: 'referrals',
          title: 'Referrals',
          type: 'item',
          icon: 'material-icons-two-tone',
          iconname: 'group_add',
          url: '/referrals'
        },

        {
          id: 'notification',
          title: 'Notification',
          type: 'item',
          icon: 'material-icons-two-tone',
          iconname: 'notifications',
          url: '/notification'
        },
        {
          id: 'version-update',
          title: 'Version Update',
          type: 'item',
          icon: 'material-icons-two-tone',
          iconname: 'update',
          url: '/version-update'
        },
        {
          id: 'settings',
          title: 'Content Settings',
          type: 'item',
          icon: 'material-icons-two-tone',
          iconname: 'settings',
          url: '/settings'
        },
        // {
        //   id: 'typography',
        //   title: 'Typography',
        //   type: 'item',
        //   icon: 'material-icons-two-tone',
        //   iconname: 'text_fields',
        //   url: '/typography'
        // },
        // {
        //   id: 'color',
        //   title: 'Color',
        //   type: 'item',
        //   icon: 'material-icons-two-tone',
        //   iconname: 'color_lens',
        //   url: '/color'
        // },
        // {
        //   id: 'icons',
        //   title: 'Icons',
        //   type: 'collapse',
        //   icon: 'material-icons-two-tone',
        //   iconname: 'history_edu',
        //   children: [
        //     {
        //       id: 'feather',
        //       title: 'Feather',
        //       type: 'item',
        //       url: '/icons/Feather'
        //     },
        //     {
        //       id: 'font-awesome-5',
        //       title: 'Font Awesome',
        //       type: 'item',
        //       url: '/icons/font-awesome-5'
        //     },
        //     {
        //       id: 'material',
        //       title: 'Material',
        //       type: 'item',
        //       url: '/icons/material'
        //     }
        //   ]
        // }
      ]
    },
    // {
    //   id: 'pages',
    //   title: 'Session',
    //   subtitle: '',
    //   type: 'group',
    //   icon: 'icon-pages',
    //   children: [
    //     // {
    //     //   id: 'login',
    //     //   title: 'Logout',
    //     //   type: 'item',
    //     //   icon: 'material-icons-two-tone',
    //     //   iconname: 'chrome_reader_mode',
    //     //   url: '/logout',
    //     //   target: true
    //     // },
    //     // {
    //     //   id: 'login',
    //     //   title: 'Login',
    //     //   type: 'item',
    //     //   icon: 'material-icons-two-tone',
    //     //   iconname: 'verified_user',
    //     //   url: '/login',
    //     //   target: true
    //     // },
    //     // {
    //     //   id: 'register',
    //     //   title: 'Register',
    //     //   type: 'item',
    //     //   icon: 'material-icons-two-tone',
    //     //   iconname: 'person_add_alt_1',
    //     //   url: '/register',
    //     //   target: true
    //     // }
    //   ]
    // },
    // {
    //   id: 'support',
    //   title: 'OTHER',
    //   subtitle: 'Extra More Things',
    //   type: 'group',
    //   icon: 'icon-support',
    //   children: [
    //     {
    //       id: 'sample-page',
    //       title: 'Sample Page',
    //       type: 'item',
    //       url: '/sample-page',
    //       classes: 'nav-item',
    //       icon: 'material-icons-two-tone',
    //       iconname: 'storefront'
    //     },
    //     {
    //       id: 'menu-level',
    //       title: 'Menu Levels',
    //       type: 'collapse',
    //       icon: 'material-icons-two-tone',
    //       iconname: 'list_alt',
    //       children: [
    //         {
    //           id: 'menu-level-1.1',
    //           title: 'Level 1.1',
    //           type: 'item',
    //           url: '#'
    //         },
    //         {
    //           id: 'menu-level-1.2',
    //           title: 'Level 2.2',
    //           type: 'collapse',
    //           children: [
    //             {
    //               id: 'menu-level-2.1',
    //               title: 'Level 2.1',
    //               type: 'item',
    //               url: '#'
    //             },
    //             {
    //               id: 'menu-level-2.2',
    //               title: 'Level 2.2',
    //               type: 'collapse',
    //               children: [
    //                 {
    //                   id: 'menu-level-3.1',
    //                   title: 'Level 3.1',
    //                   type: 'item',
    //                   url: '#'
    //                 },
    //                 {
    //                   id: 'menu-level-3.2',
    //                   title: 'Level 3.2',
    //                   type: 'item',
    //                   url: '#'
    //                 }
    //               ]
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       id: 'disabled-menu',
    //       title: 'Disabled Menu',
    //       type: 'item',
    //       url: '#',
    //       classes: 'nav-item disabled',
    //       icon: 'material-icons-two-tone',
    //       iconname: 'power_off'
    //     }
    //   ]
    // }
  ]
};

export default menuItems;
