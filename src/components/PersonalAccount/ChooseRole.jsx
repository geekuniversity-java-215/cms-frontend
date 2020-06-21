import courier from "../../assets/images/courier.png";
import client from "../../assets/images/client.png";
import React, {useState} from "react";
import {ROLE_CLIENT, ROLE_COURIER, setUserRole} from "../../redux/auth-reducer";
import s from "./PersonalAccount.module.css";
import {Button} from "react-bootstrap";
import {BackSide, Flippy, FrontSide} from "react-flippy";

const ChooseRole = (props) => {
    const styleForCourier = {
        background: `url(${courier})`,
        height: '500px',
        width: '500px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        alignItems: 'center',
    };

    const styleForClient = {
        background: `url(${client})`,
        height: '500px',
        width: '500px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        alignItems: 'center'
    };

    let [role, setRole] = useState(ROLE_COURIER[0]);

    const changeRoll = () => {
        if (role === ROLE_COURIER[0]) {
            setRole(ROLE_CLIENT[0]);
        } else {
            setRole(ROLE_COURIER[0]);
        }
    };

    const handleClick = () => {
         props.setUserRole(role);
    };

    return <div className={s.card}>

        <Button variant="outline-*dark" onClick={changeRoll}>
            {role === ROLE_COURIER[0] ? <span className={s.text}>Вы будете курьером</span> :
                <span className={s.text}>Вы будете клиентом</span>}
            <Flippy
                flipDirection="horizontal"
                onClick={changeRoll}
                isFlipped={role !== ROLE_COURIER[0]}>
                <FrontSide style={styleForCourier}/>
                <BackSide style={styleForClient}/>
            </Flippy>
        </Button>
        <Button className={s.button} variant="success" size="lg" onClick={handleClick}>Стать им!</Button>
    </div>
};

export default ChooseRole;