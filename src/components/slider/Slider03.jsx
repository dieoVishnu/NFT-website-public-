import React from 'react';
import { Link } from 'react-router-dom'
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css/effect-cube";

import { EffectCube } from "swiper";
import Header from '../header/Header';


const Slider03 = props => {
    const data = props.data
    console.log(props.activeData)
    return (
        <section className={props.activeData === true ? "tf-slider slider-box viewHight-90 active-opacity " : "tf-slider slider-box viewHight-90 "}>
            <Header />
            {/* <div className="overlay"></div> */}
            <div className="slider-inner flex home-1 myswiper-slider">
                <div className="slider-content">
                    <h1 className="heading" >the <br /> collectors <br /> Market</h1>
                    {/* <h1 className="heading stroke-heading">the way you collect</h1> */}
                    <p className="sub-heading">Build your collection portfolio</p>
                    
                    <div className="button-slider pt-5">
                    {/* <p className=' sub-heading stroke stroke-heading'>Couldn't Find What You Are Looking For?</p>
                        <a href="/contact/#Special"
                            className="sc-button btn-bordered-white style letter "><span>Special
                                Inquiry</span></a> */}
                        {/* <Link to="/create-item"
                            className="sc-button btn-bordered-white style file"><span>Create
                                Now</span></Link> */}
                    </div>
                </div>
                {/* <div className='mySwiper slider-content'>
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
                            delay: 3000,
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
                </div> */}

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
                {/* <h4><Link to={`/item-details/${props.item.ad_slug}/${props.item.ad_category}`}>{props.item.title}</Link> </h4> */}
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
