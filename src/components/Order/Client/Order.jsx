import React, {useState} from "react";
import s from './OrderForm.module.css'
import {Field, reduxForm, formValueSelector} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Input, Textarea} from "../../common/FormsControl/FormsControl";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {order} from "../../../redux/order-reducer";
import dims from "./../../../assets/images/dims.png"


const maxLength = maxLengthCreator(10);
const styleForImage = {
    background: `url(${dims})`,
    opacity:'90%',
    height: '200px',
    width: '310px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    alignItems: 'center'
};
const OrderForm = (props) => {
    return (
        <div>
            <div className={s.form}>
                <form onSubmit={props.handleSubmit} onReset={ ()=> {clearStorage();props.reset()}}>
                    <div className={s.topBlock}>
                        <div className={s.massDim}>
                            {/*dims*/}
                            <div style={styleForImage}>
                                <div className={s.dimswrap}>
                                    <div className={s.labelBig}>Габариты(см)</div>
                                    <div className={s.labelLittle}>в любой последовательности</div>
                                    <div className={s.dims}>
                                        <Field className={s.dim} placeholder={"Длина"} name={"Length"}
                                               component={Input}/>
                                        <Field className={s.dim} placeholder={"Ширина"} name={"Width"}
                                               component={Input}/>
                                        <Field className={s.dim} placeholder={"Высота"} name={"Height"}
                                               component={Input}/>
                                    </div>
                                </div>
                            </div>
                            {/*mass*/}
                            <div className={s.field && s.massBlock}>
                                <div>
                                    <Field className={s.weight} placeholder={"0"} name={"Mass"} component={Input}/>
                                </div>
                                <div className={s.labelMass}>Масса(кг)</div>

                            </div>
                        </div>

                        <div className={s.field}>
                            <div>
                                <Field className={s.comments} placeholder={"Комментарии"}
                                       name={"Comments"}
                                       component={Textarea}/>
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                    <div className={s.addresses}>
                        <div className={s.field}>
                            <label className={s.labelAddress}>Где забрать</label>
                            <div className={s.address}>
                                <Field className={s.inp} placeholder={"Московская область"} name={"RegionA"}
                                       component={Input}/>
                                <Field className={s.inp} placeholder={"Город"} name={"CityA"} component={Input}/>
                                <Field className={s.inp} placeholder={"Улица"} name={"StreetA"} component={Input}/>
                                <Field className={s.inp} placeholder={"Дом"} name={"BuildingA"} component={Input}/>
                                <Field className={s.inp} placeholder={"Корпус"} name={"BlockA"} component={Input}/>
                                <Field className={s.inp} placeholder={"Квартира"} name={"FlatA"} component={Input}/>
                                <Field className={s.inp} placeholder={"Этаж"} name={"FloorA"} component={Input}/>
                                <Field className={s.inp} placeholder={"Домофон"} name={"IntercomA"} component={Input}/>
                                <Field className={s.inp} placeholder={"Контактный телефон"} name={"PhoneA"}
                                       component={Input}/>
                            </div>
                        </div>
                        <div className={s.field}>
                            <label className={s.labelAddress}>Куда доставить</label>
                            <div className={s.address}>
                                <Field className={s.inp} placeholder={"Московская область"} name={"RegionB"}
                                       component={Input}/>
                                <Field className={s.inp} placeholder={"Город"} name={"CityB"} component={Input}/>
                                <Field className={s.inp} placeholder={"Улица"} name={"StreetB"} component={Input}/>
                                <Field className={s.inp} placeholder={"Дом"} name={"BuildingB"} component={Input}/>
                                <Field className={s.inp} placeholder={"Корпус"} name={"BlockB"} component={Input}/>
                                <Field className={s.inp} placeholder={"Квартира"} name={"FlatB"} component={Input}/>
                                <Field className={s.inp} placeholder={"Этаж"} name={"FloorB"} component={Input}/>
                                <Field className={s.inp} placeholder={"Домофон"} name={"IntercomB"} component={Input}/>
                                <Field className={s.inp} placeholder={"Контактный телефон"} name={"PhoneB"}
                                       component={Input}/>
                            </div>
                        </div>
                    </div>
                    <div className={s.buttons}>
                        <Button className={s.button} variant="success" type={"submit"}>Рассчитать стоимость</Button>
                        <Button className={s.button} variant="secondary" type={"reset"}>Очистить форму</Button>
                    </div>
                </form>
            </div>

        </div>
    )

}

const clearStorage = () => {
    localStorage.removeItem("params");
};

const OrderReduxForm = reduxForm({
    form: 'order', enableReinitialize: true
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
            PhoneA: formData.PhoneA, PhoneB: formData.PhoneB, Comments: formData.Comments
        };
        new Promise(resolve => {
            localStorage.setItem('params', JSON.stringify(params))
        })
            .then(props.order(params))
            .then(setToConfirm(true));

    };

    if (toConfirm) return <Redirect to={"/confirm"}/>;

    return <div>
        <OrderReduxForm onSubmit={onSubmit} initialValues={props.initialValues}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    allCosts: state.order,
    baseCost: state.order.baseCost,
    initialValues: state.order.params
});

export default connect(mapStateToProps, {order})(Order);