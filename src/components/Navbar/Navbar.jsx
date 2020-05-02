import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = (props) => {
    debugger
    if (!props.isAuth) {
        return <nav className={s.nav}/>
    } else {
        if (props.role === 'Client') {
            return <nav className={s.nav}>
                <NavLink to="/order" activeClassName={s.activeLink}>Разместить заказ</NavLink>
            </nav>

        } else if (props.role === 'Courier') {
            return <nav className={s.nav}>
            <NavLink to="/order" activeClassName={s.activeLink}>Посмотреть заказы</NavLink>
            </nav>
        }
    }
};

export default Navbar;