import React from "react";
import {Button, Modal, Table} from "react-bootstrap";
import s from "../Client/OrdersPage.module.css";


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
                        <td>{props.commonProps.Length} x {props.commonProps.Width} x {props.commonProps.Height}</td>
                    </tr>
                    <td colSpan={2} className={s.header}>Точка отправления</td>
                    <tr>
                        <td>Город</td>
                        <td>{props.commonProps.CityA}</td>
                    </tr>
                    <tr>
                        <td>Улица</td>
                        <td>{props.commonProps.StreetA}</td>
                    </tr>
                    <tr>
                        <td>Дом</td>
                        <td>{props.commonProps.BuildingA}</td>
                    </tr>
                    <td colSpan={2} className={s.header}>Точка доставки</td>
                    <tr>
                        <td>Город</td>
                        <td>{props.commonProps.CityB}</td>
                    </tr>
                    <tr>
                        <td>Улица</td>
                        <td>{props.commonProps.StreetB}</td>
                    </tr>
                    <tr>
                        <td>Дом</td>
                        <td>{props.commonProps.BuildingB}</td>
                    </tr>
                    {(props.commonProps.Role !== 'Courier') && <tr>
                        <td>Курьер</td>
                        <td>{props.commonProps.Courier}</td>
                    </tr>}
                    <tr>
                        <td>Стоимость, руб</td>
                        <td>{props.commonProps.Cost}</td>
                    </tr>
                    <tr>
                        <td>Телефон</td>
                        <td>{props.commonProps.Phone}</td>
                    </tr>
                    <tr>
                        <td>Дополнительные комментарии</td>
                        <td>{props.commonProps.Comments}</td>
                    </tr>
                    </tbody>
                </Table>

            </Modal.Body>
            <Modal.Footer className={s.modal}>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                {(props.commonProps.Role === 'Courier') && <Button variant="primary" onClick={props.commonProps.onHide}>
                    Взять заказ
                </Button>}


            </Modal.Footer>
        </Modal>
    </div>
};

export default OrderDetail;
