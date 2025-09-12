import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const FeaturesPage = () => {
    const features = [
        {
            title: "Responsive Design",
            description: "Our landing page adapts seamlessly to all device sizes, ensuring a perfect experience on mobile, tablet, and desktop.",
            icon: "📱"
        },
        {
            title: "Modern UI Components",
            description: "Beautifully designed components with smooth animations and transitions for an engaging user experience.",
            icon: "✨"
        },
        {
            title: "Fast Performance",
            description: "Optimized for speed with minimal loading times and efficient resource management.",
            icon: "⚡"
        },
        {
            title: "Customizable",
            description: "Easily customize colors, fonts, and layouts to match your brand identity without coding knowledge.",
            icon: "🎨"
        },
        {
            title: "SEO Friendly",
            description: "Built with search engine optimization best practices to help your page rank higher in search results.",
            icon: "🔍"
        },
        {
            title: "Analytics Integration",
            description: "Track user behavior and measure conversion rates with built-in analytics integration.",
            icon: "📊"
        }
    ];

    return (
        <div className="features-page" style={ { padding: '60px 0', backgroundColor: '#f8f9fa' } }>
            <Container>
                <Row className="justify-content-center mb-5">
                    <Col lg={ 8 } className="text-center">
                        <h1 className="display-4 fw-bold mb-3">Powerful Features</h1>
                        <p className="lead text-muted">
                            Discover all the amazing features that make our product stand out from the competition.
                            Designed with user experience and performance in mind.
                        </p>
                    </Col>
                </Row>

                <Row>
                    { features.map((feature, index) => (
                        <Col md={ 6 } lg={ 4 } className="mb-4" key={ index }>
                            <Card className="h-100 border-0 shadow-sm feature-card">
                                <Card.Body className="p-4">
                                    <div className="feature-icon mb-3" style={ { fontSize: '2.5rem' } }>
                                        { feature.icon }
                                    </div>
                                    <h4 className="fw-bold mb-3">{ feature.title }</h4>
                                    <p className="text-muted">{ feature.description }</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    )) }
                </Row>

                <Row className="mt-5">
                    <Col className="text-center">
                        <div className="cta-section p-5 rounded" style={ { backgroundColor: '#0d6efd', color: 'white' } }>
                            <h3 className="fw-bold mb-3">Ready to get started?</h3>
                            <p className="mb-4">Join thousands of satisfied customers using our product</p>
                            <button className="btn btn-light btn-lg px-4 py-2 fw-bold">Get Started Now</button>
                        </div>
                    </Col>
                </Row>
            </Container>

            <style>{ `
        .feature-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
      `}</style>
        </div>
    );
};

export default FeaturesPage;