import React from 'react';
import { Link } from 'react-router-dom'

const Rareitem = props => {
    const data = props.data;
    return (

        <div className="category-inner">
            <div className='bg-section'>
                <img className='bg-section-inside' src="https://picsum.photos/1030/453" alt="" />

                <div className='flex jtf-content-center sc-product-item'>
                    <div className="product-img">
                        <img src='https://picsum.photos/300/353' alt="Bidzen" />
                        <Link to="/connect-wallet"
                            className="sc-button style letter"><span>Buy</span></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rareitem;
