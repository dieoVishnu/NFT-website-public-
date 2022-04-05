import React from 'react';
import { Link } from 'react-router-dom'
import Rareitem from '../item/Rareitem';

const Rareitems = props => {
    const data = props.data;
    return (
        <section className="tf-category tf-section">
            <Rareitem data={data} />
            <Rareitem data={data} />
            <Rareitem data={data} />
        </section>
    );
};

export default Rareitems;
