import {connect} from "react-redux";
import OrdersPage from "../Client/OrdersPage";
import {compose} from "redux";
import React from "react";
import OrdersPageCourier from "../Courier/OrdersPageCourier";


let mapStateToProps = (state) => ({
    role: state.auth.role
});

let mapDispatchToProps = (dispatch) => {

};

const OrdersPageContainer = (props) => {
    if (props.role ==='Client') {
        return <OrdersPage {...props}/>
    } else if (props.role ==='Courier'){
        return  <OrdersPageCourier{...props}/>
    } else {
        return <div> opportunities</div>
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)(OrdersPageContainer)
)