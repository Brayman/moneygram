import { NavLink } from "react-router-dom";
import React from 'react'
import { Formik, Form } from "formik";
import { Field } from "../common/Field/Field";
import { Navigation } from "../common/Navigation/Navigation";
import "./Sign.css"
import { signupValidate } from "../../utils/validators/validators";

export const SignUpForm = () => {
    return (
        <section className="signup-page">
            <Navigation className="signup__nav" title="Sign Up" />
            <Formik
                initialValues={{
                    login: '',
                    email: '',
                    password: ''
                }}
                validationSchema={signupValidate}
                onSubmit={form => console.log(form)}
            >
                {() => <Form className="sign__form">
                    <Field
                        className="sign__field"
                        name="login"
                        placeholder="login"
                    />
                    <Field
                        className="sign__field"
                        name="email"
                        placeholder="email"
                    />
                    <Field
                        className="sign__field"
                        name="password"
                        placeholder="password"
                        type="password"
                    />
                    <button className="sign__button primary-btn">
                        Sign Up
                    </button>
                    <span className="sign__footer">
                        Already have an account?
                        <NavLink to="/login" className="sign-link sign-link__subtitle">
                            Login
                        </NavLink>
                    </span>
                </Form>}
            </Formik>

        </section>
    )
}



export default SignUpForm;