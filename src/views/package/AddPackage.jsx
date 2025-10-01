import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Form, Button, InputGroup, Container } from 'react-bootstrap';
import { GeoAlt } from "react-bootstrap-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addPackage } from "../../store/userSlice";

const schema = Yup.object().shape({
    title: Yup.string().required("Subscription Name is required"),
    packageType: Yup.string().required("Subscription Plan is required"),
    amount: Yup.string().required("Plan Value is required"),
    status: Yup.string().required("Status is required"),
});

export default function AddPackage() {
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
            cityCount: 1,
            amount: "",
            title: "",
            packageType: "",
            status: "",
        },
    });
    const onSubmit = async (data) => {
        try {
            dispatch(addPackage(data))
                .then((result) => {
                    if (result?.payload?.statusCode === 1) {
                        toast.success("Subscription created successfully!");
                        window.location.href = "/packages";
                    }
                })
                .catch((error) => {
                    toast.error("Failed to create subscription. Please try again.");
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
                        <Card.Title as="h5">Create Subscription</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Container fluid className="p-4" style={ { background: "#f9f9f9", minHeight: "100vh" } }>
                            <Row>
                                <Col md={ 12 }>
                                    <Form onSubmit={ handleSubmit(onSubmit) }>
                                        <Row className="align-items-end g-3">
                                            <Col md={ 6 }>
                                                <Form.Group>
                                                    <Form.Label>Subscription Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter title"
                                                        { ...register("title") }
                                                    />
                                                    { errors.title && (
                                                        <div className="text-danger mb-2" style={ { textAlign: 'left', fontSize: '0.9em' } }>{ errors.title.message }</div>
                                                    ) }
                                                </Form.Group>
                                            </Col>
                                            <Col md={ 6 }>
                                                <Form.Group>
                                                    <Form.Label>Subscription Plan</Form.Label>
                                                    <Form.Select { ...register("packageType") }>
                                                        <option value="">Select plan</option>
                                                        <option value="day">1 Day</option>
                                                        <option value="week">1 Week</option>
                                                        <option value="monthly">Monthly</option>
                                                        <option value="yearly">Yearly</option>
                                                    </Form.Select>
                                                    { errors.packageType && (
                                                        <div className="text-danger mb-2" style={ { textAlign: 'left', fontSize: '0.9em' } }>{ errors.packageType.message }</div>
                                                    ) }
                                                </Form.Group>
                                            </Col>
                                            <Col md={ 6 }>
                                                <Form.Group>
                                                    <Form.Label>Plan Value</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter plan value"
                                                        { ...register("amount") }
                                                    />
                                                    { errors.amount && (
                                                        <div className="text-danger mb-2" style={ { textAlign: 'left', fontSize: '0.9em' } }>{ errors.amount.message }</div>
                                                    ) }
                                                </Form.Group>
                                            </Col>
                                            <Col md={ 6 }>
                                                <Form.Group>
                                                    <Form.Label>Status</Form.Label>
                                                    <Form.Select { ...register("status") }>
                                                        <option value="">Select status</option>
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
                                                    </Form.Select>
                                                    { errors.status && (
                                                        <div className="text-danger mb-2" style={ { textAlign: 'left', fontSize: '0.9em' } }>{ errors.status.message }</div>
                                                    ) }
                                                </Form.Group>
                                            </Col>
                                            <Col md={ 12 } className="d-flex justify-content-end">
                                                <Button type="submit" variant="dark" className="w-auto">
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
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
