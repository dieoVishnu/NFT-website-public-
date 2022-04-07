import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
// import  Newsletters from '../components/layouts/Newsletters';
import  {Newsletters} from '../components/layouts/home/Newsletters';
import Footer from '../components/footer/Footer';
import axios from '../assets/axios';
import img1 from '../assets/images/background/img-login.jpg'
import {useDispatch} from "react-redux";
import { loginFaild, loginSuccess } from '../redux/auth';


const Login = () => {
    const [data, setData] = useState()
    const [email,setEmail] = useState()
    const [pass,setPass] = useState()
    const dispatch = useDispatch()

    const handeleFentch = async (e)=>{
        e.preventDefault()
        console.log("good",email,pass)
        try{
            const res = await axios.get('imi_api/portal-login',{
                params: {
                    email:email,login_pasp:pass
                }
               
            })
            if(res.data.data === null || res.data.data === "null"){
                dispatch(loginFaild(res.data.data))
                console.log('faild')
            }
            else{
                dispatch(loginSuccess(res.data.data))
                setData(res.data.data)
                console.log(res)
                res.data && window.location.replace('/')
            }
            
        }
        catch(error){
            console.log('this is error',error)
        }
    }

  return <div>
    <Header />
    <section className="fl-page-title">
        <div className="overlay"></div>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="page-title-inner flex">
                        <div className="page-title-heading">
                            <h2 className="heading">Log In</h2>
                        </div>
                        <div className="breadcrumbs">
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li>Log In</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="tf-section login-page">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="form-create-item-content">
                        <div className="form-create-item">
                            <div className="sc-heading">
                                <h3>Login Your Account</h3>
                                <p className="desc">Most popular gaming digital nft market place </p>
                            </div>
                            <form id="create-item-1" onSubmit={e=>handeleFentch(e)}>
                                <input name="user" type="text" placeholder="User Name/Email Address"
                                    required onChange={e=>setEmail(e.target.value)} />
                                <input name="number" type="password" placeholder="Password"
                                    required onChange={e=>setPass(e.target.value)} />
                                <div className="input-group style-2 ">
                                    <div className="btn-check">
                                        <input type="radio" id="html" name="fav_language" value="HTML" />
                                        <label htmlFor="html">Remember Me</label>
                                    </div>
                                </div>
                                <button name="submit" type="submit"
                                    className="sc-button style letter style-2" ><span>Sing In</span> </button>
                            </form>
                            <div className="other-login">
                                <div className="text">Or</div>
                                <div className="widget-social">
                                    <ul>
                                        <li><Link to="#" className="active"><i className="fab fa-facebook-f"></i></Link>
                                        </li>
                                        <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                                        <li><Link to="#"><i className="fab fa-google-plus-g"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="form-background">
                            <img src={img1} alt="Bidzen" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <Newsletters />
    <Footer />
  </div>;
};

export default Login;
