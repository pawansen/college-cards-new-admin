import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Form, Button, InputGroup, Container } from 'react-bootstrap';
import { GeoAlt } from "react-bootstrap-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchCities, addCoupon, fetchCountries, fetchStates, fetchCitiesCustom } from "../../store/userSlice";

const schema = Yup.object().shape({
    city: Yup.string().required("City is required"),
});

export default function AddCity() {
    const dispatch = useDispatch();
    const { allowCitiesList, countriesList, statesList, citiesList } = useSelector((state) => state.user);
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

    const address = watch("address");

    useEffect(() => {
        if (!initState) {
            dispatch(fetchCountries());
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
                        <Card.Title as="h5">Add City</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Container fluid className="p-4" style={ { background: "#f9f9f9", minHeight: "100vh" } }>
                            <Row>
                                {/* Form Section */ }
                                <Col md={ 6 }>
                                    <Form onSubmit={ handleSubmit(onSubmit) }>
                                        <Form.Group className="mb-3">
                                            <Form.Select
                                                { ...register("city_id") }
                                            >
                                                <option value="">Select Country</option>
                                                { countriesList && countriesList.map((country) => (
                                                    <option key={ country.id } value={ country.id }>
                                                        { country.name }
                                                    </option>
                                                )) }
                                            </Form.Select>
                                            { errors.city && (
                                                <div className="text-danger mb-2" style={ { textAlign: 'left', fontSize: '0.9em' } }>{ errors.city.message }</div>
                                            ) }
                                        </Form.Group>

                                        <Button type="submit" variant="dark" className="w-100">
                                            Done
                                        </Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
