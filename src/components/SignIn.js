import { Navigate } from "react-router-dom";
import { useFormik } from "formik";
import { Form, Button, Container, Message } from "semantic-ui-react"

const validate = values => {
    const errors = {};
    if (!values.login) {
        errors.login = 'This field not to be empty'
    }
    if (!values.pass) {
        errors.pass = 'This field not to be empty'
    }
    return errors
}
const SignIn = ({ Login, init, state }) => {
    const loginForm = useFormik({
        initialValues: {
            login: '',
            pass: ''
        },
        validate,
        onSubmit: formData => Login(formData),
    })
    if (init) {
        return <Navigate to={-1} replace={true} />
    }
    debugger
    return (
        <Container fluid>
            <Form
                onSubmit={loginForm.handleSubmit}
                loading={state.loading}
            >
                <Form.Input
                    label="Login"
                    name="login"
                    placeholder='Login'
                    value={loginForm.values.login}
                    error={loginForm.errors.login}
                    onChange={loginForm.handleChange}
                />

                <Form.Input
                    label="Password"
                    name="pass"
                    value={loginForm.pass}
                    type='password'
                    placeholder='password'
                    error={loginForm.errors.pass}
                    onChange={loginForm.handleChange}
                />

                {!state.error ?
                    null :
                    <Message
                        error
                        header={state.error}
                    />}

                <Button
                    disabled={!loginForm.isValid}
                    type='submit'
                >
                    Login
                </Button>
            </Form>
        </Container>
    )
}

export default SignIn;