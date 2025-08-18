import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Form, Button, InputGroup, Table, Tab, Nav } from 'react-bootstrap';
import { GeoAlt } from "react-bootstrap-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profileImage from '../../assets/images/profile.png';
import { fetchUserInfo, updateUserStatus } from "../../store/userSlice";

export default function UserInfo() {
    const dispatch = useDispatch();
    const [initState, setInitState] = useState(false);
    const { userDetailInfo } = useSelector((state) => state.user);
    // Get user_id from URL
    const user_id = window.location.pathname.split('/').pop();

    useEffect(() => {
        if (!initState) {
            dispatch(fetchUserInfo({ user_id }));
            setInitState(true);
        }
    }, [dispatch, initState, user_id]);

    const handleStatusDeleteChange = () => {
        toast.info(
            <div style={ { textAlign: "left" } }>
                <div>Are you sure you want to delete the user?</div>
                <div style={ { marginTop: 12 } }>
                    <button
                        onClick={ () => {
                            toast.dismiss();
                            dispatch(updateUserStatus({ user_id, delete: 'yes' }))
                                .then((result) => {
                                    if (result?.payload?.statusCode === 1) {
                                        toast.success("User status updated successfully!");
                                        window.history.back();
                                    }
                                });
                        } }
                        style={ { marginRight: 8 } }
                    >
                        Yes
                    </button>
                    <button onClick={ () => toast.dismiss() }>No</button>
                </div>
            </div>,
            { autoClose: false }
        );
    };

    return (
        <Row>
            <Col sm={ 12 }>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">User Info</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        {/* User Header */ }
                        <Row className="align-items-center border-bottom pb-3 mb-3">
                            <Col xs={ 2 } md={ 1 }>
                                <img
                                    src={ userDetailInfo?.profileImage ? userDetailInfo?.profileImage : profileImage }
                                    alt="user"
                                    className="rounded-circle img-fluid"
                                />
                            </Col>
                            <Col>
                                <h5 className="mb-0">{ userDetailInfo?.firstName } { userDetailInfo?.lastName }</h5>
                                <small className="text-muted">{ userDetailInfo?.email }</small>
                            </Col>
                            <Col md="auto" className="text-success fw-bold">
                                $0 <br />
                                <small>Total Reward Earn</small>
                            </Col>
                            <Col md="auto">
                                <span className="badge bg-success">{ userDetailInfo?.isActive ? 'Active' : 'Inactive' }</span>
                            </Col>
                            <Col md="auto">
                                <span className="badge bg-primary">{ userDetailInfo?.createdAt }</span>
                            </Col>
                            <Col md="auto">
                                <Button variant="outline-danger" size="sm" onClick={ handleStatusDeleteChange }>
                                    Delete User
                                </Button>
                            </Col>
                        </Row>

                        {/* Tabs Section */ }
                        <Tab.Container defaultActiveKey="details">
                            <Nav variant="tabs">
                                <Nav.Item>
                                    <Nav.Link eventKey="details">User Details</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="subscription">Subscription</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="feedback">Feedback</Nav.Link>
                                </Nav.Item>
                                {/* <Nav.Item>
                                    <Nav.Link eventKey="reward">Reward Earn</Nav.Link>
                                </Nav.Item> */}
                            </Nav>

                            <Tab.Content className="mt-3">
                                {/* User Details Tab */ }
                                <Tab.Pane eventKey="details">
                                    <Row>
                                        <Col md={ 6 }>
                                            <p>
                                                <strong>First Name:</strong> { userDetailInfo?.firstName }
                                            </p>
                                            <p>
                                                <strong>Last Name:</strong> { userDetailInfo?.lastName }
                                            </p>
                                        </Col>
                                        <Col md={ 6 }>
                                            <p>
                                                <strong>Email Id:</strong> { userDetailInfo?.email }
                                            </p>
                                            <p>
                                                <strong>Phone Number:</strong> { userDetailInfo?.mobile }
                                            </p>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <h6>Cities</h6>
                                    <ul className="list-group">
                                        { userDetailInfo?.cityList && userDetailInfo.cityList.length > 0 ? (
                                            userDetailInfo.cityList.map(city => (
                                                <li className="list-group-item" key={ city.id }>{ city.name }</li>
                                            ))
                                        ) : (
                                            <li className="list-group-item">No cities available</li>
                                        ) }
                                    </ul>
                                </Tab.Pane>

                                {/* Other Tabs (empty for now) */ }
                                <Tab.Pane eventKey="subscription">
                                    <Table striped bordered hover className="mb-0 ">
                                        <thead>
                                            <tr>
                                                <th>Subscription</th>
                                                <th>City</th>
                                                <th>Buy Date</th>
                                                <th>End Date</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { userDetailInfo?.subscription && userDetailInfo?.subscription.map((cand, idx) => (
                                                <tr key={ cand._id }>
                                                    <td>{ cand.packageType }</td>
                                                    <td>{ cand.cityList.map((city) => city.name).join(", ") }</td>
                                                    <td>{ new Date(cand.startDate).toLocaleDateString() }</td>
                                                    <td>{ new Date(cand.endDate).toLocaleDateString() }</td>
                                                    <td>${ cand.amount }</td>
                                                </tr>
                                            )) }
                                        </tbody>
                                    </Table>
                                </Tab.Pane>
                                <Tab.Pane eventKey="feedback">
                                    {/* Feedback List */ }
                                    <FeedbackList feedback={ userDetailInfo?.feedback } />
                                </Tab.Pane>
                                <Tab.Pane eventKey="reward">Reward Earn Info...</Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );

    // FeedbackList component
    function FeedbackList({ feedback }) {
        const [replyOpen, setReplyOpen] = useState({});
        const [replyText, setReplyText] = useState({});

        const handleReplyClick = (id) => {
            setReplyOpen((prev) => ({
                ...prev,
                [id]: !prev[id]
            }));
        };

        const handleInputChange = (id, value) => {
            setReplyText((prev) => ({
                ...prev,
                [id]: value
            }));
        };

        const handleSendReply = (id) => {
            // Implement send reply logic here
            toast.success("Reply sent!");
            setReplyOpen((prev) => ({
                ...prev,
                [id]: false
            }));
            setReplyText((prev) => ({
                ...prev,
                [id]: ""
            }));
        };

        if (!feedback || feedback.length === 0) {
            return <div>No feedback available</div>;
        }

        return (
            <>
                { feedback.map((fb) => (
                    <div className="d-flex mb-3" key={ fb._id }>
                        <img
                            src={ fb?.user_id?.profileImage }
                            alt="user"
                            className="rounded-circle me-2"
                            width="50"
                            height="50"
                        />
                        <div style={ { flex: 1 } }>
                            <h6 className="mb-0">{ fb?.user_id?.firstName } { fb?.user_id?.lastName }</h6>
                            <small className="text-muted">{ new Date(fb.create_at).toLocaleDateString() }</small>
                            <p className="mt-2 mb-1">
                                { fb.description }
                            </p>
                            <Button
                                variant="link"
                                size="sm"
                                className="p-0 text-primary"
                                onClick={ () => handleReplyClick(fb._id) }
                                style={ { fontSize: "0.9rem" } }
                            >
                                <i className="bi bi-reply"></i> Reply
                            </Button>
                            { replyOpen[fb._id] && (
                                <InputGroup className="mt-2" size="sm">
                                    <Form.Control
                                        placeholder="Type your reply..."
                                        value={ replyText[fb._id] || "" }
                                        onChange={ (e) => handleInputChange(fb._id, e.target.value) }
                                    />
                                    <Button
                                        variant="primary"
                                        onClick={ () => handleSendReply(fb._id) }
                                        disabled={ !replyText[fb._id] }
                                    >
                                        Send
                                    </Button>
                                </InputGroup>
                            ) }
                        </div>
                    </div>
                )) }
            </>
        );
    }
}
