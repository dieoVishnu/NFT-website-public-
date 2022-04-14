import React from 'react';
import { Link } from 'react-router-dom'
import useData from '../../../customhook/useData';

const TrendingCollections = props => {
    const data = props.data
    const imoodiniData = useData(1,12)
  return (
    <section className="tf-trendy-collections tf-section">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="sc-heading style-2">
                        <div className="content-left">
                            <div className="inner">
                                <h3>Classic Cars</h3>
                                <p className="desc"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='trendy'>
                    {
                        imoodiniData.map((item,index) =>(
                            <div key={index} className='col-lg-4 col-md-6 col-12'>
                                <div className="sc-product-item style-2">
                                        <div className="product-img">
                                            <img src={item.ad_cover_image} alt="Bidzen" width={370} height={250} />
                                            {/* <img src={data[0].img} alt="Bidzen" /> */}
                                            {/* <Link to="/connect-wallet"
                                                className="sc-button style letter"><span>Place Bid</span></Link> */}
                                            <label>{item.ad_category}</label>
                                        </div>
                                        <div className="product-content">
                                            <h5 className="title"><Link to={`/blog-details/${item.ad_slug}/${item.ad_category}`}>{item.ad_title}</Link> </h5>
                                            {/* <div className="product-author flex">
                                                <div className="avatar">
                                                    <img src={item.imgAuthor} alt="Bidzen" />
                                                </div>
                                                <div className="infor">
                                                    <div className="author-name"><Link to="/authors">{item.name}</Link></div>
                                                    <span>Creator</span>
                                                </div>
                                            </div> */}
                                            <div className="product-price flex">
                                                <div className="title">Price</div>
                                                <div className="price">
                                                    <span>${item.ad_price.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</span>
                                                    {/* <span>= {item.priceChange}</span> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    </section>
  );
};

export default TrendingCollections;
