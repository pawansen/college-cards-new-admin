import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Form, Button, InputGroup, Container } from 'react-bootstrap';
import { GeoAlt } from "react-bootstrap-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updatePromoCodeInfo, fetchPromoCodeInfo } from "../../store/userSlice";

const schema = Yup.object().shape({
    title: Yup.string().required("Subscription Name is required"),
    code: Yup.string().required("Promo Code is required"),
    amount: Yup.number().typeError("Plan Value must be a number").required("Plan Value is required"),
    maxUsagePerUser: Yup.number().typeError("Max Usage Per User must be a number").required("Max Usage Per User is required"),
    totalUsageLimit: Yup.number().typeError("Total Usage Limit must be a number").required("Total Usage Limit is required"),
    status: Yup.string().required("Status is required"),
    validFrom: Yup.date().required("Valid From date is required"),
    validTo: Yup.date()
        .required("Valid To date is required")
        .min(Yup.ref('validFrom'), "Valid To date cannot be before Valid From date"),
});

export default function EditPromocode() {
    const dispatch = useDispatch();
    const { promoCodeInfo } = useSelector((state) => state.user);
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
            title: "",
            code: "",
            amount: "",
            maxUsagePerUser: "",
            totalUsageLimit: "",
            status: "",
            validFrom: "",
            validTo: "",
        },
    });

    // Get promo_id from URL
    const promo_id = window.location.pathname.split('/').pop();

    useEffect(() => {
        dispatch(fetchPromoCodeInfo({ promo_id }));
    }, [dispatch, promo_id]);

    useEffect(() => {
        if (promoCodeInfo) {
            setValue("title", promoCodeInfo.title);
            setValue("code", promoCodeInfo.code);
            setValue("amount", promoCodeInfo.amount);
            setValue("maxUsagePerUser", promoCodeInfo.maxUsagePerUser);
            setValue("totalUsageLimit", promoCodeInfo.totalUsageLimit);
            setValue("status", promoCodeInfo.status);
            setValue("validFrom", promoCodeInfo.validFrom ? promoCodeInfo.validFrom.split('T')[0] : "");
            setValue("validTo", promoCodeInfo.validTo ? promoCodeInfo.validTo.split('T')[0] : "");
        }
    }, [promoCodeInfo, setValue]);


    const onSubmit = async (data) => {
        try {
            dispatch(updatePromoCodeInfo({ ...data, promo_id }))
                .then((result) => {
                    if (result?.payload?.statusCode === 1) {
                        toast.success("Promo Code updated successfully!");
                        window.location.href = "/promocode";
                    }
                })
                .catch((error) => {
                    toast.error("Failed to update promo code. Please try again.");
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
                        <Card.Title as="h5">Edit Promo Code</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Container fluid className="p-4" style={ { background: "#f9f9f9", minHeight: "100vh" } }>
                            <Row>
                                <Col md={ 12 }>
                                    <Form onSubmit={ handleSubmit(onSubmit) }>
                                        <Row className="align-items-end g-3">
                                            <Col md={ 6 }>
                                                <Form.Group>
                                                    <Form.Label>Promo Code Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter promo code name"
                                                        { ...register("title") }
                                                    />
                                                    { errors.title && (
                                                        <div className="text-danger mb-2" style={ { textAlign: 'left', fontSize: '0.9em' } }>{ errors.title.message }</div>
                                                    ) }
                                                </Form.Group>
                                            </Col>
                                            <Col md={ 6 }>
                                                <Form.Group>
                                                    <Form.Label>Promo Code</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter promo code"
                                                        { ...register("code") }
                                                    />
                                                    { errors.code && (
                                                        <div className="text-danger mb-2" style={ { textAlign: 'left', fontSize: '0.9em' } }>{ errors.code.message }</div>
                                                    ) }
                                                </Form.Group>
                                            </Col>
                                            <Col md={ 6 }>
                                                <Form.Group>
                                                    <Form.Label>Discount Value</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter discount value"
                                                        { ...register("amount") }
                                                    />
                                                    { errors.amount && (
                                                        <div className="text-danger mb-2" style={ { textAlign: 'left', fontSize: '0.9em' } }>{ errors.amount.message }</div>
                                                    ) }
                                                </Form.Group>
                                            </Col>
                                            <Col md={ 6 }>
                                                <Form.Group>
                                                    <Form.Label>Max Usage Per User</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter max usage per user"
                                                        { ...register("maxUsagePerUser") }
                                                    />
                                                    { errors.maxUsagePerUser && (
                                                        <div className="text-danger mb-2" style={ { textAlign: 'left', fontSize: '0.9em' } }>{ errors.maxUsagePerUser.message }</div>
                                                    ) }
                                                </Form.Group>
                                            </Col>
                                            <Col md={ 6 }>
                                                <Form.Group>
                                                    <Form.Label>Total Usage Limit</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter total usage limit"
                                                        { ...register("totalUsageLimit") }
                                                    />
                                                    { errors.totalUsageLimit && (
                                                        <div className="text-danger mb-2" style={ { textAlign: 'left', fontSize: '0.9em' } }>{ errors.totalUsageLimit.message }</div>
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
                                            <Col md={ 6 }>
                                                <Form.Group>
                                                    <Form.Label>Valid From</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        { ...register("validFrom") }
                                                    />
                                                    { errors.validFrom && (
                                                        <div className="text-danger mb-2" style={ { textAlign: 'left', fontSize: '0.9em' } }>{ errors.validFrom.message }</div>
                                                    ) }
                                                </Form.Group>
                                            </Col>
                                            <Col md={ 6 }>
                                                <Form.Group>
                                                    <Form.Label>Valid To</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        { ...register("validTo") }
                                                    />
                                                    { errors.validTo && (
                                                        <div className="text-danger mb-2" style={ { textAlign: 'left', fontSize: '0.9em' } }>{ errors.validTo.message }</div>
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
