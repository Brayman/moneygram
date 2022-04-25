import style from './FormControls.module.css';
export function Input({input, meta, ...props}) {
    const hasError = meta.touched && meta.error
    return (
        <div className={style.section}>
            <input
                className={`${style.input} ${hasError ? style.error : ''}`}
                {...input}
                {...props}
            />
            {hasError && <div 
                className={`${style.input} ${hasError ? style.error : ''}`}
                >
                    {meta.error}
                </div>}
        </div>
    )
    
}
export function InputPass({input, meta, ...props}) {
    const hasError = meta.touched && meta.error
    return (
        <div className={style.section}>
            <input
                className={`${style.input} ${hasError ? style.error : ''}`}
                type="password"
                {...input}
                {...props}
            />
            {hasError && <div 
                className={`${style.input} ${hasError ? style.error : ''}`}
                >
                    {meta.error}
                </div>}
        </div>
    )
    
}