import React from "react";
import OrderPreview from "./OrderPreview";
import s from "../Courier/OrdersPage.module.css"
import fragile from "../../../assets/images/fragile.png"
import urgent from "../../../assets/images/urgent.png"
import delivery from "../../../assets/images/delivery.png"
import confirmed from "../../../assets/images/confirmed.png"
import booked from "../../../assets/images/booked.png"
import fragile_urgent from "../../../assets/images/fragile_urgent.png"
import {connect} from "react-redux";
import empty from "../../../assets/images/empty.png";
import noname from "../../../assets/images/noname.png";
import {ROLE_CLIENT, ROLE_COURIER} from "../../../redux/auth-reducer";


const OrdersPage = (props) => {
    let state = props.ordersPage;
    let currentOrdersSet = () => {
        if ((props.path === '/order/all')) {
            if (props.roles[0] === ROLE_CLIENT[0]) return state.orders;
            return state.availableOrders;
        } else if (props.path === '/order/active') {
            return state.activeOrders;
        } else if (props.path === '/order/done') {
            return state.historyOrders
        }
    };

    let image = (Status) => {
            if (props.roles[0] === ROLE_COURIER[0]) {
                switch (Status) {
                    case 'Хрупко':
                        return fragile;
                    case 'Срочно':
                        return urgent;
                    case 'Срочно и хрупко':
                        return fragile_urgent;
                    case 'Обычная доставка':
                        return delivery;
                }
            } else if (props.roles[0] === ROLE_CLIENT[0]) {
                switch (Status) {
                    case 'Доставляется':
                        return delivery;
                    case 'Курьер скоро будет':
                        return empty;
                    case 'Заказ в обработке':
                        return noname;
                }
            }};

            let orderPreviews = (
                currentOrdersSet().map(o => {
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
                        image: image(o.Status),
                        Role: props.role,
                        Courier: o.Courier
                    };
                    if (props.path === '/order/all') {
                        return <OrderPreview commonProps={commonProps} {...props}/>
                    } else if (props.path === '/order/active') {
                        return <OrderPreview
                            commonProps={commonProps}
                            {...props}
                            CurrStatus={o.CurrStatus}
                            CurrStatusImg={(o.CurrStatus === 'Подтвержден') && confirmed || (o.CurrStatus === 'Ожидает подверждения') && booked}/>
                    } else if (props.path === '/order/done') {
                        return <OrderPreview
                            commonProps={commonProps}
                            {...props}
                        />
                    }
                }));

            return <div>
                <div className={s.orders}>{orderPreviews} </div>
            </div>
        }
    ;

    let mapStateToProps = (state) => ({
        ordersPage: state.orders
    });
    export default connect(mapStateToProps, null)(OrdersPage);