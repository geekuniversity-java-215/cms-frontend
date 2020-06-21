import React from "react";
import {Button, Modal, Table} from "react-bootstrap";
import s from "./PersonalAccount.module.css";

const TransactionsHistory = (props) => {
    return <div>
        <div>
            <Modal  show={props.show} onHide={props.onHide} centered>
                <Modal.Header closeButton className={s.modal}>
                    <Modal.Title>Список транзакций</Modal.Title>
                </Modal.Header>
                <Modal.Body className={s.modal}>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>Номер транзакции</th>
                            <th>Дата создания транзакции</th>
                            <th>Дата совершения транзакции</th>
                            <th>Количество средств</th>
                            <th>Тип</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.transactions.map(o => {
                            return <tr>
                                    <td>{o.id}</td>
                                    <td>{o.createdDate}</td>
                                    <td>{o.executionDate}</td>
                                    <td>{o.amount}</td>
                                    <td>{o.type}</td>
                                </tr>
                        })}
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
    </div>
};

export default TransactionsHistory;