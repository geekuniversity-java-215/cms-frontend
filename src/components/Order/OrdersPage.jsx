import React, {useState} from "react";
import OrderPreview from "./OrderPreview";
import s from "./OrdersPage.module.css"
import delivery from "../../assets/images/delivery.png"
import empty from "../../assets/images/empty.png"
import noname from "../../assets/images/noname.png"
import {Button, Modal, Table} from "react-bootstrap";

const OrdersPage = (props) => {
    let state = props.ordersPage;

    let orderPreviews = state.orders.map(o =>
        <OrderPreview
            Length={o.Length}
            Width={o.Width}
            Height={o.Height}
            Phone={o.Phone}
            Comments={o.Comments}
            CityA={o.CityA}
            StreetA={o.StreetA}
            BuildingA={o.BuildingA}
            CityB={o.CityB}
            StreetB={o.StreetB}
            BuildingB={o.BuildingB}
            Courier={o.Courier}
            Status={o.Status}
            Cost={o.Cost}
            key={o.id}
            image={((o.Status === 'Доставляется') && delivery) || (o.Status === 'Курьер скоро будет') && empty || (o.Status === 'Заказ в обработке') && noname}
        />);
    return <div>
        <div className={s.orders}>{orderPreviews} </div>
    </div>
};


export default OrdersPage;
