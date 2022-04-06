import React from 'react';
import MetaTags from 'react-meta-tags';


const Test = ()=>{

    return(
        <>
        <MetaTags>
            <title>Page 3</title>
            <meta name="description" content="Some description." />
            <meta property="og:title" content="MyApp" />
            <meta property="og:image" content="path/to/image.jpg" />
        </MetaTags>

        <h1>this is teset</h1>
        </>
    )
}

export default Test