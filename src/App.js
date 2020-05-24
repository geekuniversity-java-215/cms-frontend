import React from 'react';

import './App.css';
import {Route} from "react-router-dom";
import Registration from "./components/Registration/Registration";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import Order from "./components/Order/Client/Order";
import Price from "./components/Order/Client/Price";
import OrdersPageContainer from "./components/Order/Common/OrdersPageContainer";
import MainPage from "./components/MainPage/MainPage";
import FooterContainer from "./components/Footer/FooterContainer";
import background from "./assets/images/background.jpg";

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        const styleForImage = {
            background: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        };
        return (
            <div className={'app-wrapper'} style={styleForImage} >
                <HeaderContainer/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Route path='/main'
                           render={() =>
                             <MainPage/>}/>
                    <Route path='/registration'
                           render={() => <Registration/>}/>
                    <Route path='/login'
                           render={() => <Login/>}/>
                    <Route path='/order/new'
                           render={() => <Order/>}/>
                    <Route path='/order/all'
                           render={() => <OrdersPageContainer path='/order/all'/>}/>
                    <Route path='/order/active'
                           render={() => <OrdersPageContainer path='/order/active'/>}/>
                    <Route path='/order/done'
                           render={() =><OrdersPageContainer path='/order/done'/>}/>
                    <Route path='/confirm'
                           render={() => <Price/>}/>
                </div>
                <FooterContainer/>
            </div>)

    };
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
});

export default compose(
    connect(mapStateToProps, {initializeApp}))(App);
