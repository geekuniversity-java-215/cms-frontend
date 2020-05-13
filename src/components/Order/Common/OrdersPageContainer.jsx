import {connect} from "react-redux";
import {compose} from "redux";
import React from "react";
import OrdersPageCourier from "./OrdersPage";


let mapStateToProps = (state) => ({
    role: state.auth.role
});

let mapDispatchToProps = (dispatch) => {

};

const OrdersPageContainer = (props) => {
    if (props.role ==='Client') {
        return <OrdersPageCourier {...props}/>
    } else if (props.role ==='Courier'){
        return  <OrdersPageCourier{...props}/>
    } else {
        return <div> opportunities</div>
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)(OrdersPageContainer)
)