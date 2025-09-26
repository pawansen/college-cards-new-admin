import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card } from 'react-bootstrap';
import Chart from 'react-apexcharts';
// project imports
// import FlatCard from 'components/Widgets/Statistic/FlatCard';
import ProductCard from 'components/Widgets/Statistic/ProductCard';
// import FeedTable from 'components/Widgets/FeedTable';
// import ProductTable from 'components/Widgets/ProductTable';
// import { SalesCustomerSatisfactionChartData } from './chart/sales-customer-satisfication-chart';
import { SalesAccountChartData } from './chart/sales-account-chart';
// import { SalesSupportChartData } from './chart/sales-support-chart';
// import { SalesSupportChartData1 } from './chart/sales-support-chart1';
// import feedData from 'data/feedData';
// import productData from 'data/productTableData';
import { fetchDashboard } from "../../../store/userSlice";

// -----------------------|| DASHBOARD SALES ||-----------------------//
export default function DashSales() {
  const dispatch = useDispatch();
  const [initState, setInitState] = useState(false);
  const { dashboardInfo } = useSelector((state) => state.user);
  useEffect(() => {
    if (!initState) {
      dispatch(fetchDashboard());
      setInitState(true);
    }
  }, [dispatch, initState]);
  // Helper to map title to icon
  const getIconByTitle = (title) => {
    switch (title) {
      case 'Total Revenue':
        return 'attach_money';
      case 'Total Users':
        return 'group';
      case 'Active Subscriptions':
        return 'subscriptions';
      case 'Total Coupons':
        return 'local_offer';
      case 'Total Feedbacks':
        return 'feedback';
      default:
        return 'insert_chart';
    }
  };

  // Card data
  const productCards = [
    { title: 'Total Revenue', primaryText: '$' + (dashboardInfo?.totalAmount ? Number(dashboardInfo.totalAmount).toFixed(2) : '0.00') },
    { title: 'Total Users', primaryText: dashboardInfo?.totalUsers },
    { title: 'Total Deleted Users', primaryText: dashboardInfo?.totalDeletedUsers },
    { title: 'Total Active Users', primaryText: dashboardInfo?.totalActiveUsers },
    { title: 'Total Inactive Users', primaryText: dashboardInfo?.totalInactiveUsers },
    { title: 'Signup Users Count', primaryText: dashboardInfo?.signupUsersCount },
    { title: 'Total Coupons', primaryText: dashboardInfo?.totalCoupons },
    { title: 'Total Packages', primaryText: dashboardInfo?.totalPackages },
    { title: 'Total Promo Codes', primaryText: dashboardInfo?.totalPromoCodes },
    { title: 'Total Cities', primaryText: dashboardInfo?.totalCities },
    { title: 'Total Feedbacks', primaryText: dashboardInfo?.totalFeedbacks },
    { title: 'Total Replay Remaining Feedbacks', primaryText: dashboardInfo?.totalReplayRemainingFeedbacks },
    { title: 'Total Subscriptions', primaryText: dashboardInfo?.totalSubscriptions },
    { title: 'Total Active Subscriptions', primaryText: dashboardInfo?.totalActiveSubscriptions },
    { title: 'Total Inactive Subscriptions', primaryText: dashboardInfo?.totalInactiveSubscriptions },
    { title: 'All Subscribed Users Count', primaryText: dashboardInfo?.allSubscribedUsersCount },
    { title: 'Total Expired Subscriptions', primaryText: dashboardInfo?.totalExpiredSubscriptions },
    { title: 'Total Cancelled Subscriptions', primaryText: dashboardInfo?.totalCancelledSubscriptions },
    { title: 'Total Self Cancelled Subscriptions', primaryText: dashboardInfo?.totalSelfCancelledSubscriptionsCount }
  ];

  // Define colors for each card
  const cardColors = [
    "#4caf50", // Total Revenue - green
    "#2196f3", // Total Users - blue
    "#ff9800", // Active Subscriptions - orange
    "#9c27b0", // Total Coupons - purple
    "#f44336"  // Total Feedbacks - red
  ];

  // Define variants for each card
  const cardVariants = [
    "success",   // Total Revenue
    "info",      // Total Users
    "warning",   // Active Subscriptions
    "primary",    // Total Coupons (custom, if supported)
    "danger"     // Total Feedbacks
  ];

  return (
    <Row>
      <Col md={ 12 } xl={ 12 }>
        <Card>
          <Card.Body>
            <Row>
              { productCards.map((card, idx) => (
                <Col sm={ 4 } key={ card.title }>
                  <div>
                    <ProductCard
                      params={ {
                        variant: cardVariants[idx % cardVariants.length],
                        title: card.title,
                        primaryText: card.primaryText,
                        icon: getIconByTitle(card.title),
                        backgroundColor: cardColors[idx % cardColors.length]
                      } }
                    />
                  </div>
                </Col>
              )) }
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
