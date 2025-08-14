import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Table } from 'react-bootstrap';
import { fetchUsers } from "../../store/userSlice";
export default function UserTable() {
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
                        <Card.Title as="h5">Users</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div
                            style={ { maxHeight: 400, overflowY: "auto" } }
                            onScroll={ handleScroll }
                        >
                            <Table striped bordered hover className="mb-0 ">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Subscribe</th>
                                        <th>Referral Code</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { allUsers.map((cand, idx) => (
                                        <tr key={ cand._id }>
                                            <td>{ cand.firstName + " " + cand.lastName }</td>
                                            <td>{ cand.email }</td>
                                            <td>{ cand.mobile }</td>
                                            <td>
                                                {/* Replace "No" with icon */ }
                                                <span title="Not Subscribed" style={ { color: "#dc3545" } }>
                                                    <i className="bi bi-x-circle-fill"></i>
                                                </span>
                                            </td>
                                            <td>{ cand.referralCode }</td>
                                            <td>{ new Date(cand.createDate).toLocaleDateString() }</td>
                                            <td>
                                                <select
                                                    value={ cand.isActive }
                                                    onChange={ (e) => handleStatusChange(cand._id, e.target.value === "true") }
                                                    className="status-dropdown"
                                                >
                                                    { statusOptions.map((status) => (
                                                        <option key={ status.value } value={ status.value }>
                                                            { status.label }
                                                        </option>
                                                    )) }
                                                </select>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-info btn-sm me-1"
                                                    onClick={ () => {/* handle view logic */ } }
                                                    title="View"
                                                >
                                                    <i className="fas fa-eye"></i>
                                                </button>
                                                <button
                                                    className="btn btn-warning btn-sm me-1"
                                                    onClick={ () => handleEdit(cand) }
                                                    title="Edit"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={ () => setConfirmDeleteId(cand._id) }
                                                    title="Delete"
                                                >
                                                    <i className="fas fa-trash"></i>
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
    );
}
