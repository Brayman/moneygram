import { Navigate, NavLink } from "react-router-dom";
import { Formik, Form } from "formik";
import { Navigation } from "../common/Navigation/Navigation";
import "./Sign.css";
import { Field } from "../common/Field/Field";
import { loginValidate } from "../../utils/validators/validators";
import { useSelector } from "react-redux";
import { app } from "../../redux/selectors";
import React, { useEffect } from "react";
import { Button } from "../common/Button/Buttons";
import { accountThunks } from "../../redux/actions/account-actions";

export const MyForm = ({ isValid, setErrors }) => {
    const login = useSelector(app).login
    useEffect(() => {
        if (login.error) {
            setErrors({ login: login.message, password: login.message })
        }
    }, [login, setErrors])
    return (
        <Form className="sign__form">
            <Field
                name="email"
                className="sign__field"
                placeholder="email"
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
            <NavLink to="/sign" className="sign-link sign-link__title">
                Forgot password?
            </NavLink>
            <span className="sign__footer">
                Don't have an account yet?
                <NavLink to="/sign-up" className="sign-link sign-link__subtitle">
                    Sign Up
                </NavLink>
            </span>
            <button type='button' onClick={() => accountThunks.tokenAuth()}>auth</button>
        </Form>
    )
}


const SignIn = ({ Login, init }) => {
    if (init) {
        return <Navigate to={-1} replace={true} />
    }

    return (
        <section>
            <Navigation title={"login"} className='signin-nav' />
            <Formik
                initialValues={{
                    email: '',
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