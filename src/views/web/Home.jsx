import { lazy } from 'react';
import "./Home.css"; // Custom CSS for extra styling
import logoDark from "assets/images/logo.png";
import {
    Navbar, Nav, Container, Row, Col, Button, Badge, Card, Form, InputGroup, Carousel
} from 'react-bootstrap'
import { FaRocket, FaCheckCircle, FaChartLine, FaCogs, FaSearch, FaShieldAlt, FaQuoteLeft, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

// const Header = lazy(() => import('./Header'));
// const Footer = lazy(() => import('./Footer'));
export default function HomePage() {
    return (
        <>
            <Navbar expand="lg" bg="white" className="py-3 border-bottom sticky-top">
                <Container>
                    <Navbar.Brand href="#home" className="fw-bold">
                        <span className="gradient-text">SEO</span> Dream
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="nav" />
                    <Navbar.Collapse id="nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#services">Services</Nav.Link>
                            <Nav.Link href="#about">About</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                            <Nav.Link href="#testimonials">Testimonials</Nav.Link>
                            <Nav.Link href="#contact">Contact</Nav.Link>
                        </Nav>
                        <Button href="#contact" className="ms-lg-3" variant="primary">Get Started</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Hero */ }
            <section className="hero py-5">
                <Container>
                    <Row className="align-items-center g-4">
                        <Col md={ 6 }>
                            <Badge bg="" className="badge-soft mb-3">Award-winning SEO Agency</Badge>
                            <h1 className="display-5 fw-bold mb-3">
                                Grow Organic Traffic with <span className="gradient-text">Proven SEO</span>
                            </h1>
                            <p className="lead text-secondary mb-4">
                                We help brands rank higher, convert better, and scale faster with ethical SEO strategies tailored to your business.
                            </p>
                            <div className="d-flex flex-column flex-sm-row gap-2">
                                <Button size="lg" variant="primary"><FaRocket className="me-2" />Start a Project</Button>
                                <Button size="lg" variant="outline-secondary">See Case Studies</Button>
                            </div>
                            <div className="d-flex align-items-center gap-3 mt-4 text-secondary">
                                <div className="d-flex align-items-center"><FaCheckCircle className="me-2" /><small>No contracts</small></div>
                                <div className="d-flex align-items-center"><FaCheckCircle className="me-2" /><small>Transparent reports</small></div>
                                <div className="d-flex align-items-center"><FaCheckCircle className="me-2" /><small>Dedicated manager</small></div>
                            </div>
                        </Col>
                        <Col md={ 6 }>
                            <Card className="glass shadow-sm">
                                <Card.Body className="p-4">
                                    <h5 className="fw-semibold mb-3">Free SEO Audit</h5>
                                    <Form>
                                        <Row className="g-3">
                                            <Col md={ 12 }>
                                                <Form.Label className="small text-muted">Website URL</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text><FaSearch /></InputGroup.Text>
                                                    <Form.Control placeholder="https://yourwebsite.com" />
                                                </InputGroup>
                                            </Col>
                                            <Col md={ 6 }>
                                                <Form.Label className="small text-muted">Your Name</Form.Label>
                                                <Form.Control placeholder="John Doe" />
                                            </Col>
                                            <Col md={ 6 }>
                                                <Form.Label className="small text-muted">Email</Form.Label>
                                                <Form.Control type="email" placeholder="john@email.com" />
                                            </Col>
                                            <Col md={ 12 }>
                                                <Button variant="primary" className="w-100">Get Audit Report</Button>
                                            </Col>
                                            <Col md={ 12 }>
                                                <small className="text-muted">We’ll email a quick audit within 24 hours.</small>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Clients */ }
            <section className="py-4 border-top border-bottom">
                <Container>
                    <div className="d-flex flex-wrap justify-content-center gap-4 opacity-75">
                        <span className="fw-semibold">Trusted by 1,200+ companies</span>
                        <span>•</span>
                        <span>Acme Corp</span>
                        <span>Globex</span>
                        <span>Umbrella</span>
                        <span>Initech</span>
                        <span>Stark</span>
                    </div>
                </Container>
            </section>

            {/* Services */ }
            <section id="services" className="py-5">
                <Container>
                    <Row className="mb-4">
                        <Col md={ 8 }>
                            <h2 className="section-title fw-bold">Services that move the needle</h2>
                            <p className="text-secondary">Full-funnel SEO services engineered for sustainable growth.</p>
                        </Col>
                    </Row>
                    <Row className="g-4">
                        { [
                            { icon: <FaChartLine />, title: 'Technical SEO', desc: 'Fix crawl issues, site speed, and indexation to unlock performance.' },
                            { icon: <FaCogs />, title: 'On-Page SEO', desc: 'Semantic structure, internal links, and content optimization.' },
                            { icon: <FaRocket />, title: 'Content Strategy', desc: 'Topic clusters, briefs, and conversion-focused content.' },
                            { icon: <FaShieldAlt />, title: 'Link Building', desc: 'White-hat outreach to earn authoritative backlinks.' },
                            { icon: <FaSearch />, title: 'Keyword Research', desc: 'High-intent keywords mapped to business value.' },
                            { icon: <FaChartLine />, title: 'Analytics & Reporting', desc: 'Dashboards and insights you actually understand.' },
                        ].map((s, i) => (
                            <Col md={ 6 } lg={ 4 } key={ i }>
                                <Card className="h-100 card-hover transition">
                                    <Card.Body className="p-4">
                                        <div className="display-6 mb-3">{ s.icon }</div>
                                        <Card.Title className="fw-semibold">{ s.title }</Card.Title>
                                        <Card.Text className="text-secondary">{ s.desc }</Card.Text>
                                        <Button variant="link" className="p-0">Learn more →</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )) }
                    </Row>
                </Container>
            </section>

            {/* About */ }
            <section id="about" className="py-5 bg-light">
                <Container>
                    <Row className="align-items-center g-4">
                        <Col md={ 6 }>
                            <h2 className="fw-bold mb-3">We blend data with creativity</h2>
                            <p className="text-secondary">Our senior SEOs, content strategists, and digital PR teams partner with you to build a durable moat in search. Zero fluff, just outcomes.</p>
                            <Row className="g-3">
                                { [
                                    ['Avg. ROI', '6.4x'],
                                    ['Avg. Traffic Lift', '+182%'],
                                    ['Avg. Time to Impact', '90 days'],
                                ].map((m, i) => (
                                    <Col sm={ 4 } key={ i }>
                                        <Card className="text-center">
                                            <Card.Body>
                                                <div className="fs-4 fw-bold gradient-text">{ m[1] }</div>
                                                <div className="small text-muted">{ m[0] }</div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )) }
                            </Row>
                        </Col>
                        <Col md={ 6 }>
                            <Card className="shadow-sm">
                                <Card.Body className="p-4">
                                    <h5 className="fw-semibold mb-3">Site Health Checklist</h5>
                                    <ul className="list-unstyled m-0">
                                        { [
                                            'Core Web Vitals pass',
                                            'XML sitemap & robots.txt OK',
                                            'Orphan pages resolved',
                                            'Duplicate content removed',
                                            'Schema markup added',
                                            '404s & redirects fixed'
                                        ].map((t, i) => (
                                            <li key={ i } className="d-flex align-items-center py-2">
                                                <FaCheckCircle className="me-2 text-success" /><span>{ t }</span>
                                            </li>
                                        )) }
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Pricing */ }
            <section id="pricing" className="py-5">
                <Container>
                    <Row className="mb-4 text-center">
                        <h2 className="fw-bold">Simple, transparent pricing</h2>
                        <p className="text-secondary">Pick a plan and let’s get to work.</p>
                    </Row>
                    <Row className="g-4">
                        { [
                            { name: 'Starter', price: '₹19,999', features: ['Keyword research', 'On-page optimization', 'Monthly reporting'], cta: 'Choose Starter' },
                            { name: 'Growth', price: '₹49,999', popular: true, features: ['Everything in Starter', 'Content briefs (8/mo)', 'Digital PR outreach'], cta: 'Choose Growth' },
                            { name: 'Scale', price: '₹99,999', features: ['Everything in Growth', 'Link building (20+/mo)', 'Quarterly strategy'], cta: 'Choose Scale' },
                        ].map((p, i) => (
                            <Col md={ 4 } key={ i }>
                                <Card className={ "h-100 card-hover transition " + (p.popular ? "border-primary shadow" : "") }>
                                    <Card.Body className="p-4 d-flex flex-column">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <Card.Title className="fw-semibold">{ p.name }</Card.Title>
                                            { p.popular && <Badge bg="primary">Most Popular</Badge> }
                                        </div>
                                        <div className="display-6 fw-bold mb-3">{ p.price }<span className="fs-6 text-muted">/mo</span></div>
                                        <ul className="list-unstyled flex-grow-1">
                                            { p.features.map((f, idx) => (
                                                <li key={ idx } className="d-flex align-items-start mb-2">
                                                    <FaCheckCircle className="me-2 mt-1 text-success" /><span>{ f }</span>
                                                </li>
                                            )) }
                                        </ul>
                                        <Button variant={ p.popular ? "primary" : "outline-secondary" } className="w-100 mt-3">{ p.cta }</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )) }
                    </Row>
                </Container>
            </section>

            {/* Testimonials */ }
            <section id="testimonials" className="py-5 bg-light">
                <Container>
                    <Row className="mb-4">
                        <Col>
                            <h2 className="fw-bold">What our clients say</h2>
                            <p className="text-secondary">Real results from real businesses.</p>
                        </Col>
                    </Row>
                    <Carousel indicators={ false } interval={ 5000 }>
                        { [
                            { quote: 'Their SEO strategy transformed our inbound pipeline within 3 months.', author: 'Priya Sharma, SaaS Founder' },
                            { quote: 'Transparent, proactive, and truly expert-level execution.', author: 'Rohit Gupta, D2C CEO' },
                            { quote: 'We scaled organic traffic 220% year-over-year.', author: 'Ananya Verma, Marketing Lead' },
                        ].map((t, i) => (
                            <Carousel.Item key={ i }>
                                <Card className="border-0">
                                    <Card.Body className="p-4">
                                        <FaQuoteLeft className="opacity-50 fs-1 mb-3" />
                                        <p className="fs-5">{ t.quote }</p>
                                        <div className="fw-semibold">{ t.author }</div>
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>
                        )) }
                    </Carousel>
                </Container>
            </section>

            {/* Contact */ }
            <section id="contact" className="py-5">
                <Container>
                    <Row className="mb-4 text-center">
                        <h2 className="fw-bold">Tell us about your goals</h2>
                        <p className="text-secondary">We’ll respond within one business day.</p>
                    </Row>
                    <Row className="g-4">
                        <Col md={ 7 }>
                            <Card className="shadow-sm">
                                <Card.Body className="p-4">
                                    <Form className="row g-3">
                                        <Col md={ 6 }>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control placeholder="Your full name" />
                                        </Col>
                                        <Col md={ 6 }>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="you@company.com" />
                                        </Col>
                                        <Col md={ 12 }>
                                            <Form.Label>Website</Form.Label>
                                            <Form.Control placeholder="https://" />
                                        </Col>
                                        <Col md={ 12 }>
                                            <Form.Label>Message</Form.Label>
                                            <Form.Control as="textarea" rows={ 5 } placeholder="What are you trying to achieve?" />
                                        </Col>
                                        <Col md={ 12 }>
                                            <Button variant="primary">Send message</Button>
                                        </Col>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={ 5 }>
                            <Card className="h-100">
                                <Card.Body className="p-4">
                                    <h5 className="fw-semibold mb-3">Contact info</h5>
                                    <div className="mb-2 text-secondary">Email: hello@seodream.co</div>
                                    <div className="mb-2 text-secondary">Phone: +91 98765 43210</div>
                                    <div className="mb-2 text-secondary">Hours: Mon–Fri, 10:00–18:00 IST</div>
                                    <div className="d-flex gap-3 mt-3">
                                        <a href="#" aria-label="Facebook"><FaFacebook /></a>
                                        <a href="#" aria-label="Twitter"><FaTwitter /></a>
                                        <a href="#" aria-label="Instagram"><FaInstagram /></a>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Footer */ }
            <footer className="py-4 border-top bg-white">
                <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                    <div className="text-muted small">© { new Date().getFullYear() } SEO Dream. All rights reserved.</div>
                    <div className="d-flex gap-3 small">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Sitemap</a>
                    </div>
                </Container>
            </footer>
        </>
    );
}
