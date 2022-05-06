import React from 'react'
import { FaCarAlt } from 'react-icons/fa';
import { GiBasketballJersey } from 'react-icons/gi';
import {Link} from 'react-router-dom';

function Selectitem() {
    return (
            <div className='hero' >
        <div className='container' >
                <div className="row">
                    <div className="col">
                    <Link to="/dash/car">
                        <div className="card-1">
                            <FaCarAlt size={'5rem'}/>
                            <h3>Car</h3>
                        </div>
                    </Link>
                    </div>
                    <div className="col">
                        <Link to="/dash/limited">
                        <div className="card-1">
                            <div className='flex justify-content-center'>
                            <GiBasketballJersey size={'5rem'}/>
                            </div>
                            <h3>Memorabilia</h3>
                        </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Selectitem