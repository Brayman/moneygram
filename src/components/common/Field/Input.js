import "./style.css";
import CreateClasssName from "../../../utils/bemClassCreate";
import classNames from "classnames";
export const Input = ({meta, field, ...props}) => {
    const cn = CreateClasssName();
    return (
        <div className={classNames(cn('field', '', { error: !!meta.error }), props.className)}>
            <input
                placeholder={props.placeholder || props.name}
                {...props}
                {...field}
                className={cn('field','input')}
            />
            {!!meta.touched && !!meta.error && <span className={cn('field','error')}>{meta.error}</span>}
        </div>
    )
}