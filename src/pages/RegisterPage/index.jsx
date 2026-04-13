import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import styles from "./style.module.css";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [reqiestResponse, setRequestResponse] = useState({
    message: "",
    alertClass: "",
  });
  const initialValues = {
    firstName: "",
    email: "",
    mobile: "",
    password: "",
  };
  const onSubmit = (values) => {
    axios
      .post("http://localhost:5000/api/auth/register", values)
      .then(
        (response) => {
          setRequestResponse({
            message: "Registration successful",
            alertClass: "alert alert-success",
          });
        },
        (error) => {
          console.log(error);
          setRequestResponse({
            message: "Registration failed",
            alertClass: "alert alert-danger",
          });
        },
      )
      .catch((error) => {
        console.log(error);
        setRequestResponse({
          message: "An error occurred",
          alertClass: "alert alert-danger",
        });
      });
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Invalid mobile number")
      .required("Mobile is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  //   const validate = (values) => {
  //     let errors = {};
  //     if(!values.firstName){
  //         errors.firstName = "First Name is required"
  //     }
  //     if(!values.email){
  //         errors.email = "Email is required"
  //     }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
  //         errors.email = "Invalid email address"
  //     }
  //     if(!values.mobile){
  //         errors.mobile = "Mobile is required"
  //     }else if(!/^\d{10}$/.test(values.mobile)){
  //         errors.mobile = "Invalid mobile number"
  //     }
  //     if(!values.password){
  //         errors.password = "Password is required"
  //     }else if(values.password.length < 6){
  //         errors.password = "Password must be at least 6 characters"
  //     }
  //     return errors;
  //   }

  const formik = useFormik({
    initialValues,
    onSubmit,
    //validate,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={reqiestResponse.alertClass}>
          {reqiestResponse.message}
        </div>
        <h2>Register</h2>
        <hr />
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="">First Name</label>
            <input
              type="text"
              className={
                formik.errors.firstName && formik.touched.firstName
                  ? "form-control is-invalid"
                  : "form-control"
              }
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <span className="text-danger">{formik.errors.firstName}</span>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="">Email</label>
            <input
              type="email"
              className={
                formik.errors.email && formik.touched.email
                  ? "form-control is-invalid"
                  : "form-control"
              }
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <span className="text-danger">{formik.errors.email}</span>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="">Mobile</label>
            <input
              type="text"
              className={
                formik.errors.mobile && formik.touched.mobile
                  ? "form-control is-invalid"
                  : "form-control"
              }
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.mobile && formik.errors.mobile ? (
              <span className="text-danger">{formik.errors.mobile}</span>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="">Password</label>
            <input
              type="password"
              className={
                formik.errors.password && formik.touched.password
                  ? "form-control is-invalid"
                  : "form-control"
              }
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <span className="text-danger">{formik.errors.password}</span>
            ) : null}
          </div>

          <input
            type="submit"
            value="Register"
            className="btn btn-primary btn-block"
            disabled={!formik.isValid}
          />
        </form>
        <br />
        <p className="text-center">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};
export default RegisterPage;
