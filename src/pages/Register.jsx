import React,{useState} from 'react';
import { Link } from 'react-router-dom'
import Header from '../components/header/Header';
import Newsletters from '../components/layouts/Newsletters';
import Footer from '../components/footer/Footer';
import axios from '../assets/axios';
import img from '../assets/images/background/img-register.jpg'
import { useDispatch } from "react-redux";
import { loginFaild, loginSuccess } from '../redux/auth';

const Register = () => {

    const dispatch = useDispatch()
    const initialvalues = {
        email: "" ,
        firstName: "",
        lastName: "",
        givenName: "" ,
        googleId: "" ,
        imageUrl: "" ,
        password1: "",
        password2: "",
        name: "",
    }
    const [formvalues, setFormValues] = useState(initialvalues)
    // password error check
    const [PassErrorCheck,setPassErrorCheck] = useState()
    
    const handelChange = (e)=>{
        const {name,value} = e.target
        setFormValues({...formvalues,[name]:value})
        // console.log(formvalues)
    }
    const handelSubmit = (e)=>{
        e.preventDefault()
            const passWordValidation = ()=>{
                if(formvalues.password1 === formvalues.password2){
            
                    const uppercaseRegExp   = /(?=.*?[A-Z])/;
                    const lowercaseRegExp   = /(?=.*?[a-z])/;
                    const digitsRegExp      = /(?=.*?[0-9])/;
                    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
                    const minLengthRegExp   = /.{8,}/;

                    const uppercasePassword =   uppercaseRegExp.test(formvalues.password1);
                    const lowercasePassword =   lowercaseRegExp.test(formvalues.password1);
                    const digitsPassword =      digitsRegExp.test(formvalues.password1);
                    const specialCharPassword = specialCharRegExp.test(formvalues.password1);
                    const minLengthPassword =   minLengthRegExp.test(formvalues.password1);
                    let errMsg ="";
                    if(formvalues.password1===0){
                            errMsg="Password is empty";
                    }else if(!uppercasePassword){
                            errMsg="At least one Uppercase";
                    }else if(!lowercasePassword){
                            errMsg="At least one Lowercase";
                    }else if(!digitsPassword){
                            errMsg="At least one digit";
                    }else if(!specialCharPassword){
                            errMsg="At least one Special Characters";
                    }else if(!minLengthPassword){
                            errMsg="At least minumum 8 characters";
                    }else{
                        errMsg="";
                    }
                    setPassErrorCheck(errMsg);
                    return true;
                    
                }else{
                    setPassErrorCheck("Confirm password is not matched");
                    return false;
                }
            }
            passWordValidation()

            if(PassErrorCheck === ''){
                console.log('post requset')
                const PostLogin = async () => {
                    try {
                        const res = await axios.post('imi_api/gooleAuth/signup', {
                            familyName:formvalues.givenName,
                            givenName:formvalues.givenName,
                            passph:formvalues.password1,
                            email:formvalues.email
                          
                        })
                        console.log(res.data.email)
                        if (res.data.data === null || res.data.data === "null") {
                            // dispatch(loginFaild(res.data.data))
                            console.log('faild')
                        }
                        else if(res.data.email === true){
                            setPassErrorCheck("Email already exist")
                            
                        }
                        else {
                            dispatch(loginSuccess(res.data))
                            console.log(res,"this else")
                            res.data && window.location.replace('/')
                        }
        
                    }
                    catch (error) {
                        console.log('this is error', error)
                    }
                }
                PostLogin()
            }




    }


    

    return <div>
        <Header />
        <section className="fl-page-title">
            <div className="overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        {/* <div className="page-title-inner flex">
                            <div className="page-title-heading">
                                <h2 className="heading">Register</h2>
                            </div>
                            <div className="breadcrumbs">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li>Register</li>
                                </ul>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>

        <section className="tf-section login-page register-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="form-create-item-content">
                            <div className="form-create-item">
                                <div className="sc-heading">
                                    <h3>Create An Account</h3>
                                </div>
                                <form id="create-item-1" onSubmit={handelSubmit}>
                                    <div className="input-group">
                                        <input name="firstName" type="text" placeholder="First Name"
                                            required value={formvalues.firstName} onChange={handelChange}/>
                                        <input name="lastName" type="text" placeholder="Last Name" value={formvalues.lastName} required onChange={handelChange} />
                                    </div>
                                    <div className="input-group">
                                        <input name="phone" type="text" placeholder="Phone Number"
                                            required />
                                        <input name="givenName" type="text" placeholder="User Name" value={formvalues.givenName} required onChange={handelChange} />
                                    </div>
                                    <input name="email" type="email" placeholder="Email Address" value={formvalues.email}
                                        required onChange={handelChange}/>
                                    <div className="input-group">
                                        <input name="password1" type="password" placeholder="Password" value={formvalues.password1}
                                            required onChange={handelChange}/>
                                        <input name="password2" type="password" placeholder="Re-Password" value={formvalues.password2}
                                            required onChange={handelChange}/>
                                        
                                    </div>

                                    <div>
                                        <p className='ml-5' style={{color:"orange"}}>{PassErrorCheck}</p>
                                    </div>
                                    <div className="input-group style-2 ">
                                        <div className="btn-check">
                                            <input type="radio" id="html" name="fav_language" className="mg-bt-0"
                                                value="HTML" />
                                            <label htmlFor="html">agree</label>
                                        </div>
                                    </div>
                                    <button name="submit" type="submit"
                                        className="sc-button style letter style-2"><span>Register Now</span> </button>
                                </form>
                                <div className="other-login flex justify-content-center">
                                    <div className="text">Or</div>
                                    <button className='m-5 sc-button style letter style-2'>
                                        <Link to="/login" >Log In</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </div>;
};

export default Register;
