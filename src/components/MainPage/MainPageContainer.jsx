import React from 'react';
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import MainPage from "./MainPage";

class MainPageContainer extends React.Component {

    render() {
        return <MainPage {...this.props} />
    }
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {logout})(MainPageContainer);