import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Table, Container, Tabs, Tab } from 'react-bootstrap';
import { fetchUsers } from "../../store/userSlice";
export default function ReferralsTable() {
    const dispatch = useDispatch();
    const { usersList, status } = useSelector((state) => state.user);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const dropdownRefs = useRef([]);
    const statusOptions = [
        { value: true, label: "Active" },
        { value: false, label: "Inactive" }
    ];
    const lastScrollTop = React.useRef(0);
    const fetchTimeout = React.useRef(null);

    useEffect(() => {
        dispatch(fetchUsers({ limit: 10, pageNo: page }));
    }, [dispatch, page]);

    // Merge new users into allUsers when usersList changes
    useEffect(() => {
        if (usersList && usersList.length > 0) {
            setAllUsers(prev => {
                // Avoid duplicates by _id
                const existingIds = new Set(prev.map(u => u._id));
                const newUsers = usersList.filter(u => !existingIds.has(u._id));
                return [...prev, ...newUsers];
            });
        }
    }, [usersList]);

    useEffect(() => {
        // If the last fetch returned less than 10, no more data
        if (usersList.length < 10) {
            setHasMore(false);
        } else if (usersList.length === 10) {
            setHasMore(true);
        }
    }, [usersList]);

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

    const handleStatusChange = (userId, isActive) => {
        // dispatch(updateUserStatus({ userId, isActive }));
    };

    const handleEdit = (user) => {
        // handle edit logic
    };

    return (
        <Row>
            <Col sm={ 12 }>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Referrals</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Container className="py-4">
                            {/* Top Summary Cards */ }
                            <Row className="g-3 mb-4">
                                <Col md={ 3 } sm={ 6 }>
                                    <Card className="shadow-sm text-center">
                                        <Card.Body>
                                            <h6 className="text-muted">Total Referrals</h6>
                                            <h3>00</h3>
                                            <small className="text-success">⬆ 12% From last Year</small>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={ 3 } sm={ 6 }>
                                    <Card className="shadow-sm text-center">
                                        <Card.Body>
                                            <h6 className="text-muted">Successful Referrals</h6>
                                            <h3>00</h3>
                                            <small className="text-success">⬆ 12% From last Year</small>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={ 3 } sm={ 6 }>
                                    <Card className="shadow-sm text-center">
                                        <Card.Body>
                                            <h6 className="text-muted">Pending Referrals</h6>
                                            <h3>00</h3>
                                            <small className="text-success">⬆ 12% From last Year</small>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={ 3 } sm={ 6 }>
                                    <Card className="shadow-sm text-center">
                                        <Card.Body>
                                            <h6 className="text-muted">Revenue Generated</h6>
                                            <h3>$00</h3>
                                            <small className="text-success">⬆ 12% From last Year</small>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            {/* Referral Management Section */ }
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <h5 className="fw-bold mb-3">Referral Management</h5>

                                    {/* Tabs */ }
                                    <Tabs defaultActiveKey="users" className="mb-4">
                                        <Tab eventKey="users" title="Referred Users List">
                                            {/* Empty State */ }
                                            <div className="text-center py-5">
                                                <img
                                                    src="/empty-referrals.png" // replace with your image path
                                                    alt="No Referrals"
                                                    style={ { maxWidth: "250px" } }
                                                    className="mb-3"
                                                />
                                                <h5 className="fw-bold">No Referrals Yet</h5>
                                                <p className="text-muted">
                                                    Users haven’t shared any referral links yet. Once they start
                                                    referring friends, you’ll be able to track referral activity
                                                    and rewards here.
                                                </p>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="stats" title="Referrals Stats">
                                            <p className="text-muted text-center my-5">
                                                Stats will appear here.
                                            </p>
                                        </Tab>
                                        <Tab eventKey="rewards" title="Reward Earn">
                                            <p className="text-muted text-center my-5">
                                                Reward details will appear here.
                                            </p>
                                        </Tab>
                                    </Tabs>
                                </Card.Body>
                            </Card>
                        </Container>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
