import React, {useState} from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {confirmOrder} from "../../../redux/order-reducer";
import {Input} from "../../common/FormsControl/FormsControl";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";


const Price = (props) => {

    let [isFragile, setIfFragile] = useState(false);
    let [isUrgent, setIfUrgent] = useState(false);
    let [finalCost, setFinalCost] = useState(0);

    const changeFinalCost = () => {
        switch (isFragile + '|' + isUrgent) {
            case "true|false": {
                setFinalCost(props.allCosts.fragile);
                break;
            }
            case "false|true": {
                setFinalCost(props.allCosts.urgent);
                break;
            }
            case "true|true": {
                setFinalCost(props.allCosts.full);
                break;
            }
            default : {
                setFinalCost(props.allCosts.baseCost);
                break;
            }
        }
    };

    const fragile = () => {
        isFragile = !isFragile;
        setIfFragile(isFragile);
        changeFinalCost();

    };
    const urgent = () => {
        isUrgent = !isUrgent;
        setIfUrgent(isUrgent);
        changeFinalCost();
    };

    const handleClick = (e) => {
        if (e.target.id ==="confirm_button") {
            confirmOrder(isFragile, isUrgent, finalCost)
        }
    };

    if (props.allCosts.baseCost === null) {
        return <div>no props</div>
    } else {
        return <div>
            <div>
                Стоимость исполнения заказа составит {finalCost===0 ? props.allCosts.baseCost : finalCost} руб.
            </div>
            <div>
                <input type="checkbox" checked={isFragile} onChange={fragile}/>
                {isFragile && <span> + {props.allCosts.fragile - props.allCosts.baseCost} руб. за хрупкость</span>}
            </div>
            <div>
                <input type="checkbox" checked={isUrgent} onChange={urgent}/>
                {isUrgent && <span> + {props.allCosts.urgent - props.allCosts.baseCost} руб. за срочность</span>}
            </div>


            <div>
                <Link className="btn btn-primary" to={"/"} onClick={handleClick} id="confirm_button">Разместить заказ</Link>
            </div>
            <div>
            </div>
        </div>
    }

};



const mapStateToProps = (state) => ({
    allCosts: state.order
});

export default connect(mapStateToProps, {confirmOrder})(Price);
