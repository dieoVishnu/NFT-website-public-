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
import { useDispatch, useSelector } from 'react-redux';
import { walletconnect, walletremove } from '../redux/metaWallet';
import {ethers} from 'ethers'
import useCurrency from '../customhook/useCurreny';
import { Form } from 'react-bootstrap';

const ItemDetails = () => {

    // currency converter
    const {info:currency,currencysign,currencyData} = useCurrency()

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
    

    const imoodiniData = useSingelpost(path1,path2)
    // const imoodiniData = false



     // metamask wallet connect

    //  redux
    const dispatch = useDispatch();
    const metaWallet = useSelector(state => state.wallet.walletid);
     const handelMetamask = async (e)=>{
        e.preventDefault()
            try {
                if(!window.ethereum)
                    throw new Error('metmask not found..');
                const result = await window.ethereum.request({method: 'eth_requestAccounts'})
                if (result){
                    dispatch(walletconnect(result[0]))
                    alert(result)
                }
            } catch (error) {
                console.log('error mettamask', error)
            }
        
        
    }

    const handelwallettransfer =  (e)=>{
        e.preventDefault()
        const transfer = async (val)=>{
            try {
                if(!window.ethereum)
                    throw new Error('metmask not found..');
                const tx = await window.ethereum.request({
                    method: 'eth_sendTransaction',
                    params:[
                        {
                            from: metaWallet,
                            to: '0xf80CCa0450F5026FE105349B2E8Fe4F5Fe1B9190',
                            value: val,
                            gasPrice: '0x09184e72a000',
                            gas: '0x2710',
                        },
                    ],
                })
                if (tx)
                    console.log(tx)
            } catch (error) {
                console.log(error)
            }
        }
        const priceToEth = ()=>{
            const eth = Number(imoodiniData.data.ad_price * currency[currencyData]).toLocaleString()
            const result  = ethers.utils.parseEther(eth)
            // console.log(result, metaWallet)
            transfer(result._hex)
        }
        priceToEth()
        

    }
        
  return <div className='item-details'>
        <Header />
        {
            imoodiniData && currency ?
            
            <>
        <section className="fl-page-title">
            <div className="overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="page-title-inner flex">
                            <div className="page-title-heading">
                                <h2 className="heading">MEMORABILIA</h2>
                            </div>
                            <div className="breadcrumbs">
                                <ul>
                                    <li><Link to="/">HOME</Link></li>
                                    <li>MEMORABILIA</li>
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
                                        {/* <img src={avt1} alt="Bidzen" /> */}
                                    </div>
                                    <div className="infor">
                                        <div className="create">Owned by</div>
                                        <h6>{imoodiniData.data.user_name}</h6>
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
                                            className="price">{currencysign} {Number(imoodiniData.data.ad_price * currency[currencyData]).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</span> <span className="pagi"></span> </li>
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
                                <Link to={`/cheko/${path1}/${path2}`}
                                    className="sc-button style letter style-2 style-item-details"><span>Buy Now</span>
                                </Link>
                                {metaWallet ? (
                                     <Link to='#' onClick={e=>handelwallettransfer(e)}
                                     className="ml-2 sc-button style letter style-2 style-item-details">
                                         <span>Buy</span>
                                 </Link>
                                           ):(  
                                            <Link to='#' onClick={e=>handelMetamask(e)}
                                            className="ml-2 sc-button style letter style-2 style-item-details">
                                                <span>Wallet-Connect</span>
                                        </Link>
                                            
                                       )}
                               
                                
                                <div className="flat-tabs themesflat-tabs">
                                <Tabs>
                                        <TabList>
                                        {/* <Tab>Bid</Tab> */}
                                        <Tab>location</Tab>
                                        <Tab>Details</Tab>
                                        </TabList>

                                        {/* <TabPanel>
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
                                        </TabPanel> */}
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
                                                                {/* <img src={img1} alt="Bidzen" /> */}
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
        {/* lodings */}
        <div className="loading-section">

        </div>
        </>

        }
        {/* <Newsletters /> */}
        <Footer />

  </div>;
};

export default ItemDetails;


