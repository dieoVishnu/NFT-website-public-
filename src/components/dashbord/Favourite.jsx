import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { Link } from 'react-router-dom'
import useData from "../../customhook/useData";

const Favourite = ()=>{


    const imoodiniData = useData(2,10)
    console.log(imoodiniData.length === 0)

    return <div>
        <Header />
        <section className="fl-page-title">
        <div className="overlay"></div>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="page-title-inner flex">
                        <div className="page-title-heading">
                            <h2 className="heading">Favourites</h2>
                        </div>
                        <div className="breadcrumbs">
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li>Favourites</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        <section className="tf-section sc-card-blog"> 
            <div className="container">
               
                {imoodiniData.length === 0 ? 
               <>
               </>
                : 
                <div className="favourite">
                    
                    
                </div>
                }
            </div>
        </section>
        <Footer />

    </div>
}

export default Favourite

