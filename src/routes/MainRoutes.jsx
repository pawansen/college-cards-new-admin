import { lazy } from 'react';
import { useSelector } from "react-redux";
import AdminLayout from 'layouts/AdminLayout';
import GuestLayout from 'layouts/GuestLayout';
const DashboardSales = lazy(() => import('../views/dashboard/DashSales/index'));
const Typography = lazy(() => import('../views/ui-elements/basic/BasicTypography'));
const Color = lazy(() => import('../views/ui-elements/basic/BasicColor'));
const FeatherIcon = lazy(() => import('../views/ui-elements/icons/Feather'));
const FontAwesome = lazy(() => import('../views/ui-elements/icons/FontAwesome'));
const MaterialIcon = lazy(() => import('../views/ui-elements/icons/Material'));
const Login = lazy(() => import('../views/auth/login'));
const Register = lazy(() => import('../views/auth/register'));
const Sample = lazy(() => import('../views/sample'));
const Users = lazy(() => import('../views/users/UsersTable'));
const Coupons = lazy(() => import('../views/coupons/CouponsTable'));
const AddCoupon = lazy(() => import('../views/coupons/AddCoupon'));
const EditCoupon = lazy(() => import('../views/coupons/EditCoupon'));
const Cities = lazy(() => import('../views/cities/CitiesTable'));
const UserSubscriptions = lazy(() => import('../views/user-subscriptions/UserSubscriptionsTable'));
const Feedback = lazy(() => import('../views/feedback/FeedbackTable'));
const Referrals = lazy(() => import('../views/referrals/ReferralsTable'));
const Promocode = lazy(() => import('../views/promocode/PromoTable'));
const Notification = lazy(() => import('../views/notification/NotificationTable'));
const UserInfo = lazy(() => import('../views/users/UserInfo'));
const AddCity = lazy(() => import('../views/cities/AddCity'));
const PrivacyPolicy = lazy(() => import('../views/web/PrivacyPolicy'));
const TermsOfService = lazy(() => import('../views/web/TermsOfService'));

const Packages = lazy(() => import('../views/package/PackageTable'));
const AddPackage = lazy(() => import('../views/package/AddPackage'));
const EditPackage = lazy(() => import('../views/package/EditPackage'));

// const Home = lazy(() => import('../views/web/Home'));
import PrivateRoute from './PrivateRoute';

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <PrivateRoute />, // Protect all admin routes
      children: [
        {
          path: '/',
          element: <AdminLayout />,
          children: [
            {
              path: '/dashboard',
              element: <DashboardSales />
            },
            {
              path: '/users',
              element: <Users />
            },
            {
              // Pass user_id as a URL param
              path: '/user-info/:user_id',
              element: <UserInfo />
            },
            {
              path: '/add-coupon',
              element: <AddCoupon />
            },
            {
              // Pass coupon_id as a URL param
              path: '/edit-coupon/:coupon_id',
              element: <EditCoupon />
            },
            {
              path: '/coupons',
              element: <Coupons />
            },

            {
              path: '/add-package',
              element: <AddPackage />
            },
            {
              // Pass package_id as a URL param
              path: '/edit-package/:package_id',
              element: <EditPackage />
            },
            {
              path: '/packages',
              element: <Packages />
            },
            {
              path: '/cities',
              element: <Cities />
            },
            {
              path: '/add-city',
              element: <AddCity />
            },
            {
              path: '/user-subscriptions',
              element: <UserSubscriptions />
            },
            {
              path: '/feedback',
              element: <Feedback />
            },
            {
              path: '/referrals',
              element: <Referrals />
            },
            {
              path: '/promocode',
              element: <Promocode />
            },
            {
              path: '/notification',
              element: <Notification />
            },
            {
              path: '/typography',
              element: <Typography />
            },
            {
              path: '/color',
              element: <Color />
            },
            {
              path: '/icons/Feather',
              element: <FeatherIcon />
            },
            {
              path: '/icons/font-awesome-5',
              element: <FontAwesome />
            },
            {
              path: '/icons/material',
              element: <MaterialIcon />
            },
            {
              path: '/sample-page',
              element: <Sample />
            },
            {
              path: '*',
              element: <h1>Not Found</h1>
            }
          ]
        }
      ]
    },
    {
      path: '/',
      element: <GuestLayout />,
      children: [
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/privacy-policy',
          element: <PrivacyPolicy />
        },
        {
          path: '/terms-of-service',
          element: <TermsOfService />
        },
        {
          path: '/register',
          element: <Register />
        },
        // {
        //   path: '/home',
        //   element: <Home />
        // }
      ]
    }
  ]
};

export default MainRoutes;
