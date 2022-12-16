import { NavLink } from "react-router-dom";
import React, { useState } from 'react';
import "./Sign.css";
import { Formik, Form } from "formik";
import { Field } from "../common/Field/Field";
import { Navigation } from "../common/Navigation/Navigation";

import { signupGithubValidate, signupValidate } from "../../utils/validators/validators";
import { Button } from "../common/Button/Buttons";
import { API } from "../../api/api";

export const SignUpForm = ({ onSubmit }) => {
    const [type, setType] = useState('github')
    const github = async (setValues) => {
        const res = await API.SignUpGitHub()
        console.log(res);
        setType('github')
        setValues({ ...res }, false)
    };
    return (
        <section className="signup-page">
            <Navigation className="signup__nav" title="Sign Up" />
            <Formik
                initialValues={{
                    login: '',
                    email: '',
                }}
                validationSchema={signupGithubValidate}
                onSubmit={form => {console.log('please');;onSubmit(form)}}
            >
                {({ setValues, isValid }) => <Form className="sign__form">
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
                    {
                        type === 'local' ? <Field
                            className="sign__field"
                            name="password"
                            placeholder="password"
                            type="password"
                        /> : null
                    }

                    <Button primary type='submit' disabled={!isValid} className="sign__button">
                        Sign Up
                    </Button>
                    <Button primary className="sign__button" onClick={() => github(setValues)}>
                        Sign Up With GitHub
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