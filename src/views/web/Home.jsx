import { lazy } from 'react';
import { Container, Row, Col, Button, Navbar, Nav, Card } from "react-bootstrap";
import "./Home.css"; // Custom CSS for extra styling
import logoDark from "assets/images/logo.png";
const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));
export default function HomePage() {
    return (
        <div className="nexa-bg">
            {/* Header/Navbar */ }
            <Header />

            {/* Hero Section */ }
            <section id="hero" className="nexa-hero d-flex align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={ 8 } className="text-center">
                            <h1 className="display-4 fw-bold">Welcome to College Card</h1>
                            <p className="lead mb-4">
                                We are a creative agency focused on growing brands online.
                            </p>
                            <Button variant="primary" size="lg">Get Started</Button>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* About Section */ }
            <section id="about" className="py-5 bg-white">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={ 8 } className="text-center">
                            <h2 className="fw-bold mb-3">About Us</h2>
                            <p>
                                Nexa is a modern digital agency providing top-notch solutions for your business. Our team is passionate about delivering quality and value.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Services Section */ }
            <section id="services" className="py-5">
                <Container>
                    <h2 className="fw-bold text-center mb-5">Our Services</h2>
                    <Row className="g-4">
                        <Col md={ 4 }>
                            <Card className="h-100 text-center border-0 shadow-sm">
                                <Card.Body>
                                    <div className="nexa-icon mb-3">
                                        <i className="bi bi-laptop"></i>
                                    </div>
                                    <Card.Title>Web Design</Card.Title>
                                    <Card.Text>
                                        Modern and responsive web design for your business.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={ 4 }>
                            <Card className="h-100 text-center border-0 shadow-sm">
                                <Card.Body>
                                    <div className="nexa-icon mb-3">
                                        <i className="bi bi-bar-chart"></i>
                                    </div>
                                    <Card.Title>Marketing</Card.Title>
                                    <Card.Text>
                                        Grow your audience with our digital marketing solutions.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={ 4 }>
                            <Card className="h-100 text-center border-0 shadow-sm">
                                <Card.Body>
                                    <div className="nexa-icon mb-3">
                                        <i className="bi bi-phone"></i>
                                    </div>
                                    <Card.Title>App Development</Card.Title>
                                    <Card.Text>
                                        Custom mobile apps to engage your customers.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Contact Section */ }
            <section id="contact" className="py-5 bg-white">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={ 8 }>
                            <h2 className="fw-bold text-center mb-4">Contact Us</h2>
                            <form>
                                <Row className="mb-3">
                                    <Col md={ 6 }>
                                        <input type="text" className="form-control" placeholder="Your Name" required />
                                    </Col>
                                    <Col md={ 6 }>
                                        <input type="email" className="form-control" placeholder="Your Email" required />
                                    </Col>
                                </Row>
                                <textarea className="form-control mb-3" rows={ 4 } placeholder="Message" required />
                                <div className="text-center">
                                    <Button variant="primary" type="submit">Send Message</Button>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Footer */ }
            <Footer />
        </div>
    );
}
