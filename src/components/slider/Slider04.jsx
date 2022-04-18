import React from 'react';
import { Link } from 'react-router-dom'
import { Navigation, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const Slider04 = props => {
    const data = props.data
    return (
        <section className=" slider">
            <Swiper
                modules={[Navigation, Scrollbar, A11y]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                scrollbar={{ draggable: true }}
            >
                {
                    data.map((item, index) => (
                        <SwiperSlide key={index}>
                            <SliderItem item={item} />
                        </SwiperSlide>

                    ))
                }
            </Swiper>



        </section>
    )
};

const SliderItem = props => (
    <>
    <div className="swiper-slide">
        <div className="slider-item">
            <div className="sc-product-item">
                <div className="product-img">
                    
                    <img src={props.item} alt="Bidzen" />
                    {/* <img src={props.datas[0].img} alt="Bidzen" /> */}
                    {/* <Link to="/connect-wallet"
                        className="sc-button style letter"><span>Buy</span></Link> */}
                    <label>{props.item.ad_category}</label>
                </div>
            </div>
        </div>
    </div>
    </>

)



export default Slider04;
