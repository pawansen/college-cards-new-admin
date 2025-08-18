import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Table, Form, Button } from 'react-bootstrap';
import { GeoAlt } from "react-bootstrap-icons";
import { fetchCoupons, deleteCoupon } from "../../store/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function CouponTable() {
    const dispatch = useDispatch();
    const { couponsList, status } = useSelector((state) => state.user);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    // State to store checked coupon IDs
    const [checkedIds, setCheckedIds] = useState([]);
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
                const existingIds = new Set(prev.map(u => u.coupon_id));
                const newUsers = couponsList.filter(u => !existingIds.has(u.coupon_id));
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

    const handleDelete = () => {
        if (!checkedIds || checkedIds.length === 0) {
            toast.error("Please select at least one coupon to delete.");
            return;
        }
        dispatch(deleteCoupon({ coupon_id: checkedIds.join(",") }))
            .then((result) => {
                if (result?.payload?.statusCode === 1) {
                    toast.success("Coupons deleted successfully!");
                    setCheckedIds([]);
                    dispatch(fetchCoupons({ limit: 10, pageNo: 1 }));
                    setPage(1);
                    setAllUsers([]);
                }
            });
    };

    const handleEdit = (data) => {
        window.location.href = `/edit-coupon/${ data.coupon_id }`;
    };

    // Debounced search handler
    const searchTimeout = useRef(null);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }
        searchTimeout.current = setTimeout(() => {
            dispatch(fetchCoupons({ limit: 10, pageNo: 1, keyword: query }));
            setPage(1);
            setAllUsers([]); // Reset users for new search
        }, 1000);
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
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Coupons</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">

                            <div className="d-flex align-items-center" style={ { gap: 12 } }>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search coupons..."
                                    style={ { maxWidth: 250 } }
                                    onChange={ handleSearch }
                                />
                                <div>
                                    <button
                                        className="btn text-danger"
                                        onClick={ handleDelete }
                                    >
                                        <i className="fas fa-trash me-2"></i>
                                    </button>
                                </div>
                            </div>

                            <button
                                className="btn"
                                style={ { backgroundColor: "#31434F", color: "#fff" } }
                                onClick={ () => window.location.href = "/add-coupon" }
                            >
                                <i className="fas fa-plus me-2"></i>
                                Create Coupon
                            </button>
                        </div>
                        <div style={ { maxHeight: 600, overflowY: "auto" } } onScroll={ handleScroll }>
                            <div className="p-4">
                                <Row xs={ 1 } sm={ 2 } md={ 3 } lg={ 4 } className="g-4">
                                    { allUsers.map((cand, idx) => (
                                        <Col key={ idx }>
                                            <Card className="shadow-lg border-1 rounded-3 position-relative">
                                                <input
                                                    type="checkbox"
                                                    className="position-absolute"
                                                    style={ { top: "10px", left: "10px" } }
                                                    checked={ checkedIds.includes(cand.coupon_id) }
                                                    onChange={ () => handleCheckboxChange(cand.coupon_id) }
                                                />
                                                {/* Edit Icon */ }
                                                <span
                                                    className="position-absolute"
                                                    style={ { top: "10px", right: "10px", cursor: "pointer", zIndex: 2 } }
                                                    onClick={ () => handleEdit(cand) }
                                                    title="Edit Coupon"
                                                >
                                                    <i className="fas fa-edit" style={ { color: "#31434F", fontSize: "1rem" } }></i>
                                                </span>
                                                <Card.Body className="text-center">
                                                    <img
                                                        src={ cand.logo }
                                                        alt="Starbucks Logo"
                                                        style={ { width: "60px", marginBottom: "10px" } }
                                                    />
                                                    <Card.Title>
                                                        { cand.title
                                                            ? cand.title.charAt(0).toUpperCase() + cand.title.slice(1)
                                                            : "" }
                                                    </Card.Title>
                                                    <Card.Subtitle className="mb-2" style={ { fontSize: "1.2rem", fontWeight: "bold", color: "#31434f" } }>
                                                        { cand.amount }% Off
                                                    </Card.Subtitle>
                                                    { Array.isArray(cand.address) && cand.address.length > 0 ? (
                                                        <p className="text-muted mb-1" style={ { fontSize: "0.85rem", fontWeight: "bold" } }>
                                                            { cand.address.map((addr, i) => (
                                                                <div key={ i }>
                                                                    <GeoAlt size={ 16 } className="me-1" />
                                                                    { addr.address }
                                                                </div>
                                                            )) }
                                                        </p>
                                                    ) : (
                                                        "-"
                                                    ) }
                                                    <p className="text-muted mb-3" style={ { fontSize: "0.75rem" } }>
                                                        Created: { new Date(cand.create_at).toLocaleDateString() }
                                                    </p>
                                                    <Button
                                                        variant="danger"
                                                        className="w-100"
                                                        style={ { borderRadius: "10px" } }
                                                    >
                                                        🏙  { cand?.city?.name }
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )) }
                                </Row>
                            </div>
                            { loading && <div>Loading...</div> }
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
