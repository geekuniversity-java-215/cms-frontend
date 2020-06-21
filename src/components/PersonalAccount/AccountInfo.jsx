import s from "./PersonalAccount.module.css";
import {Button, Card} from "react-bootstrap";
import React, {useState} from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControl/FormsControl";
import TransactionsHistory from "./TransactionsHistory";
import {ROLES, ROLE_CLIENT, ROLE_COURIER} from "../../redux/auth-reducer";

const AccountInfo = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const showModal = () => setShow(true);

    let availableRoles =ROLES.filter(x => !props.role.includes(x[0]));

    const handleRoleClick = (event) => {
        props.setUserRole(event.target.id);
    };

    const onSubmit = (formData) => {
        if (formData.transfer !== '' && formData.transfer!=null && formData.loginPayPal!=null) {
            let transfer = formData.transfer.replace(",", ".");
            if(!isNaN(parseFloat(transfer))) {
                if (transfer> props.account.currentAccount) {
                    alert('Недостаточно средст для совершения операции')
                } else {
                    props.setTransfer(transfer, formData.loginPayPal);
                }
            } else {
                alert('Поле может содержать только числа')
            }
        } else {
            alert('Поле пустое, введите сумму')
        }
    };
    return <div className={s.accountInfo}>
        <div className={s.strings}>
            <div>Ваша текущая роль</div>
            {props.role[0]===ROLE_CLIENT[0] ? <div>{ROLE_CLIENT[1]}</div> :  <div>{ROLE_COURIER[1]}</div>}
        </div>
        {(availableRoles.length!==0)&&<div className={s.strings}>
            <div>Доступные роли</div>
            {availableRoles.map(o=>{return <Button id ={o[0]} onClick ={handleRoleClick}>{o[1]}</Button>})}
        </div>}
        <div className={s.strings}>
            <div className={s.string}>Состояние Вашего счёта на данный момент</div>
            <div className={s.money}>
                <div>{props.account.currentAccount}</div>
                <div>р.</div>
            </div>
        </div>
        <div className={s.strings}>
            <div className={s.string}>Ожидают поступления на Ваш счёт</div>
            <div className={s.money}>
                <div>{props.account.freezeAccount}</div>
                <div>р.</div>
            </div>
        </div>
        <TransferReduxForm onSubmit={onSubmit} role = {props.role}/>
        <Button variant="success" onClick={showModal}>Запросить историю операций</Button>
        <TransactionsHistory show={show} onHide={handleClose} transactions = {props.account.transactions}/>
    </div>
};

const TransferForm = (props) => {
    return (
        <div className={s.takeBlock}>
            {(props.role[0]===ROLE_CLIENT[0])&&<div>Укажите данные для зачисления средств</div> || (props.role[0]===ROLE_COURIER[0])&&<div>Укажите данные для вывода средств</div>}
            <form className={s.transfer} onSubmit={props.handleSubmit}>
                <Field className={s.input} placeholder={"Логин в PayPal"} name={"loginPayPal"} component={Input}/>
                <Field className={s.input} placeholder={"Введите сумму"} name={"transfer"} component={Input}/>
                {(props.role[0]===ROLE_CLIENT[0])&& <Button type={"submit"}>Отправить заявку на зачисление средств</Button> ||
                (props.role[0]===ROLE_COURIER[0])&& <Button type={"submit"}>Отправить заявку на вывод средств</Button>}

            </form>
        </div>)
};

const TransferReduxForm = reduxForm({
    form: 'transfer'
})(TransferForm);

export default AccountInfo;