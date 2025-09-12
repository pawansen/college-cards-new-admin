import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Navbar, Nav, Badge, Form, InputGroup, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const VouchersPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);

    const handleClose = () => setShowModal(false);
    const handleShow = (voucher) => {
        setSelectedVoucher(voucher);
        setShowModal(true);
    };

    const vouchers = [
        {
            id: 1,
            title: "Welcome Discount",
            code: "WELCOME20",
            discount: "20% OFF",
            description: "Get 20% off on your first order",
            validUntil: "2023-12-31",
            minPurchase: "$50",
            category: "All Products",
            usage: "One-time use"
        },
        {
            id: 2,
            title: "Free Shipping",
            code: "FREESHIP",
            discount: "Free Shipping",
            description: "Free shipping on orders over $75",
            validUntil: "2023-11-30",
            minPurchase: "$75",
            category: "All Products",
            usage: "Multiple uses"
        },
        {
            id: 3,
            title: "Summer Sale",
            code: "SUMMER25",
            discount: "25% OFF",
            description: "25% off on summer collection",
            validUntil: "2023-09-30",
            minPurchase: "$100",
            category: "Summer Collection",
            usage: "One-time use"
        },
        {
            id: 4,
            title: "Refer a Friend",
            code: "FRIEND10",
            discount: "10% OFF",
            description: "10% off when you refer a friend",
            validUntil: "2023-12-31",
            minPurchase: "$30",
            category: "All Products",
            usage: "One-time use"
        },
        {
            id: 5,
            title: "Clearance Event",
            code: "CLEARANCE30",
            discount: "30% OFF",
            description: "30% off on clearance items",
            validUntil: "2023-10-15",
            minPurchase: "$50",
            category: "Clearance",
            usage: "One-time use"
        },
        {
            id: 6,
            title: "Flash Sale",
            code: "FLASH40",
            discount: "40% OFF",
            description: "40% off for next 24 hours",
            validUntil: "2023-08-20",
            minPurchase: "$80",
            category: "Selected Items",
            usage: "One-time use"
        }
    ];

    const categories = ["All", "New Customer", "Seasonal", "Special Offers", "Clearance"];

    return (
        <>
            {/* Navigation */ }
            <Navbar bg="light" expand="lg" className="py-3 shadow-sm">
                <Container>
                    <Navbar.Brand href="#" className="fw-bold fs-3 text-primary">
                        <span className="text-danger">Voucher</span>Hub
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#" className="mx-2 fw-medium">Home</Nav.Link>
                            <Nav.Link href="#" className="mx-2 fw-medium active">Vouchers</Nav.Link>
                            <Nav.Link href="#" className="mx-2 fw-medium">How It Works</Nav.Link>
                            <Nav.Link href="#" className="mx-2 fw-medium">FAQ</Nav.Link>
                            <Button variant="primary" className="ms-3 px-4 fw-medium">Sign In</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Hero Section */ }
            <section className="py-5 bg-gradient" style={ { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' } }>
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={ 8 }>
                            <h1 className="text-white display-4 fw-bold mb-4">Exclusive Vouchers & Discounts</h1>
                            <p className="text-white lead mb-4">Save big with our limited-time offers and special promotions</p>

                            <InputGroup size="lg" className="mb-3 shadow">
                                <Form.Control
                                    placeholder="Search vouchers by category or name..."
                                    aria-label="Search vouchers"
                                />
                                <Button variant="light" className="text-primary">
                                    Search
                                </Button>
                            </InputGroup>

                            <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
                                { categories.map((category, index) => (
                                    <Badge key={ index } bg="light" text="dark" className="px-3 py-2 rounded-pill fw-normal">
                                        { category }
                                    </Badge>
                                )) }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Vouchers Section */ }
            <section className="py-5 bg-light">
                <Container>
                    <Row className="mb-4">
                        <Col>
                            <h2 className="fw-bold">Available Vouchers</h2>
                            <p className="text-muted">Choose from our current offers</p>
                        </Col>
                        <Col xs="auto">
                            <Form.Select className="shadow-sm">
                                <option>Sort by: Most Popular</option>
                                <option>Sort by: Newest</option>
                                <option>Sort by: Expiring Soon</option>
                                <option>Sort by: Highest Discount</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    <Row>
                        { vouchers.map((voucher) => (
                            <Col md={ 6 } lg={ 4 } className="mb-4" key={ voucher.id }>
                                <Card className="h-100 shadow-sm voucher-card border-0">
                                    <Card.Body className="p-4 position-relative">
                                        <div className="position-absolute top-0 end-0 m-3">
                                            <Badge bg={ voucher.usage === "One-time use" ? "warning" : "success" } className="rounded-pill">
                                                { voucher.usage }
                                            </Badge>
                                        </div>

                                        <div className="text-center mb-4">
                                            <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center p-3">
                                                <span className="text-white fs-2 fw-bold">%</span>
                                            </div>
                                        </div>

                                        <h4 className="fw-bold text-center mb-2">{ voucher.discount }</h4>
                                        <h5 className="text-center text-primary mb-3">{ voucher.title }</h5>

                                        <div className="bg-light rounded p-3 mb-3 text-center">
                                            <span className="text-muted">Use code:</span>
                                            <div className="fs-5 fw-bold text-dark">{ voucher.code }</div>
                                        </div>

                                        <p className="text-muted text-center">{ voucher.description }</p>

                                        <div className="d-flex justify-content-between text-muted small mb-3">
                                            <div>Min. purchase: <span className="fw-medium">{ voucher.minPurchase }</span></div>
                                            <div>Valid until: <span className="fw-medium">{ voucher.validUntil }</span></div>
                                        </div>

                                        <div className="d-grid">
                                            <Button
                                                variant="primary"
                                                size="lg"
                                                className="fw-medium"
                                                onClick={ () => handleShow(voucher) }
                                            >
                                                Get This Voucher
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )) }
                    </Row>

                    <Row className="mt-5">
                        <Col className="text-center">
                            <Button variant="outline-primary" size="lg" className="px-5">
                                Load More Vouchers
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Newsletter Section */ }
            <section className="py-5 bg-white">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={ 8 } className="text-center">
                            <h3 className="fw-bold mb-3">Get Notified About New Vouchers</h3>
                            <p className="text-muted mb-4">Subscribe to our newsletter and be the first to know about exclusive deals and limited-time offers</p>

                            <InputGroup size="lg" className="mb-3 shadow-sm">
                                <Form.Control
                                    placeholder="Enter your email address"
                                    aria-label="Enter your email address"
                                    type="email"
                                />
                                <Button variant="primary">Subscribe</Button>
                            </InputGroup>

                            <small className="text-muted">By subscribing, you agree to our Terms and Privacy Policy</small>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Footer */ }
            <footer className="py-5 bg-dark text-white">
                <Container>
                    <Row>
                        <Col lg={ 4 } className="mb-4">
                            <h5 className="fw-bold mb-3">VoucherHub</h5>
                            <p className="text-muted">Find the best deals and discounts for your favorite brands.</p>
                        </Col>
                        <Col lg={ 2 } className="mb-4">
                            <h6 className="fw-bold mb-3">Company</h6>
                            <ul className="list-unstyled">
                                <li className="mb-2"><a href="#" className="text-muted text-decoration-none">About Us</a></li>
                                <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Careers</a></li>
                                <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Contact</a></li>
                            </ul>
                        </Col>
                        <Col lg={ 2 } className="mb-4">
                            <h6 className="fw-bold mb-3">Legal</h6>
                            <ul className="list-unstyled">
                                <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Terms of Service</a></li>
                                <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Privacy Policy</a></li>
                                <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Cookie Policy</a></li>
                            </ul>
                        </Col>
                        <Col lg={ 2 } className="mb-4">
                            <h6 className="fw-bold mb-3">Support</h6>
                            <ul className="list-unstyled">
                                <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Help Center</a></li>
                                <li className="mb-2"><a href="#" className="text-muted text-decoration-none">FAQ</a></li>
                                <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Voucher Guidelines</a></li>
                            </ul>
                        </Col>
                        <Col lg={ 2 } className="mb-4">
                            <h6 className="fw-bold mb-3">Follow Us</h6>
                            <ul className="list-unstyled">
                                <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Facebook</a></li>
                                <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Twitter</a></li>
                                <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Instagram</a></li>
                            </ul>
                        </Col>
                    </Row>
                    <hr className="my-4 bg-secondary" />
                    <Row>
                        <Col md={ 6 }>
                            <p className="text-muted mb-0">© 2023 VoucherHub. All rights reserved.</p>
                        </Col>
                        <Col md={ 6 } className="text-md-end">
                            <a href="#" className="text-muted text-decoration-none me-3">Privacy Policy</a>
                            <a href="#" className="text-muted text-decoration-none">Terms of Service</a>
                        </Col>
                    </Row>
                </Container>
            </footer>

            {/* Voucher Modal */ }
            <Modal show={ showModal } onHide={ handleClose } centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Get Your Voucher</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center py-4">
                    { selectedVoucher && (
                        <>
                            <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3">
                                <span className="text-white fs-1 fw-bold">%</span>
                            </div>

                            <h3 className="fw-bold mb-2">{ selectedVoucher.discount }</h3>
                            <h4 className="text-primary mb-3">{ selectedVoucher.title }</h4>

                            <div className="bg-light rounded p-3 mb-4">
                                <span className="text-muted">Use code:</span>
                                <div className="fs-2 fw-bold text-dark my-2">{ selectedVoucher.code }</div>
                                <small className="text-muted">Copy this code and apply at checkout</small>
                            </div>

                            <div className="row text-start mb-4">
                                <div className="col-md-6">
                                    <p><span className="fw-medium">Description:</span> { selectedVoucher.description }</p>
                                    <p><span className="fw-medium">Minimum Purchase:</span> { selectedVoucher.minPurchase }</p>
                                </div>
                                <div className="col-md-6">
                                    <p><span className="fw-medium">Valid Until:</span> { selectedVoucher.validUntil }</p>
                                    <p><span className="fw-medium">Category:</span> { selectedVoucher.category }</p>
                                </div>
                            </div>

                            <Button variant="primary" size="lg" className="px-5 fw-medium">
                                Copy Code
                            </Button>
                        </>
                    ) }
                </Modal.Body>
            </Modal>

            <style>{ `
        .voucher-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .voucher-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        .bg-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
      `}</style>
        </>
    );
};

export default VouchersPage;