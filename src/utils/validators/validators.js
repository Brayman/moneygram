import * as Yup from "yup";

const email =  Yup.string()
.email('Invalid email address')
.required('This required field');

export const validateYup = Yup.object({
    login: Yup.string()
        .min(6, "Must be more 6 characters")
        .required('This required field'),
    password: Yup.string()
    .min(6, "Must be more 6 characters")
    .required('This required field'),
})
console.log(validateYup);
export const validate = values => {

    const errors = {};
    if (!values.login) {
        errors.login = 'This field not to be empty'
    }
    if (!values.password) {
        errors.password = 'This field not to be empty'
    }
    return errors
}
export const required = value => {
    if (value) {
        console.log('ok');
        return undefined
    }
    return "Field is required"
}
export const more6leters = value => {
    console.log(value);
    if (value && value.length < 6) {
        console.log('not ok');
        return "small password"
    }
    return undefined
}
