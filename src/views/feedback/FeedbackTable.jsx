import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Table, Form, InputGroup, FormControl, Button, Image } from 'react-bootstrap';
import { fetchFeedback, updateUserStatus, deleteFeedback, fetchReplayFeedbackInfo, sentReplayOnFeedback } from "../../store/userSlice";
import { Search, Trash, Bell } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UPLOAD_FILE_URL } from "../../../src/services/apiPath";
export default function FeedbackTable() {
    const dispatch = useDispatch();
    const { feedbackList, feedbackInfo } = useSelector((state) => state.user);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [allFeedback, setAllFeedback] = useState([]);
    const dropdownRefs = useRef([]);
    const [checkedIds, setCheckedIds] = useState([]);
    const statusOptions = [
        { value: true, label: "Active" },
        { value: false, label: "Inactive" }
    ];
    const lastScrollTop = React.useRef(0);
    const fetchTimeout = React.useRef(null);

    useEffect(() => {
        dispatch(fetchFeedback({ limit: 10, pageNo: page }));
    }, [dispatch, page]);

    // Merge new feedback into allFeedback when feedbackList changes
    useEffect(() => {
        if (feedbackList && feedbackList.length > 0) {
            setAllFeedback(prev => {
                // Avoid duplicates by _id
                const existingIds = new Set(prev.map(u => u._id));
                const newUsers = feedbackList.filter(u => !existingIds.has(u._id));
                return [...prev, ...newUsers];
            });
        }
    }, [feedbackList]);

    useEffect(() => {
        // If the last fetch returned less than 10, no more data
        if (feedbackList.length < 10) {
            setHasMore(false);
        } else if (feedbackList.length === 10) {
            setHasMore(true);
        }
    }, [feedbackList]);

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollTop + clientHeight >= (scrollHeight - 1)) {
            if (scrollTop > lastScrollTop.current) {
                if (fetchTimeout.current) {
                    clearTimeout(fetchTimeout.current);
                }
                fetchTimeout.current = setTimeout(() => {
                    setPage((prevPageNo) => prevPageNo + 1);
                }, 700);
            }
        }
    };

    // Handler for checkbox change
    const handleCheckboxChange = (couponId) => {
        setCheckedIds(prev =>
            prev.includes(couponId)
                ? prev.filter(id => id !== couponId)
                : [...prev, couponId]
        );
    };

    // Debounced search handler
    const searchTimeout = useRef(null);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }
        searchTimeout.current = setTimeout(() => {
            dispatch(fetchFeedback({ limit: 10, pageNo: 1, keyword: query }));
            setPage(1);
            setAllFeedback([]); // Reset feedback for new search
        }, 1000);
    };


    const handleDelete = () => {
        if (!checkedIds || checkedIds.length === 0) {
            toast.error("Please select at least one feedback to delete.");
            return;
        }
        dispatch(deleteFeedback({ feedback_id: checkedIds.join(",") }))
            .then((result) => {
                if (result?.payload?.statusCode === 1) {
                    toast.success("Feedback deleted successfully!");
                    setCheckedIds([]);
                    dispatch(fetchFeedback({ limit: 10, pageNo: 1 }));
                    setPage(1);
                    setAllFeedback([]);
                }
            });
    };

    const handleStatusChange = (user_id, status) => {
        toast.info(
            <div style={ { textAlign: "left" } }>
                <div>Are you sure you want to change the user status?</div>
                <div style={ { marginTop: 12 } }>
                    <button
                        onClick={ () => {
                            toast.dismiss();
                            dispatch(updateUserStatus({ user_id, status: status ? 'yes' : 'no' }))
                                .then((result) => {
                                    if (result?.payload?.statusCode === 1) {
                                        toast.success("User status updated successfully!");
                                        setPage(1);
                                        setAllUsers([]);
                                        dispatch(fetchFeedback({ limit: 10, pageNo: 1 }));
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

    const handleStatusDeleteChange = (user_id) => {
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
                                        setPage(1);
                                        setAllUsers([]);
                                        dispatch(fetchUsers({ limit: 10, pageNo: 1 }));
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

    const handleView = (user_id) => {
        window.location.href = `/user-info/${ user_id }`;
    };

    // State for modal
    const [showModal, setShowModal] = useState(false);
    const [replyFeedback, setReplyFeedback] = useState(null);
    const [replyMessage, setReplyMessage] = useState("");

    const handleOpenModal = (feedback) => {
        // Fetch feedback info if needed
        dispatch(fetchReplayFeedbackInfo({ feedback_id: feedback._id }));
        setReplyFeedback(feedback);
        setReplyMessage("");
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setReplyFeedback(null);
        setReplyMessage("");
    };

    const handleSendReply = () => {
        dispatch(sentReplayOnFeedback({ feedback_id: feedbackInfo._id, description: replyMessage }))
        // TODO: Dispatch reply action here
        toast.success("Reply sent!");
        dispatch(fetchReplayFeedbackInfo({ feedback_id: feedbackInfo._id }));
        setReplyMessage("");
    };

    return (
        <>
            <Row>
                <Col sm={ 12 }>
                    <Card>
                        <Card.Header>
                            <Row className="align-items-center mb-3">
                                <Col>
                                    <h5 className="fw-bold d-inline-block me-3 mb-0">Feedback List</h5>
                                    {/* <Form.Check inline type="checkbox" className="d-inline-block me-2" /> */ }
                                    <span style={ { color: 'red', cursor: 'pointer' } } onClick={ handleDelete }><Trash /></span>
                                </Col>
                                <Col className="text-end mb-2">
                                    <InputGroup>
                                        <FormControl
                                            placeholder="Search here..."
                                            size="sm"
                                            onChange={ handleSearch }
                                        />
                                        <Button variant="outline-secondary" size="sm"><Search /></Button>
                                    </InputGroup>
                                </Col>
                                <Col className="text-end mb-2">
                                    <InputGroup>
                                        <FormControl
                                            type="date"
                                            size="sm"
                                            onChange={ e => {
                                                const selectedDate = e.target.value;
                                                dispatch(fetchFeedback({ limit: 10, pageNo: 1, date: selectedDate }));
                                                setPage(1);
                                                setAllFeedback([]);
                                            } }
                                        />
                                        <Button variant="outline-secondary" size="sm">
                                            <i className="fas fa-calendar-alt"></i>
                                        </Button>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <div
                                style={ { maxHeight: 400, overflowY: "auto" } }
                                onScroll={ handleScroll }
                            >
                                <Table striped bordered hover className="mb-0 ">
                                    <thead>
                                        <tr>
                                            <th>
                                                <input
                                                    type="checkbox"
                                                    checked={ allFeedback.length > 0 && checkedIds.length === allFeedback.length }
                                                    onChange={ e => {
                                                        if (e.target.checked) {
                                                            setCheckedIds(allFeedback.map(cand => cand._id));
                                                        } else {
                                                            setCheckedIds([]);
                                                        }
                                                    } }
                                                />
                                            </th>
                                            <th>Name</th>
                                            <th>City</th>
                                            <th>Email</th>
                                            <th>Feedback</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { allFeedback.map((cand, idx) => (
                                            <tr key={ cand._id }>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={ checkedIds.includes(cand._id) }
                                                        onChange={ () => handleCheckboxChange(cand._id) }
                                                    />
                                                </td>
                                                <td>{ cand?.user_id?.firstName + " " + cand?.user_id?.lastName }</td>
                                                <td>{ cand?.city?.name }</td>
                                                <td>{ cand?.user_id?.email }</td>
                                                <td>{ cand?.description }</td>
                                                <td>{ new Date(cand?.create_at).toLocaleDateString() }</td>
                                                <td>
                                                    <button
                                                        className="btn btn-secondary btn-sm"
                                                        title="Replay"
                                                        style={ { marginLeft: 4 } }
                                                        onClick={ () => handleOpenModal(cand) }
                                                    >
                                                        <i className="fas fa-reply"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )) }
                                    </tbody>
                                </Table>
                                { loading && <div>Loading...</div> }
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* Modal for reply */ }
            { showModal && (
                <div className="modal show" style={ { display: "block", background: "rgba(0,0,0,0.5)" } }>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Comment</h5>
                                <button type="button" className="btn-close" onClick={ handleCloseModal }></button>
                            </div>
                            <div className="modal-body">
                                {/* User Profile Section */ }
                                <div className="d-flex align-items-center mb-3">
                                    <Image
                                        src={ UPLOAD_FILE_URL + "" + feedbackInfo?.user_id?.profileImage || "/default-avatar.png" }
                                        roundedCircle
                                        width={ 50 }
                                        height={ 50 }
                                        className="me-3"
                                    />
                                    <div>
                                        <h6 className="mb-0">
                                            { feedbackInfo?.user_id?.firstName } { feedbackInfo?.user_id?.lastName }
                                        </h6>
                                        <small className="text-muted">
                                            { new Date(feedbackInfo?.create_at).toLocaleDateString() }
                                        </small>
                                    </div>
                                </div>
                                <p>{ feedbackInfo?.description }</p>
                                {/* Replies Section */ }
                                { feedbackInfo?.replies && feedbackInfo.replies.length > 0 && (
                                    <div className="mb-3">
                                        <h6>Replies</h6>
                                        <ul className="list-group">
                                            { feedbackInfo.replies.map(reply => (
                                                <li key={ reply._id } className="list-group-item">
                                                    <div className="d-flex align-items-center mb-1">
                                                        <Image
                                                            src={ UPLOAD_FILE_URL + "" + reply.user_id?.profileImage || "/default-avatar.png" }
                                                            roundedCircle
                                                            width={ 35 }
                                                            height={ 35 }
                                                            className="me-2"
                                                        />
                                                        <div>
                                                            <strong>
                                                                { reply.user_id?.firstName } { reply.user_id?.lastName }
                                                            </strong>{ " " }
                                                            <span className="text-muted" style={ { fontSize: "0.8em" } }>
                                                                ({ new Date(reply.create_at).toLocaleString() })
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>{ reply.description }</div>
                                                </li>
                                            )) }
                                        </ul>
                                    </div>
                                ) }
                                <Form.Group>
                                    <Form.Control
                                        as="textarea"
                                        rows={ 3 }
                                        value={ replyMessage }
                                        placeholder="Type your response here..."
                                        onChange={ e => setReplyMessage(e.target.value) }
                                    />
                                </Form.Group>
                            </div>
                            <div className="modal-footer">
                                <Button variant="secondary" onClick={ handleCloseModal }>Close</Button>
                                <Button variant="primary" onClick={ handleSendReply } disabled={ !replyMessage.trim() }>Send Reply</Button>
                            </div>
                        </div>
                    </div>
                </div>
            ) }
        </>
    );
}
