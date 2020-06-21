import React, {useState} from "react";
import {Card} from "react-bootstrap";
import arrow from "../../../assets/images/arrow.png"

import s from "../Courier/OrdersPage.module.css"
import OrderDetail from "./OrderDetail";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {ROLE_CLIENT, ROLE_COURIER} from "../../../redux/auth-reducer";

const OrderPreview = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const showModal = () => setShow(true);

    if (!props.isAuth) {
        return <Redirect to={"/login"}/>
    }
    return <div>
        <div>
            <Card className={s.order_preview} onClick={showModal}>
                <Card.Img variant="top" src={props.commonProps.image} className={s.image}/>
                <Card.Body>
                    <Card.Title className={s.title}>{props.commonProps.Status}</Card.Title>
                </Card.Body>
                <div className={s.addresses}>
                    <div className={s.address}>
                        <div>г. {props.commonProps.CityA}</div>
                        <div>ул. {props.commonProps.StreetA}</div>
                        <div>д. {props.commonProps.BuildingA}</div>
                    </div>

                    <img src={arrow} className={s.arrow}/>
                    <div className={s.address}>
                        <div>г. {props.commonProps.CityB}</div>
                        <div>ул. {props.commonProps.StreetB}</div>
                        <div>д. {props.commonProps.BuildingB}</div>
                    </div>
                </div>
                <div className={s.footer}>
                    <div>
                    {(props.roles[0]===ROLE_COURIER[0])&&<div>Расстояние: {props.commonProps.Distance} км</div>
                    || (props.roles[0]===ROLE_CLIENT[0])&&<div>Исполнитель: {props.commonProps.Courier}</div>}
                    <div>Стоимость: {props.commonProps.Cost}</div>
                    </div>
                    <div>
                       <img src={props.commonProps.CurrStatusImg} className={ props.commonProps.CurrStatusImg&&s.currStatusImg}/>
                    </div>
                </div>
            </Card>
        </div>
        <OrderDetail show={show} onHide={handleClose}  {...props}/>
    </div>
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, null)(OrderPreview);
