import React from 'react';
import { Link } from 'react-router-dom'
import { Navigation, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css/effect-cards";

const Slider03 = props => {
    const data = props.data
    return (
        <section className="tf-slider slider">
            <div className="slider-inner flex home-1">
                <div className="slider-content">
                    <h1> <span class="theme-color-4">
                        Create</span>, Collect And <span class="theme-color-4"> <br /> Sell</span> Digital
                        Items.
                    </h1>
                    <p>Digital Marketplace For Crypto Collectibles And Non-Fungible Tokens.
                        Buy, Sell, And Discover Exclusive Digital Assets.
                    </p>

                </div>
                <div>
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
                </div>
            </div>




        </section >
    )
};

const SliderItem = props => (
    <div className="slider-img">
        <div className="img-home-1"><img src={props.item.img} alt="Bidzen" /></div>
    </div>

)



export default Slider03;
