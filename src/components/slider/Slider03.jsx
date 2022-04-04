import React from 'react';
import { Link } from 'react-router-dom'
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css/effect-cube";

import { EffectCube } from "swiper";


const Slider03 = props => {
    const data = props.data
    return (
        <section className="tf-slider slider-box">
            <div class="slider-inner flex home-1">
                <div class="slider-content">
                    <h1 class="heading">Discover and collect your favorite digital NTFs</h1>
                    <p class="sub-heading">Quis autem vel eum iure reprehenderit qui in ea voluptates esse quam nihil molestiae consequatur veillum</p>
                    <div class="button-slider">
                        <Link to="/explore-01"
                            className="sc-button btn-bordered-white style letter "><span>Explore
                                More</span></Link>
                        <Link to="/create-item"
                            className="sc-button btn-bordered-white style file"><span>Create
                                Now</span></Link>
                    </div>
                </div>
                <div className='mySwiper'>
                    <Swiper
                        effect={"cube"}
                        grabCursor={true}
                        loop={true}
                        cubeEffect={{
                            shadow: true,
                            slideShadows: true,
                            shadowOffset: 20,
                            shadowScale: 0.94,
                        }}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        pagination={true}
                        modules={[Autoplay, EffectCube]}
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

        </section>
    )
};


const SliderItem = props => (
    <div class="slider-img">
        <div className="img-home-1"><img src={props.item.img} alt="Bidzen" /></div>
    </div>

)



export default Slider03;
