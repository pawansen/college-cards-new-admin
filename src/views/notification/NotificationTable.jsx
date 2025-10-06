import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Table, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { fetchNotifications, deleteNotification } from "../../store/userSlice";
import { Search, Trash, Bell } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function NotificationTable() {
    const dispatch = useDispatch();
    const { notificationsList } = useSelector((state) => state.user);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const [checkedIds, setCheckedIds] = useState([]);
    const lastScrollTop = React.useRef(0);
    const fetchTimeout = React.useRef(null);

    useEffect(() => {
        dispatch(fetchNotifications({ limit: 10, pageNo: page }));
    }, [dispatch, page]);

    // Merge new notifications into allUsers when notificationsList or page changes
    useEffect(() => {
        if (notificationsList && notificationsList.length > 0) {
            setAllUsers(prev => {
                // Avoid duplicates by notification_id
                const existingIds = new Set(prev.map(u => u.notification_id));
                const newNotifications = notificationsList.filter(u => !existingIds.has(u.notification_id));
                return [...prev, ...newNotifications];
            });
        }
    }, [notificationsList, page]);

    useEffect(() => {
        // If the last fetch returned less than 10, no more data
        if (notificationsList.length < 10) {
            setHasMore(false);
        } else if (notificationsList.length === 10) {
            setHasMore(true);
        }
    }, [notificationsList]);

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


    // Debounced search handler
    const searchTimeout = useRef(null);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }
        searchTimeout.current = setTimeout(() => {
            dispatch(fetchNotifications({ limit: 10, pageNo: 1, keyword: query }));
            setPage(1);
            setAllUsers([]); // Reset users for new search
        }, 1000);
    };

    const handleDelete = () => {
        if (!checkedIds || checkedIds.length === 0) {
            toast.error("Please select at least one notification to delete.");
            return;
        }
        dispatch(deleteNotification({ notification_id: checkedIds.join(",") }))
            .then((result) => {
                if (result?.payload?.statusCode === 1) {
                    toast.success("Notifications deleted successfully!");
                    setCheckedIds([]);
                    dispatch(fetchNotifications({ limit: 10, pageNo: 1 }));
                    setPage(1);
                    setAllUsers([]);
                }
            });
    };

    // Handler for checkbox change
    const handleCheckboxChange = (couponId) => {
        setCheckedIds(prev =>
            prev.includes(couponId)
                ? prev.filter(id => id !== couponId)
                : [...prev, couponId]
        );
    };

    return (
        <Row>
            <Col sm={ 12 }>
                <Card className="shadow-sm border-0 rounded-3">
                    <Card.Body>
                        <Row className="align-items-center mb-3">
                            <Col>
                                <h5 className="fw-bold d-inline-block me-3 mb-0">Notification List</h5>
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
                        </Row>
                        <div
                            style={ { maxHeight: 600, overflowY: 'auto' } }
                            onScroll={ handleScroll }
                        >
                            { allUsers.map((n, i) => (
                                <Row
                                    key={ i }
                                    className="align-items-center border-bottom py-3 hover-bg-light"
                                    style={ { cursor: 'pointer' } }
                                >
                                    <Col xs="auto">
                                        <input
                                            type="checkbox"

                                            checked={ checkedIds.includes(n.notification_id) }
                                            onChange={ () => handleCheckboxChange(n.notification_id) }
                                        />
                                    </Col>
                                    <Col>
                                        <div className="d-flex align-items-center mb-1">
                                            <span className="fw-semibold">
                                                { n.user?.firstName } { n.user?.lastName }
                                            </span>
                                            <span className="text-muted small ms-2">
                                                (     { n.user?.email })
                                            </span>
                                        </div>
                                        <div className="fw-bold">{ n.title }</div>
                                        <div className="text-muted small">{ n.message }</div>
                                    </Col>
                                    <Col xs="auto" className="text-muted small">
                                        { n.create_at ? new Date(n.create_at).toLocaleString() : "" }
                                    </Col>
                                </Row>
                            )) }
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
