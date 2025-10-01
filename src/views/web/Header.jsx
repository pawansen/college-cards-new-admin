import { useState } from "react";
import { Card, Row, Col, Button, Form, InputGroup, Container, Navbar, Nav } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import logoDark from "assets/images/logo.png";

const coupons = [
    { code: "WELCOME10", description: "10% off on your first order" },
    { code: "FREESHIP", description: "Free shipping on orders over $50" },
    { code: "SUMMER20", description: "20% off summer collection" },
];

export default function HeaderPage() {
    const [feedback, setFeedback] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setFeedback("");
        setTimeout(() => setSubmitted(false), 2000);
    };

    return (
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
    );
}
