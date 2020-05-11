import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";

const Navbar = (props) => {
    if (!props.isAuth) {
        return <nav className={s.nav}/>
    } else {
        if (props.role === 'Client') {
            return <nav className={s.nav}>
                <NavLink to="/order/new" activeClassName={s.activeLink}>Разместить заказ</NavLink>
                <div/>
                <NavLink to="/order/all" activeClassName={s.activeLink}>Текущие заказы</NavLink>
            </nav>

        } else if (props.role === 'Courier') {
            return <nav className={s.nav}>
            <NavLink to="/order" activeClassName={s.activeLink}>Посмотреть заказы</NavLink>
            </nav>
        }
    }
};

const mapStateToProps = (state) => ({
    role: state.auth.role,
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, null)(Navbar);