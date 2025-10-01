import { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';
import logoDark from 'assets/images/logo.png';
import "react-toastify/dist/ReactToastify.css";
import { fetchContent } from "../../store/userSlice";
export default function TermsOfService() {
    const dispatch = useDispatch();
    const [content, setContent] = useState("");

    useState(() => {
        dispatch(fetchContent({ type: "terms" })).then((action) => {
            if (action.payload) {
                setContent(action.payload?.data?.content);
            }
        });
    }, []);
    return (
        <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
            <Card className="w-100 shadow-sm" style={ { maxWidth: 700 } }>
                <Card.Body>
                    <Row className="justify-content-center">
                        <Col xs={ 12 } className="text-center mb-4">
                            <img src={ logoDark } alt="Logo" style={ { maxWidth: 120 } } className="mb-3" />
                            <h1 className="h3 mb-2">Terms of Service</h1>
                            <p className="text-muted mb-4">
                                Welcome to our app! By using our services, you agree to the following terms:
                            </p>
                        </Col>
                        <Col xs={ 12 }>
                            <div
                                dangerouslySetInnerHTML={ { __html: content } }
                                className="text-start"
                                style={ { minHeight: 200 } }
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
}
