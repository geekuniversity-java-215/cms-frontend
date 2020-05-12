import React, {useState} from "react";
import {Card} from "react-bootstrap";
import arrow from "../../../assets/images/arrow.png"

import s from "./OrdersPage.module.css"
import OrderDetail from "../Common/OrderDetail";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

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
                <Card.Img variant="top" src={props.image} className={s.image}/>
                <Card.Body>
                    <Card.Title className={s.title}>{props.Status}</Card.Title>
                </Card.Body>
                <div className={s.addresses}>
                    <div className={s.address}>
                        <div>г. {props.CityA}</div>
                        <div>ул. {props.StreetA}</div>
                        <div>д. {props.BuildingA}</div>
                    </div>

                    <img src={arrow} className={s.arrow}/>
                    <div className={s.address}>
                        <div>г. {props.CityB}</div>
                        <div>ул. {props.StreetB}</div>
                        <div>д. {props.BuildingB}</div>
                    </div>
                </div>
                <div>Исполнитель: {props.Courier}</div>
                <div>Стоимость: {props.Cost}</div>

            </Card>
        </div>
        <OrderDetail show={show} onHide={handleClose}  {...props}/>
    </div>
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, null)(OrderPreview);
