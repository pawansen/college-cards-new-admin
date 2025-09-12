import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Container, Tabs, Tab, Button, Form, Badge, Modal } from 'react-bootstrap';
import { fetchVersion, updateVersion } from "../../store/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default function VersionUpdate() {
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [lastUpdateDate, setLastUpdateDate] = useState("");
    const [android, setAndroid] = useState({
        current: "0",
        newVersion: "0",
        forceUpdate: false,
    });

    const [ios, setIos] = useState({
        current: "0",
        newVersion: "0",
        forceUpdate: false,
    });

    const [showModal, setShowModal] = useState(false);
    const [platform, setPlatform] = useState(null);
    const [formData, setFormData] = useState({});

    const handleEditClick = (platformName, data) => {
        setPlatform(platformName);
        setFormData({ ...data });
        setShowModal(true);
    };

    const handleSave = () => {
        if (platform === "Android") {
            setAndroid(formData);
            // Call API to update Android version
            dispatch(updateVersion({
                androidVersion: formData.newVersion,
                isCompulsoryUpdateAndroid: formData.forceUpdate ? "yes" : "no",
                androidVersionPrev: formData.current,
                iosVersion: ios.newVersion,
                isCompulsoryUpdateIos: ios.forceUpdate ? "yes" : "no",
                iosVersionPrev: ios.current,
            })).then((action) => {
                if (action.payload) {
                    toast.success("Android version updated successfully");
                }
            });
        } else if (platform === "iOS") {
            setIos(formData);
            // Call API to update iOS version
            dispatch(updateVersion({
                androidVersion: android.newVersion,
                isCompulsoryUpdateAndroid: android.forceUpdate ? "yes" : "no",
                androidVersionPrev: android.current,
                iosVersion: formData.newVersion,
                isCompulsoryUpdateIos: formData.forceUpdate ? "yes" : "no",
                iosVersionPrev: formData.current,
            })).then((action) => {
                if (action.payload) {
                    toast.success("Android version updated successfully");
                }
            });
        }
        setShowModal(false);
    };
    const [key, setKey] = useState("privacy");
    const [isEditing, setIsEditing] = useState(false);
    const [draftContent, setDraftContent] = useState(content);

    useEffect(() => {
        dispatch(fetchVersion()).then((action) => {
            if (action.payload) {
                setAndroid({
                    current: action.payload?.data?.androidVersionPrev || "0",
                    newVersion: action.payload?.data?.androidVersion || "0",
                    forceUpdate: action.payload?.data?.isCompulsoryUpdateAndroid === "yes",
                });
                setIos({
                    current: action.payload?.data?.iosVersionPrev || "0",
                    newVersion: action.payload?.data?.iosVersion || "0",
                    forceUpdate: action.payload?.data?.isCompulsoryUpdateIos === "yes",
                });
                setLastUpdateDate(action.payload?.data?.createDate);
            }
        });
    }, [dispatch, key]);

    // const handleSave = () => {
    //     setContent(draftContent);
    //     setIsEditing(false);
    //     dispatch(addContent({ type: key, content: draftContent })).then((action) => {
    //         if (action.payload) {
    //             toast.success("Content updated successfully");
    //         }
    //     });
    // };

    // const handleCancel = () => {
    //     setDraftContent(content);
    //     setIsEditing(false);
    // };

    return (
        <Row>
            <Col sm={ 12 }>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Version Update</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Container className="py-4">
                            <Row className="g-4">
                                {/* Android Card */ }
                                <Col md={ 6 }>
                                    <Card className="shadow-sm">
                                        <Card.Body>
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h5 className="mb-0">📱 Android</h5>
                                                <Button
                                                    variant="dark"
                                                    size="sm"
                                                    onClick={ () => handleEditClick("Android", android) }
                                                >
                                                    ✏️ Edit
                                                </Button>
                                            </div>
                                            <p>
                                                <strong>Current Version:</strong>{ " " }
                                                <Badge bg="secondary">{ android.current }</Badge>
                                            </p>
                                            <p>
                                                <strong>New Version:</strong>{ " " }
                                                <Badge bg="primary">{ android.newVersion }</Badge>
                                            </p>
                                            <div className="mb-2">
                                                <strong>Force Update</strong>
                                                <Form.Check
                                                    type="switch"
                                                    id="android-force-update"
                                                    label="Require users to update to continue using the app"
                                                    checked={ android.forceUpdate }
                                                    disabled
                                                />
                                            </div>
                                            <p>
                                                <strong>Status:</strong>{ " " }
                                                { android.forceUpdate ? (
                                                    <Badge bg="warning" text="dark">
                                                        Force Update Required
                                                    </Badge>
                                                ) : (
                                                    <Badge bg="success">Optional Update</Badge>
                                                ) }
                                            </p>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                {/* iOS Card */ }
                                <Col md={ 6 }>
                                    <Card className="shadow-sm">
                                        <Card.Body>
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h5 className="mb-0">🍏 iOS</h5>
                                                <Button
                                                    variant="dark"
                                                    size="sm"
                                                    onClick={ () => handleEditClick("iOS", ios) }
                                                >
                                                    ✏️ Edit
                                                </Button>
                                            </div>
                                            <p>
                                                <strong>Current Version:</strong>{ " " }
                                                <Badge bg="secondary">{ ios.current }</Badge>
                                            </p>
                                            <p>
                                                <strong>New Version:</strong>{ " " }
                                                <Badge bg="primary">{ ios.newVersion }</Badge>
                                            </p>
                                            <div className="mb-2">
                                                <strong>Force Update</strong>
                                                <Form.Check
                                                    type="switch"
                                                    id="ios-force-update"
                                                    label="Require users to update to continue using the app"
                                                    checked={ ios.forceUpdate }
                                                    disabled
                                                />
                                            </div>
                                            <p>
                                                <strong>Status:</strong>{ " " }
                                                { ios.forceUpdate ? (
                                                    <Badge bg="warning" text="dark">
                                                        Force Update Required
                                                    </Badge>
                                                ) : (
                                                    <Badge bg="success">Optional Update</Badge>
                                                ) }
                                            </p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            {/* Global Actions */ }
                            {/* <Card className="shadow-sm mt-4">
                                <Card.Body>
                                    <h5 className="fw-bold mb-3">Global Actions</h5>
                                    <div className="d-flex gap-3">
                                        <Button variant="dark" className="flex-fill py-3">
                                            🔄 Sync Versions
                                        </Button>
                                        <Button variant="dark" className="flex-fill py-3">
                                            🌍 Public Updates
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card> */}

                            {/* Edit Modal */ }
                            <Modal show={ showModal } onHide={ () => setShowModal(false) } centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit { platform } Version</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Current Version</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={ formData.current || "" }
                                                onChange={ (e) =>
                                                    setFormData({ ...formData, current: e.target.value })
                                                }
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>New Version</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={ formData.newVersion || "" }
                                                onChange={ (e) =>
                                                    setFormData({ ...formData, newVersion: e.target.value })
                                                }
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Check
                                                type="switch"
                                                id="force-update"
                                                label="Require users to update to continue using the app"
                                                checked={ formData.forceUpdate || false }
                                                onChange={ (e) =>
                                                    setFormData({ ...formData, forceUpdate: e.target.checked })
                                                }
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={ () => setShowModal(false) }>
                                        Cancel
                                    </Button>
                                    <Button variant="success" onClick={ handleSave }>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Container>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
