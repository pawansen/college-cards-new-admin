import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Form, Button, Container } from 'react-bootstrap';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { addRestaurentsLogo, fetchCities, getRestaurentsLogoInfo } from "../../store/userSlice";
// import your createRestaurant action

const schema = Yup.object().shape({
    title: Yup.string().required("Restaurant Name is required"),
    description: Yup.string().required("Description is required"),
    city_id: Yup.number().typeError("City is required").required("City is required"),
    is_display_nine: Yup.string().required("Display Nine is required"),
    is_featured: Yup.string().required("Featured is required"),
    status: Yup.boolean().required("Status is required"),
    // logo is handled separately
});

export default function EditRestaurants() {
    const dispatch = useDispatch();
    const [logoFile, setLogoFile] = useState(null);
    const { allowCitiesList, getRestaurentsLogoInfoResponse } = useSelector((state) => state.user);
    const [initState, setInitState] = useState(false);
    const [initStateSetForm, setInitStateSetForm] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: "",
            description: "",
            city_id: "",
            is_display_nine: "",
            is_featured: "",
            status: false,
        },
    });
    const logo_id = window.location.pathname.split('/').pop();
    useEffect(() => {
        if (!initState) {
            //dispatch(fetchCities());
            dispatch(getRestaurentsLogoInfo({ logo_id }));
            setInitState(true);
        }
    }, [dispatch, initState]);


    useEffect(() => {
        if (!initStateSetForm && getRestaurentsLogoInfoResponse) {
            setValue("title", getRestaurentsLogoInfoResponse.title);
            setValue("description", getRestaurentsLogoInfoResponse.description);
            // setValue("city_id", getRestaurentsLogoInfoResponse.city_id);
            setValue("is_display_nine", getRestaurentsLogoInfoResponse.is_display_nine);
            setValue("is_featured", getRestaurentsLogoInfoResponse.is_featured);
            setValue("status", getRestaurentsLogoInfoResponse.status);

            dispatch(fetchCities())
                .then((result) => {
                    if (result?.payload?.data) {
                        setValue("city_id", getRestaurentsLogoInfoResponse.city_id);
                        // if (Array.isArray(result.payload.data) && getRestaurentsLogoInfoResponse && getRestaurentsLogoInfoResponse.city_id) {
                        //     selectedCity = result.payload.data.find(c => c.id === getRestaurentsLogoInfoResponse.city_id);
                        //     //setValue("city_id", selectedCity ? selectedCity.id : '');
                        // }
                    }

                })


            setInitStateSetForm(true);
        }
    }, [dispatch, getRestaurentsLogoInfoResponse, initState]);



    const handleLogoChange = (e) => {
        setLogoFile(e.target.files[0]);
    };

    const onSubmit = async (data) => {
        let logoUrl = "";
        // Upload logoFile to your server and get the URL
        // Example using FormData:
        const formData = new FormData();
        if (logoFile) {
            formData.append("restaurentLogo", logoFile);
        }
        formData.append('title', data.title);
        formData.append('city_id', data.city_id);
        formData.append('description', data.description);
        formData.append('is_display_nine', data.is_display_nine);
        formData.append('is_featured', data.is_featured);
        formData.append('status', data.status);
        formData.append('logo_id', logo_id);
        // Replace with your actual upload endpoint
        dispatch(addRestaurentsLogo(formData)).then((result) => {
            console.log("result?.payload", result?.payload);
            if (result?.payload?.statusCode === 1) {
                toast.success("Restaurant updated successfully!");
                window.location.href = "/restaurants-logo";
            }
        })
            .catch(() => {
                toast.error("Failed to update restaurant. Please try again.");
            });

    };

    return (
        <Row>
            <Col sm={ 12 }>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Add Logo</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Container fluid className="p-4" style={ { background: "#f9f9f9", minHeight: "100vh" } }>
                            <Row>
                                <Col md={ 12 }>
                                    <Form onSubmit={ handleSubmit(onSubmit) }>
                                        <Row className="align-items-end g-3">
                                            <Col md={ 6 }>
                                                <Form.Group>
                                                    <Form.Label>Title</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter title"
                                                        { ...register("title") }
                                                    />
                                                    { errors.title && (
                                                        <div className="text-danger mb-2">{ errors.title.message }</div>
                                                    ) }
                                                </Form.Group>
                                            </Col>
                                            <Col md={ 6 }>
                                                <Form.Group>
                                                    <Form.Label>Description</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter description"
                                                        { ...register("description") }
                                                    />
                                                    { errors.description && (
                                                        <div className="text-danger mb-2">{ errors.description.message }</div>
                                                    ) }
                                                </Form.Group>
                                            </Col>
                                            <Col md={ 6 }></Col>
                                            <Form.Group className="mb-3">
                                                <Form.Select
                                                    { ...register("city_id") }
                                                >
                                                    <option value="">Select City</option>
                                                    { allowCitiesList && allowCitiesList.map((c) => (
                                                        <option key={ c.id } value={ c.id }>
                                                            { c.name } ( { c.state_name } - { c.country_name } )
                                                        </option>
                                                    )) }
                                                </Form.Select>
                                                { errors.city_id && (
                                                    <div className="text-danger mb-2" style={ { textAlign: 'left', fontSize: '0.9em' } }>{ errors.city_id.message }</div>
                                                ) }
                                            </Form.Group>

                                            <Col md={ 6 }>
                                                <Form.Group>
                                                    <Form.Label>Logo</Form.Label>
                                                    <Form.Control
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={ handleLogoChange }
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={ 6 }>
                                                <Form.Group>
                                                    <Form.Label>Display Nine</Form.Label>
                                                    <Form.Select { ...register("is_display_nine") }>
                                                        <option value="">Select</option>
                                                        <option value="yes">Yes</option>
                                                        <option value="no">No</option>
                                                    </Form.Select>
                                                    { errors.is_display_nine && (
                                                        <div className="text-danger mb-2">{ errors.is_display_nine.message }</div>
                                                    ) }
                                                </Form.Group>
                                            </Col>
                                            <Col md={ 6 }>
                                                <Form.Group>
                                                    <Form.Label>Featured</Form.Label>
                                                    <Form.Select { ...register("is_featured") }>
                                                        <option value="">Select</option>
                                                        <option value="yes">Yes</option>
                                                        <option value="no">No</option>
                                                    </Form.Select>
                                                    { errors.is_featured && (
                                                        <div className="text-danger mb-2">{ errors.is_featured.message }</div>
                                                    ) }
                                                </Form.Group>
                                            </Col>
                                            <Col md={ 6 }>
                                                <Form.Group>
                                                    <Form.Label>Status</Form.Label>
                                                    <Form.Check
                                                        type="switch"
                                                        label="Active"
                                                        { ...register("status") }
                                                    />
                                                    { errors.status && (
                                                        <div className="text-danger mb-2">{ errors.status.message }</div>
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
        </Row >
    );
}
