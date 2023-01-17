import { Navigate, NavLink, useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import { Navigation } from "../common/Navigation/Navigation";
import "./Sign.css";
import { Field } from "../common/Field/Field";
import { loginValidate } from "../../utils/validators/validators";
import { useSelector } from "react-redux";
import { app } from "../../redux/selectors";
import React, { useEffect } from "react";
import { Button, GhostButton } from "../common/Button/Buttons";
import { BsGithub } from 'react-icons/bs'
import styled from "styled-components";

const HelperText = styled.div`
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    margin: 12px 0 12px 0;
    color: var(--dark-25);
`

export const MyForm = ({ isValid, setErrors }) => {
    const login = useSelector(app).login
    useEffect(() => {
        if (login.error) {
            setErrors({ login: login.message, password: login.message })
        }
    }, [login, setErrors])



    const github = () => {
        window.open("http://localhost:5000/github", "_self");
    };

    return (
        <Form className="sign__form">
            <Field
                name="login"
                className="sign__field"
                placeholder="login"
            />
            <Field
                className="sign__field"
                name="password"
                type="password"
                placeholder="password"
            />
            <Button
                primary
                disabled={!isValid}
                className="primary-btn sign__button"
                type="submit"
            >
                Login
            </Button>
            <HelperText>
                or with
            </HelperText>
            <GhostButton
                primary
                onClick={github}
                Icon={BsGithub}
                className="sign__field"
            >
                Login with GitHub
            </GhostButton>
            <NavLink to="/sign" className="sign-link sign-link__title">
                Forgot password?
            </NavLink>
            <span className="sign__footer">
                Don't have an account yet?
                <NavLink to="/sign-up" className="sign-link sign-link__subtitle">
                    Sign Up
                </NavLink>
            </span>
        </Form>
    )
}


const SignIn = ({ Login, init }) => {
    const location = useLocation()
    if (init) {
        return <Navigate to={location.state} replace={true} />
    }

    return (
        <section>
            <Navigation title={"login"} className='signin-nav' />
            <Formik
                initialValues={{
                    login: '',
                    password: '',
                }}
                validationSchema={loginValidate}
                onSubmit={formData => Login(formData)}
            >
                {(props) => <MyForm {...props} />}
            </Formik>
        </section>
    )
}

export default SignIn;