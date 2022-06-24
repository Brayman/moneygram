import { NavLink } from "react-router-dom";
import React from 'react';
import "./Sign.css";
import { Formik, Form } from "formik";
import { Field } from "../common/Field/Field";
import { Navigation } from "../common/Navigation/Navigation";

import { signupValidate } from "../../utils/validators/validators";
import { Button } from "../common/Button/Buttons";

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
                    <Button primary className="sign__button">
                        Sign Up
                    </Button>
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