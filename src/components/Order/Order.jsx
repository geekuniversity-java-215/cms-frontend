import React, {useState} from "react";
import s from './OrderForm.module.css'
import {Field, reduxForm, formValueSelector} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Input, Textarea} from "../common/FormsControl/FormsControl";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {order} from "../../redux/order-reducer";


const maxLength = maxLengthCreator(10);
const OrderForm = (props) => {
    debugger
    return (
        <div>
            <div className={s.form}>
                <form onSubmit={props.handleSubmit}>
                    <div>
                        <Field placeholder={"Примерная масса, кг"} name={"Mass"} component={Input}
                               validate={[required, maxLength]}/>
                    </div>
                    <div>
                        <Field placeholder={"Длина, см"} name={"Length"} component={Input}/>
                        <Field placeholder={"Ширина, см"} name={"Width"} component={Input}/>
                        <Field placeholder={"Высота, см"} name={"Height"} component={Input}/>
                    </div>
                    <div className={s.addresses}>
                        <div>
                            <Field placeholder={"Московская область"} name={"RegionA"} component={Input}/>
                            <Field placeholder={"Город"} name={"CityA"} component={Input}/>
                            <Field placeholder={"Улица"} name={"StreetA"} component={Input}/>
                            <Field placeholder={"Дом"} name={"BuildingA"} component={Input}/>
                            <Field placeholder={"Корпус"} name={"BlockA"} component={Input}/>
                            <Field placeholder={"Квартира"} name={"FlatA"} component={Input}/>
                            <Field placeholder={"Этаж"} name={"FloorA"} component={Input}/>
                            <Field placeholder={"Домофон"} name={"IntercomA"} component={Input}/>
                        </div>
                        <div>
                            <Field placeholder={"Московская область"} name={"RegionB"} component={Input}/>
                            <Field placeholder={"Город"} name={"CityB"} component={Input}/>
                            <Field placeholder={"Улица"} name={"StreetB"} component={Input}/>
                            <Field placeholder={"Дом"} name={"BuildingB"} component={Input}/>
                            <Field placeholder={"Корпус"} name={"BlockB"} component={Input}/>
                            <Field placeholder={"Квартира"} name={"FlatB"} component={Input}/>
                            <Field placeholder={"Этаж"} name={"FloorB"} component={Input}/>
                            <Field placeholder={"Домофон"} name={"IntercomB"} component={Input}/>
                        </div>
                    </div>
                    <div>
                        <Field placeholder={"Контактный телефон"} name={"Phone"} component={Input}
                        />
                    </div>
                    <div className={s.comments}>
                        <Field placeholder={"Дополнительные комментарии"} name={"Comments"} component={Textarea}/>
                    </div>

                    <Button variant="success" type={"submit"}>Запросить предварительную стоимость</Button>

                </form>
            </div>

        </div>)

}


const OrderReduxForm = reduxForm({
    form: 'order'
})(OrderForm);

const Order = (props) => {
    let [toConfirm, setToConfirm] = useState(false);

    if (!props.isAuth) {
        return <Redirect to={"/login"}/>
    }
    const onSubmit = (formData) => {
        let params = {
            Mass: formData.Mass,
            Length: formData.Length,
            Width: formData.Width,
            Height: formData.Height,
            RegionA: formData.RegionA,
            CityA: formData.CityA,
            StreetA: formData.StreetA, BuildingA: formData.BuildingA,
            BlockA: formData.BlockA, FlatA: formData.FlatA, FloorA: formData.FloorA, IntercomA: formData.IntercomA,
            RegionB: formData.RegionB, CityB: formData.CityB, StreetB: formData.StreetB, BuildingB: formData.BuildingB,
            BlockB: formData.BlockB, FlatB: formData.FlatB, FloorB: formData.FloorB, IntercomB: formData.IntercomB,
            Phone: formData.Phone, Comments: formData.Comments
        };
        props.order(
            params).then(setToConfirm(true));

    };

    if (toConfirm) return <Redirect to={"/confirm"}/>;

    return <div>
        <OrderReduxForm onSubmit={onSubmit} params = {props.params}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    allCosts: state.order,
    baseCost: state.order.baseCost,
    params: state.order.params
});

export default connect(mapStateToProps, {order})(Order);