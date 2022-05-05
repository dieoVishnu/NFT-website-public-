import React, { useEffect, useState } from 'react'
import axios from '../../assets/axios';

function Userlisting() {


    const [data, setData] = useState()

    useEffect(() => {

        const handeleFentch = async (e) => {

            const formData = new FormData();
            formData.append("user", '2b18c09c335593d61deccef115784d5c')
            try {
                const res = await axios({
                    method: "post",
                    url: "imi_api/userposts",
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },

                })
                setData(res.data.data)
                console.log(res.data.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        handeleFentch()

    }, [])


    return (
        <div>
            <div className="container">
                <div className='product-section'>
                    <table id="productlist">
                        <tr>
                            <th>title</th>
                            <th>category</th>
                            <th>status</th>
                        </tr>
                        {data && data.map((e, index) => (
                            <tr key={index}>
                                <td>
                                    <img src={e.ad_cover_image} alt="a" />
                                    {e.ad_title}
                                </td>
                                <td>{e.ad_category}</td>
                                <td>{e.ad_verified === '0' ? 'deactive' : 'Active'}</td>
                            </tr>
                        ))}

                    </table>
                </div>
            </div>
        </div >
    )
}

export default Userlisting