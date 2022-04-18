import React , { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import Header from '../components/header/Header';
import  Newsletters from '../components/layouts/Newsletters';
import Footer from '../components/footer/Footer';
import axios from '../assets/axios';

const Contact = () => {

    // mailer
    const initialvalues = {
        inquiryUserName: "", 
        inquiryUserNumber: "", 
        inquiryUserEmail: "", 
        inquiryBody:"", 
        inquiryItemNumber: "null",
        inquiryItemTitle: "null",
        returnUrl: "",
    }
    const [formvalues, setFormValues] = useState(initialvalues)
    const location = useLocation()
    const ad_id = location.pathname.split("/")[2]
    const adtitle = location.pathname.split("/")[3]
    

    const handelChange = (e)=>{
        const {name,value} = e.target
        setFormValues({...formvalues,[name]:value})
    }   

    const handelSubmit = async(e)=>{
        e.preventDefault()
        console.log(formvalues)
        try{
            const res = await axios.get('imi_api/mailer/sendInquiry',{
                params:formvalues
               
            })
            if(res.data.data === null || res.data.data === "null"){
                
                console.log('faild')
            }
            else{
                // res.data && window.location.replace('/')
                console.log(res)
            }
            
        }
        catch(error){
            console.log('this is error',error)
        }


    }

    useEffect(()=>{
        if(ad_id !== undefined){
            setFormValues({...formvalues,['inquiryItemNumber']:ad_id,['inquiryItemTitle']:adtitle})
        }

    },[location])



    const [data] = useState(
        [
            {
                title: 'Contact Our Hotline',
                icon: 'fal fa-phone-volume',
                info: '+971 4 551 4225',
                link: 'tel:0097145514225'
            },
            {
                title: 'Our Location',
                icon: 'fal fa-map-marker-alt',
                info: '406-407, Bay Square 13, Business Bay, Dubai, UAE',
                p : "United Arab Emirates",
                link: ''
            },
            {
                title: 'Contact Us via Email',
                icon: 'fal fa-envelope-open',
                info: 'contact@imoodini.com',
                link: 'mailto:contact@imoodini.com'
            },
        ]
    )
  return <div>
    <Header />
    <section className="fl-page-title">
        <div className="overlay"></div>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="page-title-inner flex">
                        <div className="page-title-heading">
                            <h2 className="heading">CONTACT</h2>
                        </div>
                        <div className="breadcrumbs">
                            <ul>
                                <li><Link to="/">HOME</Link></li>
                                <li>CONTACT</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="tf-contact tf-section">
        <div className="container">
            <div className="row">
                {
                    data.map((item,index)=> (
                        <div key={index} className="col-md-4">
                            <div className="sc-contact-infor">
                                <h4>{item.title}</h4>
                                <div className="icon">
                                    <i className={item.icon}></i>
                                </div>
                                <div className="infor">
                                    <Link to={item.link}>{item.info}</Link>
                                    {/* <Link to="#"> {item.p}</Link> */}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </section>
    <section  id='Special'>
        <div className="container-fluid">
            <div className="row">
                <iframe title="Bidzen" className="map-contact"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d464.5379865223107!2d55.28109850974789!3d25.186086876696038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f683a83e528df%3A0xf9c17edb93ae3854!2sInner%20Circle%20Bay%20Business%20Center!5e0!3m2!1sen!2sae!4v1649397367195!5m2!1sen!2sae"
                    width="600" height="450" style={{border:0}} allowFullScreen="" loading="lazy" />
            </div>
        </div>
    </section>
    <section className="tf-section login-page contact-page pd-top-0">
        <div className="container">
            <div className="row jtf-content-center">
                <div className="col-md-8">
                    <div className="form-create-item-content">
                        <div className="form-create-item">
                            <div className="sc-heading">
                                <h3>Inquiry Form</h3>
                                {/* <p className="desc">Most popular gaming digital nft market place </p> */}
                            </div>
                            <form me id="create-item-1" onSubmit={handelSubmit}>
                                <input type="text" id="name" className="tb-my-input" name="inquiryUserName" value={formvalues.inquiryUserName} tabIndex="1"
                                    placeholder="Your Full Name" aria-required="true" required onChange={handelChange}/>
                                <input type="email" id="email" className="tb-my-input" name="inquiryUserEmail" tabIndex="2"
                                    placeholder="Email Address" aria-required="true" required value={formvalues.inquiryUserEmail} onChange={handelChange}/>
                                <input type="text" id="email" className="tb-my-input" name="inquiryUserNumber" tabIndex="2"
                                    placeholder="Contact Number" aria-required="true" required value={formvalues.inquiryUserNumber} onChange={handelChange}/>
                                {/* <select className="valid">
                                    <option value="1">Car</option>
                                    <option value="2">Memorabilia</option>
                                    <option value="3">NFT</option>
                                </select> */}
                                <textarea id="comment-message" name="inquiryBody" tabIndex="4"
                                    placeholder="Write Message" aria-required="true" value={formvalues.inquiryBody} onChange={handelChange}></textarea>
                                <button type="submit" id="comment-reply"
                                    className="sc-button style letter style-2"><span>Send Message</span> </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <Newsletters /> */}
    <Footer />
  </div>;
};

export default Contact;
