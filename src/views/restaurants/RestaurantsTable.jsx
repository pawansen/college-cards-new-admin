import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Table } from 'react-bootstrap';
import { fetchRestaurentsLogo, deleteRestaurantLogo } from "../../store/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function RestaurantsTable() {
    const dispatch = useDispatch();
    const { restaurentsLogoList, status } = useSelector((state) => state.user);
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
        dispatch(fetchRestaurentsLogo({ limit: 10, pageNo: page }));
    }, [dispatch, page]);

    const searchTimeout = useRef(null);
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }
        searchTimeout.current = setTimeout(() => {
            dispatch(fetchRestaurentsLogo({ limit: 10, pageNo: 1, keyword: query }));
            setPage(1);
            setAllUsers([]);
        }, 1000);
    };

    // Merge new users into allUsers when usersList changes
    useEffect(() => {
        if (restaurentsLogoList && restaurentsLogoList.length > 0) {
            setAllUsers(prev => {
                // Avoid duplicates by _id
                const existingIds = new Set(prev.map(u => u._id));
                const newUsers = restaurentsLogoList.filter(u => !existingIds.has(u._id));
                return [...prev, ...newUsers];
            });
        }
    }, [restaurentsLogoList]);

    useEffect(() => {
        // If the last fetch returned less than 10, no more data
        if (restaurentsLogoList.length < 10) {
            setHasMore(false);
        } else if (restaurentsLogoList.length === 10) {
            setHasMore(true);
        }
    }, [restaurentsLogoList]);

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

    const handleDelete = (logo_id) => {
        dispatch(deleteRestaurantLogo({ logo_id: logo_id }))
            .then((result) => {
                if (result?.payload?.statusCode === 1) {
                    toast.success("Restaurant Logo deleted successfully!");
                    dispatch(fetchRestaurentsLogo({ limit: 10, pageNo: page }));
                    setPage(1);
                    setAllUsers([]);
                }
            });
    };

    const handleEdit = (user) => {
        // handle edit logic
        window.location.href = `/edit-restaurant-logo/${ user.logo_id }`;
    };

    return (
        <Row>
            <Col sm={ 12 }>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Restaurant Logo</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Logo..."
                                style={ { maxWidth: 250 } }
                                onChange={ handleSearch } // implement search logic if needed
                            />
                            <button
                                className="btn"
                                style={ { backgroundColor: "#31434F", color: "#fff" } }
                                onClick={ () => window.location.href = "/add-restaurant-logo" }
                            >
                                <i className="fas fa-plus me-2"></i>
                                Add Restaurant Logo
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
                                        <th>City</th>
                                        <th>Description</th>
                                        <th>Is Featured?</th>
                                        <th>Is Display 9 ?</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { allUsers.map((cand, idx) => (
                                        <tr key={ cand.logo_id }>
                                            <td><img src={ cand.logo } alt={ cand.title } width="65" /></td>
                                            <td>{ cand.title }</td>
                                            <td>{ cand.city?.name }</td>
                                            <td>{ cand.description }</td>
                                            <td>{ cand.is_featured }</td>
                                            <td>{ cand.is_display_nine }</td>
                                            <td>
                                                <span
                                                    style={ {
                                                        color: cand.status ? "green" : "red",
                                                        fontWeight: "bold"
                                                    } }
                                                >
                                                    { cand.status ? "Active" : "Inactive" }
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
                                                    onClick={ () => handleDelete(cand.logo_id) }
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
