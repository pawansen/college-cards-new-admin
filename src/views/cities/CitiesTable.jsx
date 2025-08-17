import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Table } from 'react-bootstrap';
import { fetchUpdatedCities } from "../../store/userSlice";
export default function CitiesTable() {
    const dispatch = useDispatch();
    const { updatedCitiesList, status } = useSelector((state) => state.user);
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
        dispatch(fetchUpdatedCities({ limit: 10, pageNo: page }));
    }, [dispatch, page]);

    // Merge new users into allUsers when usersList changes
    useEffect(() => {
        if (updatedCitiesList && updatedCitiesList.length > 0) {
            setAllUsers(prev => {
                // Avoid duplicates by _id
                const existingIds = new Set(prev.map(u => u._id));
                const newUsers = updatedCitiesList.filter(u => !existingIds.has(u._id));
                return [...prev, ...newUsers];
            });
        }
    }, [updatedCitiesList]);

    useEffect(() => {
        // If the last fetch returned less than 10, no more data
        if (updatedCitiesList.length < 10) {
            setHasMore(false);
        } else if (updatedCitiesList.length === 10) {
            setHasMore(true);
        }
    }, [updatedCitiesList]);

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

    // Debounced search handler
    const searchTimeout = useRef(null);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        // if (searchTimeout.current) {
        //     clearTimeout(searchTimeout.current);
        // }
        // searchTimeout.current = setTimeout(() => {
        //     dispatch(fetchCoupons({ limit: 10, pageNo: 1, keyword: query }));
        //     setPage(1);
        //     setAllUsers([]); // Reset users for new search
        // }, 1000);
    };
    const handleStatusDeleteChange = (user_id) => {
        // toast.info(
        //     <div style={ { textAlign: "left" } }>
        //         <div>Are you sure you want to delete the user?</div>
        //         <div style={ { marginTop: 12 } }>
        //             <button
        //                 onClick={ () => {
        //                     toast.dismiss();
        //                     dispatch(updateUserStatus({ user_id, delete: 'yes' }))
        //                         .then((result) => {
        //                             if (result?.payload?.statusCode === 1) {
        //                                 toast.success("User status updated successfully!");
        //                                 setPage(1);
        //                                 setAllUsers([]);
        //                                 dispatch(fetchUsers({ limit: 10, pageNo: 1 }));
        //                             }
        //                         });
        //                 } }
        //                 style={ { marginRight: 8 } }
        //             >
        //                 Yes
        //             </button>
        //             <button onClick={ () => toast.dismiss() }>No</button>
        //         </div>
        //     </div>,
        //     { autoClose: false }
        // );
    };


    return (
        <Row>
            <Col sm={ 12 }>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Cities</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">

                            <div className="d-flex align-items-center" style={ { gap: 12 } }>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search city..."
                                    style={ { maxWidth: 250 } }
                                    onChange={ handleSearch }
                                />
                                {/* <div>
                                    <button
                                        className="btn text-danger"
                                        onClick={ handleDelete }
                                    >
                                        <i className="fas fa-trash me-2"></i>
                                    </button>
                                </div> */}
                            </div>

                            <button
                                className="btn"
                                style={ { backgroundColor: "#31434F", color: "#fff" } }
                                onClick={ () => window.location.href = "/add-city" }
                            >
                                <i className="fas fa-plus me-2"></i>
                                Add City
                            </button>
                        </div>
                        <div
                            style={ { maxHeight: 400, overflowY: "auto" } }
                            onScroll={ handleScroll }
                        >
                            <Table striped bordered hover className="mb-0 ">
                                <thead>
                                    <tr>
                                        <th>City</th>
                                        <th>State</th>
                                        <th>Country</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { allUsers.map((cand, idx) => (
                                        <tr key={ cand._id }>
                                            <td>{ cand.name }</td>
                                            <td>{ cand.state_name }</td>
                                            <td>{ cand.country_name }</td>
                                            <td>{ new Date(cand.create_at).toLocaleDateString() }</td>
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
                                                    onClick={ () => handleStatusDeleteChange(cand.id) }
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
