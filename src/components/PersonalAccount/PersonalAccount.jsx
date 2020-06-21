import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {setTransfer} from "../../redux/acc-reducer";
import {ROLE_USER, setUserRole} from "../../redux/auth-reducer";
import ChooseRole from "./ChooseRole";
import AccountInfo from "./AccountInfo";

const PersonalAccount = (props) => {
    if (!props.isAuth) {
        return <Redirect to={"/"}/>
    }
    if (props.user.roles == null ||  props.user.roles.length === 0|| props.user.roles[0] === ROLE_USER) {
        return <ChooseRole {...props}/>
    } else {
        return <AccountInfo {...props} role = {props.user.roles} />
    }

};


const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    user: state.auth.user,
    account: state.account
});

export default connect(mapStateToProps, {setTransfer, setUserRole})(PersonalAccount);
