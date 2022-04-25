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