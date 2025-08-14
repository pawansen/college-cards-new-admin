import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Card, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';
import logoDark from 'assets/images/m-logo.svg';
import "react-toastify/dist/ReactToastify.css";
import { fetchLogin } from "../../store/userSlice";
const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
  rememberMe: Yup.boolean(),
});

export default function SignIn1() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "A@123456",
      rememberMe: true,
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // Add deviceType and deviceToken as required by API
      const payload = {
        ...data,
        deviceType: "android",
        deviceToken: "123",
      };
      delete payload.rememberMe;
      const result = await dispatch(fetchLogin(payload)).unwrap();
      if (result?.statusCode === 1) {
        const userData = result?.data;
        if (data.rememberMe) {
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("token", userData?.token);
          localStorage.setItem("tokenTime", Date.now());
        } else {
          sessionStorage.setItem("user", JSON.stringify(userData));
          sessionStorage.setItem("token", userData?.token);
          sessionStorage.setItem("tokenTime", Date.now());
        }
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error(result?.message || "Login failed");
      }
    } catch (err) {
      if (err.name === "TypeError") {
        toast.error("Failed to connect to server. Please try again.");
      } else {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-content text-center">
        <Card className="borderless">
          <Row className="align-items-center text-center">
            <form onSubmit={ handleSubmit(onSubmit) } className="auth-form">
              <Col>
                <Card.Body className="card-body">
                  <img src={ logoDark } alt="" className="img-fluid mb-4" />
                  <h4 className="mb-3 f-w-400">Signin</h4>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FeatherIcon icon="mail" />
                    </InputGroup.Text>
                    <Form.Control
                      { ...register("email") }
                      type="email"
                      placeholder="Email address"
                      isInvalid={ !!errors.email }
                    />
                  </InputGroup>
                  { errors.email && (
                    <div className="text-danger mb-2" style={ { textAlign: 'left', fontSize: '0.9em' } }>{ errors.email.message }</div>
                  ) }
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FeatherIcon icon="lock" />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      { ...register("password") }
                      placeholder="Password"
                      isInvalid={ !!errors.password }
                    />
                  </InputGroup>
                  { errors.password && (
                    <div className="text-danger mb-2" style={ { textAlign: 'left', fontSize: '0.9em' } }>{ errors.password.message }</div>
                  ) }
                  <Form.Group className="text-left mb-4 mt-2">
                    <Form.Check
                      type="checkbox"
                      label="Save Credentials."
                      { ...register("rememberMe") }
                      defaultChecked
                    />
                  </Form.Group>
                  <Button
                    className="btn btn-block btn-primary mb-4"
                    type="submit"
                    disabled={ loading }
                  >
                    { loading ? 'Signing in...' : 'Signin' }
                  </Button>
                  {/* <p className="mb-2 text-muted">
                  Forgot password?{ ' ' }
                  <NavLink to="#" className="f-w-400">
                    Reset
                  </NavLink>
                </p> */}
                  {/* <p className="mb-0 text-muted">
                  Don’t have an account?{ ' ' }
                  <NavLink to="/register" className="f-w-400">
                    Signup
                  </NavLink>
                </p> */}
                </Card.Body>
              </Col>
            </form>
          </Row>
        </Card>
      </div>
    </div>
  );
}
