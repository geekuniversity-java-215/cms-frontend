import React from 'react';
import {connect} from "react-redux";
import Footer from "./Footer";

class FooterContainer extends React.Component {

    render() {
        return <Footer {...this.props} />
    }
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    role: state.auth.role,
    username: state.auth.username
});

export default connect(mapStateToProps, {})(FooterContainer);