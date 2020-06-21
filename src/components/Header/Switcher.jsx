import React from "react";
import {DropdownButton, Dropdown} from "react-bootstrap";
import {switchRoleInStorage} from "../../utils/storage-handler";
import {ROLE_CLIENT, ROLE_COURIER} from "../../redux/auth-reducer";
import s from "./Header.module.css";

const Switcher = (props) => {
    let currentRole;

    const handleClient = async () => {
        if (currentRole !== ROLE_CLIENT[1]) {
            let result = await switchRoleInStorage();
            props.switchRolesInState(result);
        }
    };

    const handleCourier = async () => {
        if (currentRole !== ROLE_COURIER[1]) {
            let result = await switchRoleInStorage();
            props.switchRolesInState(result);
        }
    };

    if (props.role != null) {
        if (props.role.length > 1) {
            if (props.role[0] === ROLE_COURIER[0]) {
                currentRole = ROLE_COURIER[1];
            } else if (props.role[0] === ROLE_CLIENT[0]) {
                currentRole = ROLE_CLIENT[1];
            }
            return <div>
                <DropdownButton className={s.switchButton} id="dropdown-item-button" title={currentRole}>
                    <Dropdown.Item as="button" onClick={handleClient}>Клиент</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={handleCourier}>Курьер</Dropdown.Item>
                </DropdownButton>
            </div>
        } else {
            return <div>
            </div>
        }
    } else {
        return <div>
        </div>
    }

};

export default Switcher;