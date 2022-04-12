import React, { useRef, useState, useEffect } from 'react';
import TopBar from './TopBar';
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo/new-logo.png'
import logo2x from '../../assets/images/logo/new-logo.png'
import logolight from '../../assets/images/logo/new-logo.png'
import logolight2x from '../../assets/images/logo/new-logo.png'
import menus from "../../pages/menu"
import DarkMode from "./DarkMode"
import icon from '../../assets/images/icon/connect-wallet.svg'
import {useSelector,useDispatch} from "react-redux"
import { logOut } from '../../redux/auth'

const Header = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.token)
    const { pathname } = useLocation();
    const headerRef = useRef(null)
    
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });
    const isSticky = (e) => {
        const header = document.querySelector('.js-header');
        const scrollTop = window.scrollY;

        scrollTop >= 100 ? header.classList.add('is-fixed') : header.classList.remove('is-fixed');
        scrollTop >= 120 ? header.classList.add('is-small') : header.classList.remove('is-small');
    };

    const menuLeft = useRef(null)
    const btnToggle = useRef(null)

    const menuToggle = () => {
        menuLeft.current.classList.toggle('active');
        btnToggle.current.classList.toggle('active');
    }


    const [activeIndex, setActiveIndex] = useState(null);
    const handleOnClick = index => {
        setActiveIndex(index);
    };

    // logout
    const handelLogout = (e)=>{
        e.preventDefault()
        dispatch(logOut())
    }

    const userMenu =[
        {
            id: 1,
            name: 'SPORTS COLLECTION',
            tag: '2',
            namesub: [
                {
                    id: 1,
                    sub: 'Logout',
                    links: '/login'
                },
            ]
        },
    ]

    return <div>

        <TopBar />
        <header id="header_main" className="header_1 js-header" ref={headerRef}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="mobile-button" ref={btnToggle} onClick={menuToggle}><span></span></div>
                        <div id="site-header-inner" className="flex">
                            <div id="site-logo" className="clearfix">
                                <div id="site-logo-inner">
                                    <Link to="/" rel="home" className="main-logo">
                                        <img id="logo_header" className='logo-dark' src={logo} srcSet={logo2x} alt="nft-gaming" />
                                        <img id="logo_header" className='logo-light' src={logolight} srcSet={logolight2x} alt="nft-gaming" />
                                    </Link>
                                </div>
                            </div>
                            {/* <form className="form-search">
                                <input type="text" placeholder="Search here" />
                                <button><i className="far fa-search"></i></button>
                            </form> */}

                            <nav id="main-nav" className="main-nav" ref={menuLeft}>
                                <ul id="menu-primary-menu" className="menu">
                                    {
                                        menus.map((data, index) => (
                                            <li key={index} onClick={() => handleOnClick(index)} className={`menu-item menu-item-has-children ${activeIndex === index ? 'active' : ''} `}   >
                                                <Link to={`/blog/${data.tag}`} onClick={() => {window.location.href=`/blog/${data.tag}`}}>{data.name}</Link>
                                                {/* submenu */}
                                                {/* <ul className="sub-menu" >
                                                    {
                                                        data.namesub.map((submenu, index) => (
                                                            <li key={index} className={
                                                                pathname === submenu.links
                                                                    ? "menu-item current-item"
                                                                    : "menu-item"
                                                            }><Link to={submenu.links}>{submenu.sub}</Link></li>
                                                        ))
                                                    }
                                                </ul> */}
                                            </li>
                                        ))
                                    }
                                    
                                </ul>
                            </nav>
                            <div className="button-connect-wallet">
                                {user === 'null' || user === null ?
                                 <Link to="/login" className="sc-button wallet  style-2">
                                 <img src={icon} alt="icon" />
                                 <span>Log in</span>
                             </Link>
                                :
                                <div className='flex' id='center'>
                                {/* <div >
                                    <Link to="/login" className="sc-button wallet  style-2" onClick={e=>handelLogout(e)}>
                                    <img src={icon} alt="icon" />
                                    <span>Log out</span>
                                            </Link>
                                </div> */}
                                            

                                            <nav id="main-nav" className="main-nav" ref={menuLeft}>
                                <ul id="menu-primary-menu" className="menu">
                                    {
                                        userMenu.map((data, index) => (
                                            <li key={index} onClick={() => handleOnClick(index)} className={`menu-item menu-item-has-children ${activeIndex === index ? 'active' : ''} `}   >
                                                <Link to={`/blog/${data.tag}`} onClick={() => {window.location.href=`/blog/${data.tag}`}}><i className="fa fa-user"></i></Link>
                                                {/* submenu */}
                                                <ul className="sub-menu" >
                                                    {
                                                        data.namesub.map((submenu, index) => (
                                                            <li key={index} className={
                                                                pathname === submenu.links
                                                                    ? "menu-item current-item"
                                                                    : "menu-item"
                                                            }><Link to={submenu.links} onClick={e=>handelLogout(e)}>{submenu.sub}</Link></li>
                                                        ))
                                                    }
                                                </ul>
                                            </li>
                                        ))
                                    }
                                
                                    
                                </ul>
                            </nav>

                                            
                                </div>
                            
                                }
                               
                            </div>

                            <DarkMode />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>;
};

export default Header;
