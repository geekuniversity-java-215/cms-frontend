import {connect} from "react-redux";
import {compose} from "redux";
import React from "react";
import OrdersPage from "./OrdersPage";
import {Redirect} from "react-router-dom";


let mapStateToProps = (state) => ({
    roles: state.auth.user.roles
});


const OrdersPageContainer = (props) => {
    if (props.roles != null) {
        return <OrdersPage {...props}/>
    } else {
        return <Redirect to={"/"}/>
    }
};

export default compose(
    connect(mapStateToProps, null)(OrdersPageContainer)
)