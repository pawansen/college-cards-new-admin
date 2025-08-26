import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Table } from 'react-bootstrap';
import { fetchPromoCode, deletePromoCodeInfo } from "../../store/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function PromoTable() {
    const dispatch = useDispatch();
    const { promoCodeList, status } = useSelector((state) => state.user);
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
        dispatch(fetchPromoCode({ limit: 10, pageNo: page }));
    }, [dispatch, page]);

    // Merge new users into allUsers when usersList changes
    useEffect(() => {
        if (promoCodeList && promoCodeList.length > 0) {
            setAllUsers(prev => {
                // Avoid duplicates by _id
                const existingIds = new Set(prev.map(u => u._id));
                const newUsers = promoCodeList.filter(u => !existingIds.has(u._id));
                return [...prev, ...newUsers];
            });
        }
    }, [promoCodeList]);

    useEffect(() => {
        // If the last fetch returned less than 10, no more data
        if (promoCodeList.length < 10) {
            setHasMore(false);
        } else if (promoCodeList.length === 10) {
            setHasMore(true);
        }
    }, [promoCodeList]);

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

    const handleDelete = (promo_id) => {
        dispatch(deletePromoCodeInfo({ promo_id: promo_id }))
            .then((result) => {
                if (result?.payload?.statusCode === 1) {
                    toast.success("Promo Code deleted successfully!");
                    dispatch(fetchPromoCode({ limit: 10, pageNo: page }));
                    setPage(1);
                    setAllUsers([]);
                }
            });
    };

    const handleEdit = (user) => {
        // handle edit logic
        window.location.href = `/edit-promocode/${ user.promo_id }`;
    };

    return (
        <Row>
            <Col sm={ 12 }>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Promo Code</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Promo Codes..."
                                style={ { maxWidth: 250 } }
                            // onChange={handleSearch} // implement search logic if needed
                            />
                            <button
                                className="btn"
                                style={ { backgroundColor: "#31434F", color: "#fff" } }
                                onClick={ () => window.location.href = "/add-promocode" }
                            >
                                <i className="fas fa-plus me-2"></i>
                                Create Promo Code
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
                                        <th>Coupon Code</th>
                                        <th>Discount</th>
                                        <th>Usage</th>
                                        <th>Valid Period</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { allUsers.map((cand, idx) => (
                                        <tr key={ cand.promo_id }>
                                            <td>{ cand.code }</td>
                                            <td>${ cand.amount }</td>
                                            <td>{ 0 + "/" + cand.totalUsageLimit }</td>
                                            <td>{ new Date(cand.validFrom).toLocaleDateString() } to { new Date(cand.validTo).toLocaleDateString() }</td>
                                            <td>
                                                <span
                                                    style={ {
                                                        color: cand.status === "active" ? "green" : "red",
                                                        fontWeight: "bold"
                                                    } }
                                                >
                                                    { cand.status === "active" ? "Active" : "Inactive" }
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-warning btn-sm me-1"
                                                    onClick={ () => handleEdit(cand) }
                                                    title="Edit"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={ () => handleDelete(cand.promo_id) }
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
