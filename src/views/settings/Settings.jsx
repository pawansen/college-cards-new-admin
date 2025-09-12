import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Container, Tabs, Tab, Button, Form } from 'react-bootstrap';
import { fetchContent, addContent } from "../../store/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default function Settings() {
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [lastUpdateDate, setLastUpdateDate] = useState("");
    const [key, setKey] = useState("privacy");
    const [isEditing, setIsEditing] = useState(false);
    const [draftContent, setDraftContent] = useState(content);
    useEffect(() => {
        dispatch(fetchContent({ type: key })).then((action) => {
            if (action.payload) {
                setContent(action.payload?.data?.content);
                setLastUpdateDate(action.payload?.data?.create_at);
                setDraftContent(action.payload?.data?.content);
            }
        });
    }, [dispatch, key]);

    const handleSave = () => {
        setContent(draftContent);
        setIsEditing(false);
        dispatch(addContent({ type: key, content: draftContent })).then((action) => {
            if (action.payload) {
                toast.success("Content updated successfully");
            }
        });
    };

    const handleCancel = () => {
        setDraftContent(content);
        setIsEditing(false);
    };

    return (
        <Row>
            <Col sm={ 12 }>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Content Settings</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Container className="py-4">
                            {/* Tabs Navigation */ }
                            <Tabs
                                activeKey={ key }
                                onSelect={ (k) => setKey(k) }
                                className="mb-3 fw-bold"
                            >
                                <Tab eventKey="privacy" title="Privacy Policy" />
                                <Tab eventKey="terms" title="Term & Conditions" />
                                <Tab eventKey="about" title="About Us" />
                            </Tabs>

                            {/* Content Card */ }
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title as="h5" className="fw-bold">
                                        Content
                                    </Card.Title>
                                    <Card.Subtitle className="mb-3 text-muted">
                                        Last Update: { lastUpdateDate ? new Date(lastUpdateDate).toLocaleString() : "N/A" }
                                    </Card.Subtitle>

                                    { !isEditing ? (
                                        <>
                                            <Card.Text style={ { whiteSpace: "pre-line" } }>
                                                <div dangerouslySetInnerHTML={ { __html: content } } />
                                            </Card.Text>
                                            <div className="d-flex justify-content-end gap-2">
                                                {/* <Button variant="outline-secondary">Preview</Button> */ }
                                                <Button variant="primary" onClick={ () => setIsEditing(true) }>
                                                    Edit
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        // Edit Mode with text editor
                                        <>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Edit Content</Form.Label>
                                                {/* Example using react-quill */ }
                                                {/* Install with: npm install react-quill */ }
                                                {/*
                                                */}
                                                <ReactQuill
                                                    theme="snow"
                                                    value={ draftContent }
                                                    onChange={ setDraftContent }
                                                    style={ { height: "300px", marginBottom: "40px" } }
                                                />
                                            </Form.Group>
                                            <div className="d-flex justify-content-end gap-2">
                                                <Button variant="secondary" onClick={ handleCancel }>
                                                    Cancel
                                                </Button>
                                                <Button variant="success" onClick={ handleSave }>
                                                    Save
                                                </Button>
                                            </div>
                                        </>
                                    ) }
                                </Card.Body>
                            </Card>
                        </Container>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
