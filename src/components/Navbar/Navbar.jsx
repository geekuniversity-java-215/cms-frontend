import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

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
                <NavLink to="/order/all" activeClassName={s.activeLink}>Доступные заказы</NavLink>
                <NavLink to="/order/active" activeClassName={s.activeLink}>Заказы в работе</NavLink>
                <NavLink to="/order/done" activeClassName={s.activeLink}>Выполненные заказы</NavLink>
            </nav>
        }
    }
};

const mapStateToProps = (state) => ({
    role: state.auth.role,
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, null)(Navbar);