import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Form, Button, Container } from 'react-bootstrap';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addUpdateCity, fetchCountries, fetchStates, fetchCitiesCustom } from "../../store/userSlice";

const schema = Yup.object().shape({
    city: Yup.string().required("City is required"),
});

export default function AddCity() {
    const dispatch = useDispatch();
    const { countriesList, statesList, citiesList } = useSelector((state) => state.user);
    const [initState, setInitState] = useState(false);
    const [city, setCity] = useState("");

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
        },
    });

    useEffect(() => {
        if (!initState) {
            dispatch(fetchCountries());
            setInitState(true);
        }
    }, [dispatch, initState]);

    const getState = (countryId) => {
        dispatch(fetchStates({ country_id: countryId }));
    };

    const getCity = (stateId) => {
        dispatch(fetchCitiesCustom({ state_id: stateId }));
    };

    const onSubmit = async () => {
        try {
            dispatch(addUpdateCity({ action: "add", city }))
                .then((result) => {
                    if (result?.payload?.statusCode === 1) {
                        toast.success("City created successfully!");
                        window.location.href = "/cities";
                    }
                })
                .catch((error) => {
                    toast.error("Failed to create city. Please try again.");
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
                                                { ...register("country_id") }
                                                onChange={ (e) => getState(e.target.value) }
                                            >
                                                <option value="">Select Country</option>
                                                { countriesList && countriesList.map((country) => (
                                                    <option key={ country.id } value={ country.id }>
                                                        { country.name }
                                                    </option>
                                                )) }
                                            </Form.Select>
                                            { errors.country_id && (
                                                <div className="text-danger mb-2" style={ { textAlign: 'left', fontSize: '0.9em' } }>{ errors.country_id.message }</div>
                                            ) }
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Select
                                                { ...register("state_id") }
                                                onChange={ (e) => getCity(e.target.value) }
                                            >
                                                <option value="">Select State</option>
                                                { statesList && statesList.map((state) => (
                                                    <option key={ state.id } value={ state.id }>
                                                        { state.name }
                                                    </option>
                                                )) }
                                            </Form.Select>
                                            { errors.state && (
                                                <div className="text-danger mb-2" style={ { textAlign: 'left', fontSize: '0.9em' } }>{ errors.state.message }</div>
                                            ) }
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Select
                                                { ...register("city") }
                                                onChange={ (e) => setCity(e.target.value) }
                                            >
                                                <option value="">Select City</option>
                                                { fetchCitiesCustom && citiesList.map((city) => (
                                                    <option key={ city.id } value={ city.id }>
                                                        { city.name }
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
