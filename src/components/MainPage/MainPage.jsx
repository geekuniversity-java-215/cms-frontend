import React, {useState} from "react";
import {Carousel} from "react-bootstrap";
import slide1 from "../../assets/images/Slide1.png";
import slide2 from "../../assets/images/Slide2.png";
import slide3 from "../../assets/images/Slide3.png";
import s from "./MainPage.module.css";

const MainPage = (props) => {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return <div className = {!props.isAuth&&s.auth || props.isAuth&&s.notAuth}>
        <Carousel activeIndex={index} onSelect={handleSelect} >
            <Carousel.Item>
                <img
                    className={!props.isAuth&&s.image || props.isAuth&&s.imageNotAuth}
                    src={slide1}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3 className={s.text}>Сделайте или возьмите в работу заказ</h3>
                    <p className={s.text}>Вы можете разместить или взять в работу заказ за 1 минуту </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className={!props.isAuth&&s.image || props.isAuth&&s.imageNotAuth}
                    src={slide2}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3 className={s.text}>Передайте или заберите заказ</h3>
                    <p className={s.text}>Все заказы застрахованы</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className={!props.isAuth&&s.image || props.isAuth&&s.imageNotAuth}
                    src={slide3}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3 className={s.text}>Будьте довольны</h3>
                    <p className={s.text}>Согласно опросам, 98.6% пользователей довольны нашим сервисом</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </div>
}

export default MainPage;