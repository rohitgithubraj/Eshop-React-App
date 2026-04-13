import React, { useState} from "react";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
  const [requestResponse, setRequestResponse] = useState({
    message: "",
    className: "",
  });
  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = (values) => {
    axios
      .post("http://localhost:5000/api/auth/login", values)
      .then(
        (response) => {
            
          setRequestResponse({
            message: "Login successful!",
            className: "alert alert-success",
          });

          localStorage.setItem("token", response.data.access_token);

          navigate("/");
        },
        (error) => {
          setRequestResponse({
            message: "Login failed. Please check your credentials.",
            className: "alert alert-danger",
          });
        },
      )
      .catch((error) => {
        console.error(error);
      });
  };

  const validateSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={requestResponse.className} role="alert">
          {requestResponse.message}
        </div>
        <h2>Login</h2>
        <hr />
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          {(formik) => {
            return (
              <Form>
                <div className="form-group">
                  <label htmlFor="">Email</label>
                  <Field
                    type="text"
                    name="email"
                    id="email"
                    className={
                      formik.touched.email && formik.errors.email
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  <ErrorMessage name="email">
                    {(errorMessage) => (
                      <span className="text-danger">{errorMessage}</span>
                    )}
                  </ErrorMessage>
                </div>

                <div className="form-group">
                  <label htmlFor="">Password</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className={
                      formik.touched.password && formik.errors.password
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  <ErrorMessage name="password">
                    {(errorMessage) => (
                      <span className="text-danger">{errorMessage}</span>
                    )}
                  </ErrorMessage>
                </div>
                <input
                  type="submit"
                  value="Login"
                  disabled={!formik.isValid}
                  className="btn btn-primary btn-block"
                />
              </Form>
            );
          }}
        </Formik>
        <br />
        <p className="text-center">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;
