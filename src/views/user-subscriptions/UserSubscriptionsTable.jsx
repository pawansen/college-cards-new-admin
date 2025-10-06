import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Table } from 'react-bootstrap';
import { fetchUserSubscriptions } from "../../store/userSlice";
export default function UserSubscriptionsTable() {
    const dispatch = useDispatch();
    const { allSubscribeList, status } = useSelector((state) => state.user);
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
        dispatch(fetchUserSubscriptions({ limit: 10, pageNo: page }));
    }, [dispatch, page]);

    // Merge new users into allUsers when allSubscribeList changes
    useEffect(() => {
        if (allSubscribeList && allSubscribeList.length > 0) {
            setAllUsers(prev => {
                // Avoid duplicates by _id
                const existingIds = new Set(prev.map(u => u._id));
                const newUsers = allSubscribeList.filter(u => !existingIds.has(u._id));
                return [...prev, ...newUsers];
            });
        }
    }, [allSubscribeList]);

    useEffect(() => {
        // If the last fetch returned less than 10, no more data
        if (allSubscribeList.length < 10) {
            setHasMore(false);
        } else if (allSubscribeList.length === 10) {
            setHasMore(true);
        }
    }, [allSubscribeList]);

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
            dispatch(fetchUserSubscriptions({ limit: 10, pageNo: 1, keyward: query }));
            setPage(1);
            setAllUsers([]); // Reset users for new search
        }, 1000);
    };

    const handleStatusChange = (userId, isActive) => {
        // dispatch(updateUserStatus({ userId, isActive }));
    };

    const handleEdit = (user) => {
        // handle edit logic
    };

    // Date filter state
    const [fromDate, setFromDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Handle date filter change
    const handleDateChange = (type, value) => {
        if (type === "from") setFromDate(value);
        if (type === "end") setEndDate(value);

        // Debounce API call
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }
        searchTimeout.current = setTimeout(() => {
            dispatch(
                fetchUserSubscriptions({
                    limit: 10,
                    pageNo: 1,
                    fromDate: type === "from" ? value : fromDate,
                    endDate: type === "end" ? value : endDate,
                })
            );
            setPage(1);
            setAllUsers([]);
        }, 500);
    };

    return (
        <Row>
            <Col sm={ 12 }>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">User Subscriptions</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                            <div className="d-flex align-items-center" style={ { gap: 12 } }>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search users..."
                                    style={ { maxWidth: 250 } }
                                    onChange={ handleSearch }
                                />
                                <input
                                    type="date"
                                    className="form-control"
                                    style={ { maxWidth: 160 } }
                                    value={ fromDate }
                                    onChange={ e => handleDateChange("from", e.target.value) }
                                    placeholder="From date"
                                />
                                <input
                                    type="date"
                                    className="form-control"
                                    style={ { maxWidth: 160 } }
                                    value={ endDate }
                                    onChange={ e => handleDateChange("end", e.target.value) }
                                    placeholder="End date"
                                />
                            </div>
                        </div>
                        <div
                            style={ { maxHeight: 400, overflowY: "auto" } }
                            onScroll={ handleScroll }
                        >
                            <Table striped bordered hover className="mb-0 ">
                                <thead>
                                    <tr>
                                        <th>User Name</th>
                                        <th>City</th>
                                        <th>Email</th>
                                        <th>Subscription</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { allUsers.map((cand, idx) => {
                                        let statusColor = "";
                                        switch (cand.status) {
                                            case "active":
                                                statusColor = "green";
                                                break;
                                            case "inactive":
                                                statusColor = "gray";
                                                break;
                                            case "cancelled":
                                                statusColor = "red";
                                                break;
                                            case "expired":
                                                statusColor = "orange";
                                                break;
                                            case "cancelledUsedFullMonth":
                                                statusColor = "purple";
                                                break;
                                            default:
                                                statusColor = "black";
                                        }
                                        return (
                                            <tr key={ cand._id }>
                                                <td>{ cand.user?.firstName } { cand.user?.lastName }</td>
                                                <td>{ cand?.cityList[0].name }</td>
                                                <td>{ cand.user?.email }</td>
                                                <td>${ cand.amount }</td>
                                                <td>{ new Date(cand.startDate).toLocaleDateString() }</td>
                                                <td>
                                                    <span style={ { color: statusColor } }>
                                                        { cand.status }
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    }) }
                                </tbody>
                            </Table>
                            { loading && <div>Loading...</div> }
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
