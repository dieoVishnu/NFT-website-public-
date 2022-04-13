import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import Header from '../components/header/Header';
import dataBlog from '../assets/fake-data/dataBlog';
import  Newsletters from '../components/layouts/Newsletters';
import Footer from '../components/footer/Footer';
import useData from '../customhook/useData';

const Blog = () => {

    // pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(9)
    const [totalPageNumber, setTotalPageNumber ] = useState([])

    const location = useLocation()
    const path1 = location.pathname.split("/")[2]
    const imoodiniData = useData(path1,60)

    const [changeLink, setChangeLink] = useState({
        link:'s'
    })

    // get current post
    const indexOfLastPage = currentPage * postPerPage
    const indexOfFirstPage = indexOfLastPage - postPerPage
    const currentPost = imoodiniData.slice(indexOfFirstPage, indexOfLastPage)

    const paginationIncrement = (value)=>{
        setCurrentPage(value)
        window.scrollTo(0, 0);
    }

    const handelPagination = (method)=>{
        if (!method){
            if (currentPage === 1){
                return 0
            }else{
                window.scrollTo(0, 0);
                setCurrentPage(currentPage-1)
            }
        }else{
            if (currentPage === totalPageNumber.length){
                return 0
            }else{
                window.scrollTo(0, 0);
                setCurrentPage(currentPage+1)
            }

        }
    }


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
        const pagnum = []
        for (let i = 0; i < Math.ceil(imoodiniData.length/postPerPage); i++){
            pagnum.push(1+i)
        }
        setTotalPageNumber(pagnum)
        console.log(pagnum)

        handelCategory()
    },[path1,imoodiniData])



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
                                <li>Memorabila</li>
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
                    currentPost.map((item,index) => (
                        <div key={index} className="col-lg-4 col-md-6">
                            <article className="sc-card-article">
                                <div className="card-media">
                                    {/* <Link to="/blog-details"><img src={item.img} alt="Bidzen" /></Link> */}
                                    <Link to={`${changeLink.link}/${item.ad_slug}/${item.ad_category}`}><img src={item.ad_cover_image} alt="Bidzen" width={370} height={250}/></Link>
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
                                        className="sc-button btn-bordered-white style letter"><span>${item.ad_price.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</span></Link>
                                </div>
                            </article>
                        </div>
                    ))
                }

                <div className="col-md-12">
                    <div className="wg-themesflat-pagination">
                        <ul>
                            <li><Link to="#" className="page-numbers prev"  onClick={()=>handelPagination(false)}></Link></li>
                            {totalPageNumber.map((data, number)=>(
                                
                                <li><Link to="#" className={number+1 === currentPage ? "page-numbers active" : "page-numbers"} onClick={()=>paginationIncrement(number+1)}>{number+1}</Link></li>
                            ))}

                            <li><Link to="#" className="page-numbers next" onClick={()=>handelPagination(true)}></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <Newsletters /> */}
    <Footer />
  </div>;
};

export default Blog;
