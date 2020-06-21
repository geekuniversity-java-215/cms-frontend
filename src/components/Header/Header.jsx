import React from 'react';
import s from './Header.module.css';
import {Link, NavLink} from "react-router-dom";
import {Button, DropdownButton, Dropdown} from "react-bootstrap";
import logo from "./../../assets/images/logo.png"
import Switcher from "./Switcher";
import {ROLE_CLIENT, ROLE_COURIER} from "../../redux/auth-reducer";

const Header = (props) => {

    let role;
    let username;
    if (props.user!=null){
        role = props.user.roles;
        username = props.user.username;
    }
    return <header
        className={s.header + ' ' + ((role === ROLE_COURIER[0]) && s.courier) + ' ' + ((role === ROLE_CLIENT[0]) && s.customer)}>
        <NavLink to={'/main'}><img src={logo}/></NavLink>

        <div className={s.loginBlock}>
            <Switcher role={role} setUserRole={props.setUserRole} switchRolesInState={props.switchRolesInState}/>
            {(props.isAuth)
                ?  <div>
                <DropdownButton id="dropdown-basic-button" title={username}>
                    <NavLink to={'/account'}><Dropdown.Item tag={NavLink} href="/order/new">Личный
                        кабинет</Dropdown.Item></NavLink>
                    <Dropdown.Item onClick={props.logout}>Выйти из системы</Dropdown.Item>
                </DropdownButton>
            </div>
                : <NavLink className={"btn btn-outline-primary" + " " + s.button} to={'/login'}>Login</NavLink>}
        </div>

    </header>
};


export default Header;