import React, { useRef } from "react";
import TopBar from "../header/TopBar";
import { Link, Outlet } from "react-router-dom";
import Topdash from "./dashTop/Topdash";
import { useSelector } from "react-redux"

const Dashbord = () => {

    const user = useSelector(state => state.user.token)

    const menuLeft = useRef(null)
    const btnToggle = useRef(null)

    const menuToggle = () => {
        menuLeft.current.classList.toggle('active');
        btnToggle.current.classList.toggle('active');
    }

    const nav = [
        {
            name: "dashbord",
            path: ""

        },
        {
            name: "add post",
            path: "addpost"

        },
        {
            name: "my listings",
            path: "mylisting"

        },
        {
            name: "favorites",
            path: "create-item"

        },
    ]

    return <div>
        {/* <Topdash /> */}
        <div className='dash-top'>
            <div className='dash-nav-top'>
                <div className="mobile-button" ref={btnToggle} onClick={menuToggle}><span></span></div>
                <div>
                    <p>{user.user_Name}</p>
                </div>
            </div>
        </div>
        <section className="dashbord">
            <div className="container-fluid">
                <div className="row">
                    {/* nav-menu for dashboard */}
                    <div className="col-md-2 dash-nav-head p-0" ref={menuLeft}>
                        <div className="dash-heading">
                            <h4><Link to="/">Imoodini</Link></h4>
                        </div>
                        <div className="dash-nav">
                            <ul>
                                {nav.map((e, index) => (
                                    <li key={index}>
                                        <Link to={e.path}>{e.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* dash main */}
                    <div className="col dash-main">
                        <Outlet />
                    </div>
                </div>
            </div>
        </section>
    </div>

}

export default Dashbord