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
        <Navbar bg="white" expand="lg" className="shadow-sm py-3">
            <Container>
                <Navbar.Brand href="#">
                    <img src={ logoDark } alt="Nexa Logo" height={ 40 } />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">
                        <Nav.Link href="#hero">Home</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                        <Nav.Link href="#services">Services</Nav.Link>
                        <Nav.Link href="#contact">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
