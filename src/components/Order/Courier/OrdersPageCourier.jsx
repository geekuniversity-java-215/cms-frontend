import React from "react";
import OrderPreview from "./OrderPreview";
import s from "./OrdersPage.module.css"
import fragile from "../../../assets/images/fragile.png"
import urgent from "../../../assets/images/urgent.png"
import delivery from "../../../assets/images/delivery.png"
import confirmed from "../../../assets/images/confirmed.png"
import booked from "../../../assets/images/booked.png"
import fragile_urgent from "../../../assets/images/fragile_urgent.png"
import {connect} from "react-redux";


const OrdersPageCourier = (props) => {
    let state = props.ordersPage;
    let orderPreviews = ((
        (props.path === '/order/all') && state.availableOrders)
        || ((props.path === '/order/active') && state.activeOrders)
        || ((props.path === '/order/done') && state.historyOrders)).map(o => {
        let commonProps = {
            Length: o.Length,
            Width: o.Width,
            Height: o.Height,
            Phone: o.Phone,
            Comments: o.Comments,
            CityA: o.CityA,
            StreetA: o.StreetA,
            BuildingA: o.BuildingA,
            CityB: o.CityB,
            StreetB: o.StreetB,
            BuildingB: o.BuildingB,
            Status: o.Status,
            Cost: o.Cost,
            Distance: o.Distance,
            key: o.id,
            image:
                (o.Status === 'Хрупко') && fragile ||
                (o.Status === 'Срочно') && urgent ||
                (o.Status === 'Срочно и хрупко') && fragile_urgent ||
                (o.Status === 'Обычная доставка') && delivery,
            Role: props.role
        };
        if (props.path === '/order/all') {
            return <OrderPreview commonProps={commonProps}/>
        } else if (props.path === '/order/active') {
            return <OrderPreview
                commonProps={commonProps}
                CurrStatus={o.CurrStatus}
                CurrStatusImg={(o.CurrStatus === 'Подтвержден') && confirmed || (o.CurrStatus === 'Ожидает подверждения') && booked}/>
        } else if (props.path === '/order/done') {
            return <OrderPreview
                commonProps={commonProps}
            />
        }
    });

    return <div>
        <div className={s.orders}>{orderPreviews} </div>
    </div>
};

let mapStateToProps = (state) => ({
    ordersPage: state.orders
});
export default connect(mapStateToProps, null)(OrdersPageCourier);