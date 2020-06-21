import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout, switchRolesInState} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    user: state.auth.user,
});

export default connect(mapStateToProps, {logout, switchRolesInState})(HeaderContainer);