import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {Button} from "react-bootstrap";
import logo from "./../../assets/images/logo.png"

const Header = (props) => {
    return <header className={s.header + ' ' +((props.role==='Courier')&&s.courier) + ' ' +((props.role==='Client')&&s.customer)}>
        <NavLink to={'/main'}><img src={logo}/></NavLink>

        <div className={s.loginBlock}>
            { props.isAuth
                ? <div>{props.username}   <Button className={"btn btn-danger" } onClick={props.logout}>Выйти</Button></div>
                : <NavLink className={"btn btn-outline-primary" }  to={'/login'}>Login</NavLink> }
        </div>
    </header>
}

export default Header;