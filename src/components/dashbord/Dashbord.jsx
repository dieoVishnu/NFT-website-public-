import react from "react";
import TopBar from "../header/TopBar";
import { Link,Outlet } from "react-router-dom";
import Topdash from "./dashTop/Topdash";

const Dashbord = ()=>{

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
            path: "create-item"

        },
        {
            name: "favorites",
            path: "create-item"

        },
    ]

    return <div>
        <Topdash />
        <section className="dashbord">
            <div className="container-fluid">
                <div className="row">
                    {/* nav-menu for dashboard */}
                    <div className="col-md-2 dash-nav-head p-0">
                       <div className="dash-heading">
                           <h4>Imoodini</h4>
                       </div>
                       <div className="dash-nav">
                           <ul>
                               {nav.map((e,index)=>(
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