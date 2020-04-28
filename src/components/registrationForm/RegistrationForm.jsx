import React from "react";
import s from './RegistrationForm.module.css'
import {Field, reduxForm, formValueSelector } from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Input} from "../common/FormsControl/FormsControl";
import {connect} from "react-redux";
import {registration} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";


const maxLength = maxLengthCreator(10);
const RegistrationForm = (props) => {
    return (
        <div className={s.form}>
            <h1>Registration</h1>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={"FirstName"} name={"FirstName"} component={Input}
                           validate={[required, maxLength]}/>
                </div>
                <div>
                    <Field placeholder={"LastName"} name={"LastName"} component={Input} validate={[required]}/>
                </div>
                <div>
                    <Field placeholder={"Email"} name={"Email"} component={Input} validate={[required]}/>
                </div>
                <div>
                    <Field placeholder={"Phone"} name={"Phone"} component={Input} validate={[required]}/>
                </div>
                <div>
                    <Field name="Role" component="select" validate={[required]}>
                        <option/>
                        <option value="Client">Клиент</option>
                        <option value="Courier">Курьер</option>
                    </Field>
                </div>
                <button>submit</button>
            </form>
        </div>)

}

const RegistrationReduxForm = reduxForm({
    form: 'reg'
})(RegistrationForm);

const Registration = (props) => {
    const onSubmit = (formData) => {
        props.registration(formData.FirstName, formData.LastName, formData.Email, formData.Phone, formData.Role)
    };

    if (props.isAuth) {
        return <Redirect to={"/main"} />
    }

    return <div>
        <RegistrationReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {registration})(Registration);