import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Table } from 'react-bootstrap';
import { fetchCoupons } from "../../store/userSlice";
export default function CouponTable() {
    const dispatch = useDispatch();
    const { couponsList, status } = useSelector((state) => state.user);
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
        dispatch(fetchCoupons({ limit: 10, pageNo: page }));
    }, [dispatch, page]);

    // Merge new users into allUsers when usersList changes
    useEffect(() => {
        if (couponsList && couponsList.length > 0) {
            setAllUsers(prev => {
                // Avoid duplicates by _id
                const existingIds = new Set(prev.map(u => u._id));
                const newUsers = couponsList.filter(u => !existingIds.has(u._id));
                return [...prev, ...newUsers];
            });
        }
    }, [couponsList]);

    useEffect(() => {
        // If the last fetch returned less than 10, no more data
        if (couponsList.length < 10) {
            setHasMore(false);
        } else if (couponsList.length === 10) {
            setHasMore(true);
        }
    }, [couponsList]);

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
                        <Card.Title as="h5">Coupons</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search coupons..."
                                style={ { maxWidth: 250 } }
                            // onChange={handleSearch} // implement search logic if needed
                            />
                            <button
                                className="btn"
                                style={ { backgroundColor: "#31434F", color: "#fff" } }
                                onClick={ () => window.location.href = "/add-coupon" }
                            >
                                <i className="fas fa-plus me-2"></i>
                                Create Coupon
                            </button>
                        </div>
                    </Card.Body>
                    <Card.Body>
                        <div
                            style={ { maxHeight: 400, overflowY: "auto" } }
                            onScroll={ handleScroll }
                        >
                            <Table striped bordered hover className="mb-0 ">
                                <thead>
                                    <tr>
                                        <th>Logo</th>
                                        <th>Title</th>
                                        <th>Discount</th>
                                        {/* <th>City</th> */ }
                                        <th>Address</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { allUsers.map((cand, idx) => (
                                        <tr key={ cand._id }>
                                            <td>                        { cand.logo ? (
                                                <img src={ cand.logo } alt="logo" style={ { width: 40, height: 40, objectFit: "contain" } } />
                                            ) : (
                                                "-"
                                            ) }</td>
                                            <td>{ cand.title }</td>
                                            <td>{ cand.amount }%</td>
                                            <td>
                                                { Array.isArray(cand.address) && cand.address.length > 0 ? (
                                                    cand.address.map(addr => (
                                                        <div key={ addr._id }>{ addr.address },</div>
                                                    ))
                                                ) : (
                                                    "-"
                                                ) }</td>
                                            <td>{ new Date(cand.create_at).toLocaleDateString() }</td>
                                            {/* <td>
                                                <select
                                                    value={ cand?.status }
                                                    onChange={ (e) => handleStatusChange(cand._id, e.target.value === "true") }
                                                    className="status-dropdown"
                                                >
                                                    { statusOptions.map((status) => (
                                                        <option key={ status.value } value={ status.value }>
                                                            { status.label }
                                                        </option>
                                                    )) }
                                                </select>
                                            </td> */}
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
