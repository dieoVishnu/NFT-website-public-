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
            <div class="slider-inner flex home-1 myswiper-slider">
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
                <div className='mySwiper slider-content'>
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
                            delay: 5500,
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

    <div className='nft-inner'>
        <div class="nft-item-top d-flex justify-content-between align-items-center">
            <div class="author-part">
                <ul class="author-list d-flex">
                    <li class="single-author d-flex align-items-center">
                        <a href="author.html" class="veryfied"><img
                            loading="lazy" src="assets/images/seller/04.png"
                            alt="author-img" /></a>
                        <h6><a href="author.html">rasselmrh</a></h6>
                    </li>
                </ul>
            </div>
            <div class="more-part">
                <div class=" dropstart">
                    <a class=" dropdown-toggle" href="#" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false"
                        data-bs-offset="25,0">
                        <i class="icofont-flikr"></i>
                    </a>

                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#"><span>
                            <i class="icofont-warning"></i>
                        </span> Report </a>
                        </li>
                        <li><a class="dropdown-item" href="#"><span><i
                            class="icofont-reply"></i></span>
                            Share</a></li>
                    </ul>
                </div>
            </div>
        </div>
        {/* <!-- nft-bottom part-- > */}
        <div class="nft-item-bottom">
            <div class="nft-thumb">
                <img loading="lazy" src={props.item.img}
                    alt="nft-img" />
            </div>
            {/* <div class="slider-img">
                <div className="img-home-1"><img src={props.item.img} alt="Bidzen" /></div>
            </div> */}
            <div class="nft-content">
                <h4><a href="item-details.html">Black Cat </a> </h4>
                <div
                    class="price-like d-flex justify-content-between align-items-center">
                    <p class="nft-price">Price: <span class="yellow-color">0.34
                        ETH</span>
                    </p>
                    <a href="#" class="nft-like"><i class="icofont-heart"></i>
                        230</a>
                </div>
            </div>
        </div>
    </div>

)



export default Slider03;
