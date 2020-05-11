import {connect} from "react-redux";
import OrdersPage from "./OrdersPage";
import {compose} from "redux";


let mapStateToProps = (state)=> {
    return {
        ordersPage: state.orders
    }
};

let mapDispatchToProps = (dispatch)=> {

}

export default compose(
    connect(mapStateToProps, mapDispatchToProps) (OrdersPage)
)