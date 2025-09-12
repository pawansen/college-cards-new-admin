import { useState } from "react";
import { Card, Row, Col, Button, Form, InputGroup, Container, Navbar, Nav } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import logoDark from "assets/images/logo.png";
export default function FooterPage() {
    return (
        <footer className="nexa-footer py-3 text-center">
            <Container>
                <small>&copy; { new Date().getFullYear() } Nexa. All rights reserved.</small>
            </Container>
        </footer>
    );
}
