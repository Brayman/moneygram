import * as Yup from "yup";

const email = Yup.string()
    .email('Invalid email address')
    .required('This required field');
const login = Yup.string()
    .min(6, "Must be more 6 characters")
    .required('This required field');
const password = Yup.string()
    .min(6, "Must be more 6 characters")
    .required('This required field');

export const signupValidate = Yup.object({
    login,
    email,
    password,
})
export const loginValidate = Yup.object({
    email,
    password,
})

