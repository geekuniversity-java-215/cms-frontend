import React from 'react';
import {connect} from "react-redux";
import PersonalAccount from "./PersonalAccount";
import {setTransfer} from "../../redux/acc-reducer";
import {setUserRole} from "../../redux/auth-reducer";

class PersonalAccountContainer extends React.Component {

    render() {
        return <PersonalAccount {...this.props} />
    }
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    user: state.auth.user
});

export default connect(mapStateToProps, {setTransfer, setUserRole})(PersonalAccountContainer);