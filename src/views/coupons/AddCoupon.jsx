import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Form, Button, InputGroup, Container } from 'react-bootstrap';
import { GeoAlt } from "react-bootstrap-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchCities, addCoupon } from "../../store/userSlice";

const schema = Yup.object().shape({
    city: Yup.string().required("City is required"),
    title: Yup.string().required("Title is required"),
    discount: Yup.number().typeError("Discount must be a number").min(0, "Discount cannot be negative").required("Discount is required"),
    // address: Yup.string().required("Address is required"),
    // logo: Yup.string().required("Logo is required"),
});

export default function CouponTable() {
    const dispatch = useDispatch();
    const { allowCitiesList } = useSelector((state) => state.user);
    const [addresses, setAddresses] = useState([]);
    const [date] = useState(new Date().toLocaleDateString("en-GB"));
    const [initState, setInitState] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            city: "",
            title: "",
            discount: "",
            address: "",
            logo: "",
        },
    });

    const logo = watch("logo");
    const city = watch("city");
    const title = watch("title");
    const discount = watch("discount");
    const address = watch("address");

    useEffect(() => {
        if (!initState) {
            dispatch(fetchCities());
            setInitState(true);
        }
    }, [dispatch, initState]);

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setValue("logo", reader.result, { shouldValidate: true });
            reader.readAsDataURL(file);
        }
    };

    const addAddress = () => {
        if (address) {
            setAddresses([...addresses, address]);
            setValue("address", ""); // clear input
        }
    };

    const onSubmit = async (data) => {
        try {
            let address = addresses.map(addr => ({ address: addr }));
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('amount', data.discount);
            // Find city_id from allowCitiesList based on selected city name
            const selectedCity = allowCitiesList.find(c => c.name === data.city);
            formData.append('city_id', selectedCity ? selectedCity.id : '');
            formData.append('address', JSON.stringify(address));
            // Convert base64 logo to Blob if exists
            if (data.logo) {
                const arr = data.logo.split(',');
                const mime = arr[0].match(/:(.*?);/)[1];
                const bstr = atob(arr[1]);
                let n = bstr.length;
                const u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                const file = new File([u8arr], "logo.png", { type: mime });
                formData.append('couponLogo', file);
            }
            dispatch(addCoupon(formData))
                .then((result) => {
                    console.log('result?.payload', result?.payload)
                    if (result?.payload?.statusCode === 1) {
                        toast.success("Coupon created successfully!");
                        window.location.href = "/coupons";
                    }
                })
                .catch((error) => {
                    toast.error("Failed to create coupon. Please try again.");
                });
        } finally {
            // setLoading(false);
        }
    };

    return (
        <Row>
            <Col sm={ 12 }>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Create Coupons</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Container fluid className="p-4" style={ { background: "#f9f9f9", minHeight: "100vh" } }>
                            <Row>
                                {/* Form Section */ }
                                <Col md={ 6 }>
                                    <div className="text-center mb-3">
                                        <label style={ { cursor: "pointer" } }>
                                            <div
                                                style={ {
                                                    border: "2px dashed #ccc",
                                                    borderRadius: "50%",
                                                    width: "100px",
                                                    height: "100px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    margin: "auto",
                                                } }
                                            >
                                                { logo ? (
                                                    <img src={ logo } alt="Logo" style={ { width: "80px", height: "80px" } } />
                                                ) : (
                                                    <span role="img" aria-label="camera">📷</span>
                                                ) }
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                style={ { display: "none" } }
                                                onChange={ handleLogoUpload }
                                            />
                                        </label>
                                        <p className="mt-2">Upload Logo</p>
                                        { errors.logo && (
                                            <div className="text-danger mb-2" style={ { textAlign: 'left', fontSize: '0.9em' } }>{ errors.logo.message }</div>
                                        ) }
                                    </div>
                                    <Form onSubmit={ handleSubmit(onSubmit) }>
                                        <Form.Group className="mb-3">
                                            <Form.Select
                                                { ...register("city") }
                                            >
                                                <option value="">Select City</option>
                                                { allowCitiesList && allowCitiesList.map((c) => (
                                                    <option key={ c.id } value={ c.name }>
                                                        { c.name } ( { c.state_name } - { c.country_name } )
                                                    </option>
                                                )) }
                                            </Form.Select>
                                            { errors.city && (
                                                <div className="text-danger mb-2" style={ { textAlign: 'left', fontSize: '0.9em' } }>{ errors.city.message }</div>
                                            ) }
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter title"
                                                { ...register("title") }
                                            />
                                            { errors.title && (
                                                <div className="text-danger mb-2" style={ { textAlign: 'left', fontSize: '0.9em' } }>{ errors.title.message }</div>
                                            ) }
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter discount"
                                                { ...register("discount") }
                                            />
                                            { errors.discount && (
                                                <div className="text-danger mb-2" style={ { textAlign: 'left', fontSize: '0.9em' } }>{ errors.discount.message }</div>
                                            ) }
                                        </Form.Group>

                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter address"
                                                { ...register("address") }
                                            />
                                            <Button variant="secondary" type="button" onClick={ addAddress }>
                                                +
                                            </Button>
                                        </InputGroup>
                                        { errors.address && (
                                            <div className="text-danger mb-2" style={ { textAlign: 'left', fontSize: '0.9em' } }>{ errors.address.message }</div>
                                        ) }

                                        <Button type="submit" variant="dark" className="w-100">
                                            Done
                                        </Button>
                                    </Form>
                                </Col>

                                {/* Preview Section */ }
                                <Col md={ 6 }>
                                    <h5 className="mb-4 text-center">Coupon Preview</h5>
                                    <Card className="shadow-sm">
                                        <Card.Body className="text-center">
                                            { logo ?
                                                <img src={ logo } alt="Logo" style={ { width: "80px", height: "80px", marginBottom: "10px" } } />
                                                : <div className="text-center mb-3">
                                                    <div
                                                        style={ {
                                                            width: "100px",
                                                            height: "100px",
                                                            borderRadius: "50%",
                                                            backgroundColor: "#EAECED",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            margin: "auto",
                                                            cursor: "pointer"
                                                        } }
                                                    >
                                                        <i className="fa fa-camera"></i>
                                                    </div>
                                                </div> }
                                            <h5>{ title || "Store Name" }</h5>
                                            <h3 className="fw-bold text-primary">{ discount || "00" }% Off</h3>
                                            <div className="text-muted mt-3" style={ { fontSize: "0.9rem" } }>
                                                { addresses.map((addr, index) => (
                                                    <p key={ index } className="mb-1">
                                                        <GeoAlt size={ 16 } className="me-1" />
                                                        { addr }, { city }
                                                    </p>
                                                )) }
                                            </div>
                                            <small className="text-muted">Created: { date }</small>
                                        </Card.Body>
                                        <Card.Footer className="text-white text-center" style={ { background: "#d9534f" } }>
                                            🏙 { city }
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
