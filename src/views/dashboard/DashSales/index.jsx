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
    { title: 'Total Revenue', primaryText: '$' + dashboardInfo?.totalAmount },
    { title: 'Total Users', primaryText: dashboardInfo?.totalUsers },
    { title: 'Active Subscriptions', primaryText: dashboardInfo?.totalSubscriptions },
    { title: 'Total Coupons', primaryText: dashboardInfo?.totalCoupons },
    { title: 'Total Feedbacks', primaryText: dashboardInfo?.totalFeedbacks }
  ];

  return (
    <Row>
      <Col md={ 12 } xl={ 12 }>
        <Row>
          { productCards.map((card, idx) => (
            <Col sm={ 4 } key={ card.title }>
              <ProductCard
                params={ {
                  title: card.title,
                  primaryText: card.primaryText,
                  icon: getIconByTitle(card.title)
                } }
              />
            </Col>
          )) }
        </Row>
        {/* Feed Table */ }
        {/* <FeedTable {...feedData} /> */ }
      </Col>
      {/* <Col md={ 12 } xl={ 6 }>
        <Card>
          <Card.Header>
            <h5>Earning</h5>
          </Card.Header>
          <Card.Body>
            <Row className="pb-2">
            </Row>
            <Chart { ...SalesAccountChartData() } />
          </Card.Body>
        </Card>
      </Col> */}
      {/* <Col md={ 12 } xl={ 6 }>
        <Card>
          <Card.Header>
            <h5>Users</h5>
          </Card.Header>
          <Card.Body>
            <Row className="pb-2">
            </Row>
            <Chart { ...SalesAccountChartData() } />
          </Card.Body>
        </Card>
      </Col>
      <Col md={ 12 } xl={ 6 }>
        <Card>
          <Card.Header>
            <h5>Feedback</h5>
          </Card.Header>
          <Card.Body>
            <Row className="pb-2">
            </Row>
            <Chart { ...SalesAccountChartData() } />
          </Card.Body>
        </Card>
      </Col>
      <Col md={ 12 } xl={ 6 }>
        <Card>
          <Card.Header>
            <h5>Coupons</h5>
          </Card.Header>
          <Card.Body>
            <Row className="pb-2">
            </Row>
            <Chart { ...SalesAccountChartData() } />
          </Card.Body>
        </Card>
      </Col> */}
    </Row>
  );
}
