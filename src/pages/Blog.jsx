import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import Header from '../components/header/Header';
import dataBlog from '../assets/fake-data/dataBlog';
import  Newsletters from '../components/layouts/Newsletters';
import Footer from '../components/footer/Footer';
import useData from '../customhook/useData';

const Blog = () => {
    const location = useLocation()
    const path1 = location.pathname.split("/")[2]

    const imoodiniData = useData(path1)
    console.log(imoodiniData)

    const [changeLink, setChangeLink] = useState({
        link:'s'
    })

    useEffect(()=>{
        const handelCategory = ()=>{
            if(path1 === '1'){
                setChangeLink({
                    link:'/blog-details',
                    category: 'cars'
                })
            }if (path1 === '2'){
                setChangeLink({
                    link:'/item-details',
                    category: 'Memorabilia '
                })
            }   
        }
        handelCategory()
    },[path1])



  return <div>
    <Header />
    <section className="fl-page-title">
        <div className="overlay"></div>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="page-title-inner flex">
                        <div className="page-title-heading">
                            <h2 className="heading">{changeLink.category}</h2>
                        </div>
                        <div className="breadcrumbs">
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li>News & Blogs </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div className="tf-section sc-card-blog">
        <div className="container">
            <div className="row">
                {
                    imoodiniData.map((item,index) => (
                        <div key={index} className="col-lg-4 col-md-6">
                            <article className="sc-card-article">
                                <div className="card-media">
                                    {/* <Link to="/blog-details"><img src={item.img} alt="Bidzen" /></Link> */}
                                    <Link to={`${changeLink.link}/${item.ad_slug}/${item.ad_category}`}><img src={dataBlog[0].img} alt="Bidzen" /></Link>
                                </div>
                                <div className="content">
                                    {/* <div className="meta-info">
                                        <div className="item author">
                                            <Link to="/authors">{item.}</Link>
                                        </div>
                                        <div className="item date">{item.ad_price}</div>
                                    </div> */}
                                    <div className="text-article">
                                        <h5><Link to={`${changeLink.link}/${item.ad_slug}/${item.ad_category}`}>{item.ad_title}</Link></h5>
                                    </div>
                                    <Link to={`${changeLink.link}/${item.ad_slug}/${item.ad_category}`}
                                        className="sc-button btn-bordered-white style letter"><span>{item.ad_price}</span></Link>
                                </div>
                            </article>
                        </div>
                    ))
                }

                <div className="col-md-12">
                    <div className="wg-themesflat-pagination">
                        <ul>
                            <li><Link to="#" className="page-numbers prev active"></Link></li>
                            <li><Link to="#" className="page-numbers">01</Link></li>
                            <li><Link to="#" className="page-numbers">02</Link></li>
                            <li><Link to="#" className="page-numbers current">03</Link></li>
                            <li><Link to="#" className="page-numbers">04</Link></li>
                            <li><Link to="#" className="page-numbers next"></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Newsletters />
    <Footer />
  </div>;
};

export default Blog;
