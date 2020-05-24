import {Field, reduxForm} from "redux-form";
import React from "react";
import {required} from "../../utils/validators/validators";
import {Input} from "../common/FormsControl/FormsControl";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Link, Redirect} from "react-router-dom";
import Button from "react-bootstrap/Button";
import s from "./Login.module.css";

const LoginForm = (props) => {
    return (

            <form className={s.loginForm} onSubmit={props.handleSubmit}>
                <Field className={s.input} placeholder={"Логин"} name={"login"} validate={[required]}
                       component={Input}/>

                <Field className={s.input} placeholder={"Пароль"} name={"password"} validate={[required]}
                       type={"password"} component={Input}/>

                <div className={s.buttons}>
                    <Button className={s.button} variant="success" type={"submit"}>Войти</Button>
                    <Link className={"btn btn-primary" + " "+s.button} to={"/registration"}>Зарегистрироваться</Link>
                </div>
            </form>

    );
};

const LoginReduxForm = reduxForm({
    form: 'login'
})
(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.login, formData.password)
    };
    if (props.isAuth) {
        return <Redirect to={"/main"}/>
    }
    return <div className={s.loginWrapper}>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);