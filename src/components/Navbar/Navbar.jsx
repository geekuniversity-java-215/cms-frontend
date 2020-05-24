import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

const Navbar = (props) => {
    if (!props.isAuth) {
        return <nav className={s.emptyUser}>
        </nav>
    } else {
        if (props.role === 'Client') {
            return <nav className={s.nav}>
                <div className={`${s.item} ${s.active}`}>
                    <NavLink to="/order/new" activeClassName={s.activeLink}>Разместить заказ</NavLink>
                </div>
                <div className={`${s.item} ${s.active}`}>
                    <NavLink to="/order/all" activeClassName={s.activeLink}>Текущие заказы</NavLink>
                </div>
            </nav>

        } else if (props.role === 'Courier') {
            return <nav className={s.nav}>
                <div className={`${s.item} ${s.active}`}>
                    <NavLink to="/order/all" activeClassName={s.activeLink}>Доступные заказы</NavLink>
                </div>
                <div className={`${s.item} ${s.active}`}>
                    <NavLink to="/order/active" activeClassName={s.activeLink}>Заказы в работе</NavLink>
                </div>
                <div className={`${s.item} ${s.active}`}>
                    <NavLink to="/order/done" activeClassName={s.activeLink}>Выполненные заказы</NavLink>
                </div>
            </nav>
        }
    }
};

const mapStateToProps = (state) => ({
    role: state.auth.role,
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, null)(Navbar);