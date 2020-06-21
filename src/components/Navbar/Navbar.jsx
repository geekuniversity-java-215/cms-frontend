import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {ROLE_CLIENT, ROLE_COURIER, ROLE_USER} from "../../redux/auth-reducer";

const Navbar = (props) => {
    if (!props.isAuth || props.roles==null || props.roles.length === 0 || props.roles[0]===ROLE_USER[0]) {
        return <nav className={s.emptyUser}>
        </nav>
    } else {
        if (props.roles[0] === ROLE_CLIENT[0]) {
            return <nav className={s.nav}>
                <div className={`${s.item} ${s.active}`}>
                    <NavLink to="/order/new" activeClassName={s.activeLink}>Разместить заказ</NavLink>
                </div>
                <div className={`${s.item} ${s.active}`}>
                    <NavLink to="/order/all" activeClassName={s.activeLink}>Текущие заказы</NavLink>
                </div>
            </nav>
        } else if (props.roles[0] === ROLE_COURIER[0]) {
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
    roles: state.auth.user.roles,
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, null)(Navbar);