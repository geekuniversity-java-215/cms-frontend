import React from 'react';
import s from './Footer.module.css';

const Footer = (props) => {
    return <footer className={s.footer + ' ' +((props.role==='Courier')&&s.courier) + ' ' +((props.role==='Client')&&s.customer)}>
        <span>All rights reserved. 2020</span>

        <div >
        </div>
    </footer>
}

export default Footer;