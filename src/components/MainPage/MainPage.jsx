import React, {useState} from "react";
import {Carousel} from "react-bootstrap";
import slide1 from "../../assets/images/Slide1.png";
import slide2 from "../../assets/images/Slide2.png";
import slide3 from "../../assets/images/Slide3.png";
import s from "./MainPage.module.css";

const MainPage = () => {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return <div>
        <Carousel activeIndex={index} onSelect={handleSelect} className = {s.carousel}>
            <Carousel.Item>
                <img
                    className={s.image}
                    src={slide1}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className={s.image}
                    src={slide2}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className={s.image}
                    src={slide3}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </div>
}

export default MainPage;