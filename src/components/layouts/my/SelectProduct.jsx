import React, { useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom'


const SelectProduct = (props)=>{

    const { ref: myRef1, inView: fisrtElemnet } = useInView();

    useEffect(()=>{
        if(fisrtElemnet === true){
            props.data.setActive(true)
        }else{
            props.data.setActive(false)
        }

    },[fisrtElemnet])

    return <div>
        <section className="sc-card-blog bg-color">
            <div className="section-card-single">
                <div className="row">
                    <div ref={myRef1} className="col-md-6 p-0 sc-product-item">
                        <div className="section-card-single" >
                            <div className="selectItem-card1 product-img">
                                <div className="iterm">
                                <Link to="/blog/1"
                                    className="selectitem-text"><span>shop <br />classic <br /> cars </span></Link>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 sc-product-item p-0">
                        <div className="section-card-single">
                             <div className="selectItem-card2  product-img">
                                <div className="iterm">
                                <Link to="/blog/2"
                                    className="selectitem-text"><span>shop <br /> sports <br /> collection</span></Link>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
}

export default SelectProduct