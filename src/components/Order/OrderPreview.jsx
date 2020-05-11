import React, {useState} from "react";
import {Button, Card, Modal, Table} from "react-bootstrap";
import arrow from "../../assets/images/arrow.png"

import s from "./OrdersPage.module.css"


const OrderPreview = (props) => {
    debugger
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return <div>
        <div>
            <Card className={s.order_preview} onClick={handleShow}>
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

        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className = {s.modal}>
                <Modal.Title>Полные сведения о заказе</Modal.Title>
            </Modal.Header>
            <Modal.Body className = {s.modal}>
                <Table striped bordered hover variant="dark">
                    <tbody>
                    <tr>
                        <td width="200">Габариты ДхШхВ, см</td>
                        <td>{props.Length} x {props.Width} x {props.Height}</td>
                    </tr>
                    <td colSpan={2} className={s.header}>Точка отправления</td>
                    <tr>
                        <td>Город</td>
                        <td>{props.CityA}</td>
                    </tr>
                    <tr>
                        <td>Улица</td>
                        <td>{props.StreetA}</td>
                    </tr>
                    <tr>
                        <td>Дом</td>
                        <td>{props.BuildingA}</td>
                    </tr>
                    <td colSpan={2} className={s.header}>Точка доставки</td>
                    <tr>
                        <td>Город</td>
                        <td>{props.CityB}</td>
                    </tr>
                    <tr>
                        <td>Улица</td>
                        <td>{props.StreetB}</td>
                    </tr>
                    <tr>
                        <td>Дом</td>
                        <td>{props.BuildingB}</td>
                    </tr>
                    <tr>
                        <td>Курьер</td>
                        <td>{props.Courier}</td>
                    </tr>
                    <tr>
                        <td>Статус</td>
                        <td>{props.Status}</td>
                    </tr>
                    <tr>
                        <td>Стоимость, руб</td>
                        <td>{props.Cost}</td>
                    </tr>
                    <tr>
                        <td>Телефон</td>
                        <td>{props.Phone}</td>
                    </tr>
                    <tr>
                        <td>Дополнительные комментарии</td>
                        <td>{props.Comments}</td>
                    </tr>
                    </tbody>
                </Table>

            </Modal.Body>
            <Modal.Footer className = {s.modal}>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
};

export default OrderPreview;