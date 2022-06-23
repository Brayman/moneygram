import { withNaming } from '@bem-react/classname';
// const fcn = (b, e, m) => cn(b, e)(m);

function CreateClasssName(name) {
    const createName = name ? {n: `${name}-`} : '';
    const cn = withNaming({...createName , e: '__', m: '_', v: '_' })
    return (b, e = undefined, m) => cn(b, e)(m);
}

export default CreateClasssName;