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
            <div className="slider-inner flex home-1 myswiper-slider">
                <div className="slider-content">
                    <h1 className="heading">For Collectors,</h1>
                    <h1 className="heading">By Collectors</h1>
                    <p className="sub-heading">The Worlds Only One Stop Shop For All Rare Collectibles</p>
                    
                    <div className="button-slider">
                    <p className='stroke'>Couldn't Find What You Are Looking For?</p>
                        <Link to="/contact"
                            className="sc-button btn-bordered-white style letter "><span>Special
                                Inquiry</span></Link>
                        {/* <Link to="/create-item"
                            className="sc-button btn-bordered-white style file"><span>Create
                                Now</span></Link> */}
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
        {/* <div className="nft-item-top d-flex justify-content-between align-items-center">
            <div className="author-part">
                <ul className="author-list d-flex">
                    <li className="single-author d-flex align-items-center">
                        <a href="author.html" className="veryfied"><img
                            loading="lazy" src="assets/images/seller/04.png"
                            alt="author-img" /></a>
                        <h6><a href="author.html">rasselmrh</a></h6>
                    </li>
                </ul>
            </div>
            <div className="more-part">
                <div className=" dropstart">
                    <a className=" dropdown-toggle" href="#" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false"
                        data-bs-offset="25,0">
                        <i className="icofont-flikr"></i>
                    </a>

                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#"><span>
                            <i className="icofont-warning"></i>
                        </span> Report </a>
                        </li>
                        <li><a className="dropdown-item" href="#"><span><i
                            className="icofont-reply"></i></span>
                            Share</a></li>
                    </ul>
                </div>
            </div>
        </div> */}
        {/* <!-- nft-bottom part-- > */}
        <div className="nft-item-bottom">
            <div className="nft-thumb">
                <img className='slide-cover-img' loading="lazy" src={props.item.img}
                    alt="nft-img" />
            </div>
            {/* <div className="slider-img">
                <div classNameName="img-home-1"><img src={props.item.img} alt="Bidzen" /></div>
            </div> */}
            <div className="nft-content">
                <h4><Link to={`/item-details/${props.item.ad_slug}/${props.item.ad_category}`}>{props.item.title}</Link> </h4>
                {/* <div
                    className="price-like d-flex justify-content-between align-items-center">
                    <p className="nft-price">Price: <span className="yellow-color">0.34
                        ETH</span>
                    </p>
                    <a href="#" className="nft-like"><i className="icofont-heart"></i>
                        230</a>
                </div> */}
            </div>
        </div>
    </div>

)



export default Slider03;
