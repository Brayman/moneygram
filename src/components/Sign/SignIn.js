import { Navigate, NavLink } from "react-router-dom";
import { Formik, Form, useFormik } from "formik";
import { Navigation } from "../common/Navigation/Navigation";
import "./SignIn.css";
import { Field } from "../common/Field/Field";
import { validate } from "../../utils/validators/validators";


const SignIn = ({ Login, init, state }) => {
    const loginForm = useFormik({
        initialValues: {
            login: '',
            pass: ''
        },
        validate,
        onSubmit: formData => Login(formData),
    })
    return (
        <section>
            <Navigation title={"login"} className='signin-nav' />
            <Formik initialValues={{
                email: '',
                password: '',
            }}
                validate={validate}
                onSubmit={(values) => {
                    console.log(values);
                }}>
                <Form className="signin">
                    <Field
                        name="email"
                        className="signin__field"
                        placeholder="email"
                    />
                    <Field
                        className="signin__field"
                        name="password"
                        type="password"
                        placeholder="password"
                    />
                    <button
                        className="primary-btn signin__button"
                    >
                        Login
                    </button>
                    <NavLink to="/signin" className="signin-link signin-link__title">
                        Forgot password?
                    </NavLink>
                    <span className="signin__footer">
                        Don't have an account yet? 
                        <NavLink to="/signup" className="signin-link signin-link__subtitle">
                            Sign Up
                        </NavLink>
                    </span>


                </Form>
            </Formik>
        </section>
    )



    if (init) {
        return <Navigate to={-1} replace={true} />
    }
}

export default SignIn;