import {Field, reduxForm} from "redux-form";
import React from "react";
import {required} from "../../utils/validators/validators";
import {Input} from "../common/FormsControl/FormsControl";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Link, Redirect} from "react-router-dom";
import Button from "react-bootstrap/Button";

const LoginForm = (props) => {
    return (
        <div>


        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder ={"Login"} name = {"login"} validate = {[required]} component = {Input}/>
            </div>
            <div>
                <Field placeholder ={"Password"} name = {"password"} validate = {[required]} type={"password"} component = {Input}/>
            </div>
            <div>
                <Button variant="success" type={"submit"}>Войти</Button>
                <Link className="btn btn-primary" to={"/registration"}>Зарегистрироваться</Link>
            </div>
        </form>
        </div>
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
        return <Redirect to={"/main"} />
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);