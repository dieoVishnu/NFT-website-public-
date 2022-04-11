import React , {useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom'
import Header from '../components/header/Header';
import Countdown from 'react-countdown';
import { Tab, Tabs, TabList, TabPanel  } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import LiveAution from '../components/layouts/home02/LiveAution';
import dataLiveAution from '../assets/fake-data/dataLiveAution'
import  Newsletters from '../components/layouts/Newsletters';
import Footer from '../components/footer/Footer';

import img1 from '../assets/images/avatar/avt-6.jpg'
import img2 from '../assets/images/avatar/avt-2.jpg'
import img3 from '../assets/images/avatar/avt-4.jpg'
import imgdetail1 from '../assets/images/product-item/auction-detail.jpg'
import avt1 from '../assets/images/avatar/avt-4.jpg'
import avt2 from '../assets/images/avatar/avt-6.jpg'
import avt3 from '../assets/images/avatar/avt-3.jpg'
import useSingelpost from '../customhook/useSingelpost';

const ItemDetails = () => {
    const [dataHistory] = useState(
        [
            {
                img: img1,
                name:"@Johnson",
                time: "8 hours ago ",
                price: "25 ETH ",
            },
            {
                img: img2,
                name:"@Johnson",
                time: "8 hours ago ",
                price: "25 ETH ",
            },
            {
                img: img3,
                name:"@Johnson",
                time: "8 hours ago ",
                price: "25 ETH ",
            },
        ]
    )

    // const [path,setPath] = useState()
    const location = useLocation()
    const path1 = location.pathname.split("/")[2]
    const path2 = location.pathname.split("/")[3]
    console.log(path2,path1)
    

    const imoodiniData = useSingelpost(path1,path2)
        console.log(imoodiniData)
  return <div className='item-details'>
        <Header />
        {
            imoodiniData ?
            
            <>
        <section className="fl-page-title">
            <div className="overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="page-title-inner flex">
                            <div className="page-title-heading">
                                <h2 className="heading">Product Details</h2>
                            </div>
                            <div className="breadcrumbs">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li>Product Details</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="tf-section item-details-page">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-12 col-md-12">
                            <div className="item-media">
                                <div className="media">
                                    <img src={imoodiniData.data.ad_cover_image} alt="Bidzen" />
                                </div>
                                {/* <div className="countdown style-2">
                                    <Countdown  date={Date.now() + 500000000} />
                                </div> */}
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 col-md-12">
                            <div className="content-item">
                                <h3> {imoodiniData.data.ad_title}</h3>
                                <p className="mg-bt-42">{imoodiniData.data.ad_details}</p>
                                <div className="author-item">
                                    <div className="avatar">
                                        <img src={avt1} alt="Bidzen" />
                                    </div>
                                    <div className="infor">
                                        <div className="create">Owner By</div>
                                        <h6><Link to="/authors">{imoodiniData.data.user_name}</Link> </h6>
                                        {/* <div className="widget-social">
                                            <ul>
                                                <li><Link to="#" className="active"><i className="fab fa-facebook-f"></i></Link>
                                                </li>
                                                <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                                                <li><Link to="#"><i className="fab fa-instagram"></i></Link></li>
                                                <li><Link to="#"><i className="fab fa-linkedin-in"></i></Link></li>
                                            </ul>
                                        </div> */}
                                    </div>
                                </div>
                                <ul className="list-details-item">
                                    <li><span className="name">Current Price</span><span
                                            className="price">${imoodiniData.data.ad_price}</span> <span className="pagi"></span> </li>
                                    {/* <li>Size 14000 x 14000 px</li> */}
                                    {/* <li> Volume Traded 64.1</li> */}
                                </ul>
                                {/* <div className="author-bid">
                                    <div className="author-item">
                                        <div className="avatar">
                                            <img src={avt2} alt="Bidzen" />
                                        </div>
                                        <div className="infor">
                                            <h6><Link to="/authors">Keith J. Kelley</Link> </h6>
                                            <div className="create">Creators</div>
                                        </div>
                                    </div>
                                    <div className="author-item">
                                        <div className="avatar">
                                            <img src={avt3} alt="Bidzen" />
                                        </div>
                                        <div className="infor">
                                            <h6><Link to="/authors">David Michels</Link> </h6>
                                            <div className="create">Collection</div>
                                        </div>
                                    </div>

                                </div> */}
                                {/* <div className="infor-bid">
                                    <div className="content-left">
                                        <h6>Highest Bid</h6>
                                        <div className="price">9.3 BNB</div>
                                    </div>
                                    <div className="pagi">1 Of 9</div>
                                </div> */}
                                <Link to={`/contact/${imoodiniData.data.ad_id}/${imoodiniData.data.ad_title}`}
                                    className="sc-button style letter style-2 style-item-details"><span>Contact us</span>
                                </Link>
                                <div className="flat-tabs themesflat-tabs">
                                <Tabs>
                                        <TabList>
                                        <Tab>Bid</Tab>
                                        <Tab>location</Tab>
                                        <Tab>Details</Tab>
                                        </TabList>

                                        <TabPanel>
                                            <ul className="bid-history-list">
                                            {
                                                dataHistory.map((item, index) => (
                                                    <li key={index}>
                                                        <div className="content">
                                                            <div className="author-item">
                                                                <div className="avatar">
                                                                    <img src={item.img} alt="Bidzen" />
                                                                </div>
                                                                <div className="infor">
                                                                    <p>Bid listed for <span className="status">{item.price}</span> 
                                                                    {item.time}
                                                                        by <span className="creator">{item.name}</span> </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                            </ul>
                                        </TabPanel>
                                        <TabPanel>
                                            <ul className="bid-history-list">
                                                <li>
                                                    <div className="content">
                                                        <div className="author-item">
                                                            {/* <div className="avatar">
                                                                <img src={img1} alt="Bidzen" />
                                                            </div> */}
                                                            <div className="infor">
                                                                {/* <p>Bid listed for <span className="status">25 ETH 8</span>
                                                                    hours ago
                                                                    by <span className="creator">@Johnson</span> </p> */}
                                                                    <p>{imoodiniData.data.adlocation}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </TabPanel>
                                        <TabPanel>
                                            {/* <div className="provenance">
                                                <p>
                                                   
                                                </p>
                                            </div> */}
                                            <ul className="bid-history-list">
                                                <li>
                                                    <div className="content">
                                                        <div className="author-item">
                                                            <div className="avatar">
                                                                <img src={img1} alt="Bidzen" />
                                                            </div>
                                                            <div className="infor">
                                                              <p>{imoodiniData.data.adyear}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </TabPanel>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
        {/* <LiveAution data={dataLiveAution} /> */}
        
        </>
        :
        <>
        loding
        </>

        }
        {/* <Newsletters /> */}
        <Footer />

  </div>;
};

export default ItemDetails;


<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d464.5379865223107!2d55.28109850974789!3d25.186086876696038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f683a83e528df%3A0xf9c17edb93ae3854!2sInner%20Circle%20Bay%20Business%20Center!5e0!3m2!1sen!2sae!4v1649397367195!5m2!1sen!2sae" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>