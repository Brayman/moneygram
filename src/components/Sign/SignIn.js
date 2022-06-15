import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, useFormikContext } from "formik";
import { Navigation } from "../common/Navigation/Navigation";
import "./SignIn.css";
import { Field } from "../common/Field/Field";
import { validate, validateYup } from "../../utils/validators/validators";
import { useSelector } from "react-redux";
import { app } from "../../redux/selectors";
import React, { useEffect } from "react";

export const MyForm = ({ isValid, ...props }) => {
    const login = useSelector(app).login
    useEffect(() => {
        if (login.error) {
            props.setErrors({ login: login.message, password: login.message })
        }
    }, [login])
    return (
        <Form className="signin">
            <Field
                name="login"
                className="signin__field"
                placeholder="login"
            />
            <Field
                className="signin__field"
                name="password"
                type="password"
                placeholder="password"
            />
            <button
                disabled={!isValid}
                className="primary-btn signin__button"
                type="submit"
            >
                Login
            </button>
            <NavLink to="/signin" className="signin-link signin-link__title">
                Forgot password?
            </NavLink>
            <span className="signin__footer">
                Don't have an account yet?
                <NavLink to="/sign-up" className="signin-link signin-link__subtitle">
                    Sign Up
                </NavLink>
            </span>
        </Form>
    )
}


const SignIn = ({ Login, init }) => {
    const navigate = useNavigate
    if (init) {
        return <Navigate to={-1} replace={true} />
    }

    return (
        <section>
            <Navigation title={"login"} className='signin-nav' />
            <Formik
                initialValues={{
                    login: '',
                    password: '',
                    form: ''
                }}
                validationSchema={validateYup}
                onSubmit={formData => Login(formData)}
            >
                {(props) => <MyForm {...props} />}
            </Formik>
        </section>
    )




}

export default SignIn;