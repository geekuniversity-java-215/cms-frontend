import React from "react";
import s from './FormsControl.module.css';

const FormControl = ({input, meta, child, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={s.formControl + " " + (hasError ? s.error : " ")}>
            <div>
                {props.children}
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>)
};

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}>
        <input {...input} {...restProps} value={input.value} onChange={input.onChange}/>
    </FormControl>
};

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
};
