export const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'This field not to be empty'
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
