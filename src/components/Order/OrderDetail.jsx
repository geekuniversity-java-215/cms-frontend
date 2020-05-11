import React from "react";
import {Button, Modal, Table} from "react-bootstrap";
import s from "./OrdersPage.module.css";


const OrderDetail = (props) => {
    return <div>
        <Modal show={props.show} onHide={props.onHide} centered>
            <Modal.Header closeButton className={s.modal}>
                <Modal.Title>Полные сведения о заказе</Modal.Title>
            </Modal.Header>
            <Modal.Body className={s.modal}>
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
            <Modal.Footer className={s.modal}>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
};

export default OrderDetail;
