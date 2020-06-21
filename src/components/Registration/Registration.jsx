import React, {useState} from "react";
import s from './RegistrationForm.module.css'
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Input} from "../common/FormsControl/FormsControl";
import {connect} from "react-redux";
import {registration} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {Button} from "react-bootstrap";


const maxLength = maxLengthCreator(10);
const RegistrationForm = (props) => {
    return (
        <div className={s.form}>
            <form className={s.registrationForm} onSubmit={props.handleSubmit}>
                <div>
                    <Field className={s.input} placeholder={"Username"} name={"Username"} component={Input} validate={[required, maxLength]}/>
                </div>
                <div>
                    <Field className={s.input} placeholder={"Password"} name={"Password"} type={"password"} component={Input} validate={[required, maxLength]}/>
                </div>
                <div>
                    <Field className={s.input} placeholder={"Иван"} name={"FirstName"} component={Input} validate={[required, maxLength]}/>
                </div>
                <div>
                    <Field className={s.input} placeholder={"Иванов"} name={"LastName"} component={Input} validate={[required]}/>
                </div>
                <div>
                    <Field className={s.input} placeholder={"ivan.ivanov@mail.ru"} name={"Email"} component={Input} validate={[required]}/>
                </div>
                <div>
                    <Field className={s.input} placeholder={"7999999999"} name={"Phone"} component={Input} validate={[required]}/>
                </div>
                <Button className={s.button} variant="success" type={"submit"}>Зарегистрироваться</Button>
            </form>
        </div>)

};

const RegistrationReduxForm = reduxForm({
    form: 'reg'
})(RegistrationForm);

const Registration = (props) => {
    let [toLogin, setToLogin] = useState(false);


    const onSubmit = (formData) => {
        props.registration(formData.Username, formData.Password, formData.FirstName, formData.LastName, formData.Email, formData.Phone)
            setToLogin(true);
    };

    if (props.isAuth) {
        return <Redirect to={"/"}/>
    }
    if (toLogin) return <Redirect to={"/login"}/>;

    return <div>
        <RegistrationReduxForm onSubmit={onSubmit}/>
    </div>
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {registration})(Registration);