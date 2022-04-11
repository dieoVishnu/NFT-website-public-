import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Countdown from "react-countdown";
import useData from '../../../customhook/useData';

const Gallery = props => {
    const [databse, setDatabse] = useState([])
    const data = props.data;
    const imoodiniData = useData(2,12)
    // console.log("this is",imoodiniData)
    
    return (
        <section className="tf-live-auctions tf-section bg-color-1">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="sc-heading style-2 has-icon">
                            <div className="content-left">

                                <div className="inner">
                                    <div className="group">
                                        <div className="icon"><i className="ripple"></i></div>
                                        <h3>Featured Product</h3>
                                    </div>
                                    <p className="desc">Most popular gaming digital nft market place </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="swiper-container">
                            <div className="swiper-wrapper live-auc">
                                <Swiper
                                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                                    spaceBetween={30}

                                    breakpoints={{
                                        0: {
                                            slidesPerView: 1,
                                        },
                                        767: {
                                            slidesPerView: 2,
                                        },
                                        991: {
                                            slidesPerView: 3,
                                        },
                                        1300: {
                                            slidesPerView: 4,
                                        },
                                    }}
                                    navigation
                                    pagination={{ clickable: true }}
                                    scrollbar={{ draggable: true }}
                                >
                                    {
                                        imoodiniData.map((item, index) => (
                                            <SwiperSlide key={index}>
                                                <LiveAutionItem item={item} datas={props.data} />
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

const LiveAutionItem = props => (

    <div className="swiper-slide">
        <div className="slider-item">
            <div className="sc-product-item">
                <div className="product-img">
                    
                    <img src={props.item.ad_cover_image} alt="Bidzen"  width={250} height={250} />
                    {/* <img src={props.datas[0].img} alt="Bidzen" /> */}
                    {/* <Link to="/connect-wallet"
                        className="sc-button style letter"><span>Buy</span></Link> */}
                    <label>{props.item.ad_category}</label>
                </div>
                <div className="product-content">
                    <h5 className="title"><Link to={`/item-details/${props.item.ad_slug}/${props.item.ad_category}`}>"{props.item.ad_title}"</Link> </h5>
                    {/* <div className="product-author flex">
                        <div className="avatar">
                            <img src={props.item.imgAuthor} alt="Bidzen" />
                        </div>
                        <div className="infor">
                            <div className="author-name"><Link to="/authors">{props.item.name}</Link></div>
                            <span>Creator</span>
                        </div>
                    </div> */}
                    <div className="product-price">
                        <div className="title">Price</div>
                        <div className="price">
                            <span>{props.item.ad_price}</span>
                            {/* <span>= {props.item.priceChange}</span> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default Gallery;
