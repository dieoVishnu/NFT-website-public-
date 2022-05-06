import React, { useEffect, useState } from 'react'
import axios from '../../assets/axios';
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux"

function Userlisting() {


    const user = useSelector(state => state.user.token)

    const [data, setData] = useState()

    useEffect(() => {

        const handeleFentch = async () => {
            
            const formData = new FormData();
            formData.append("user", user.user_ID)
            try {
                const res = await axios({
                    method: "post",
                    url: "imi_api/userposts",
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },

                })
                setData(res.data.data)
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
                        <tbody>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                        </tr>
                        {data && data.map((e, index) => (
                            <tr key={index}>
                                <td> <img src={e.ad_cover_image} alt="a" /></td>
                                <td>
                                    {e.ad_title}
                                </td>
                                <td>{e.ad_category}</td>
                                <td>
                                    <div>
                                    {e.ad_verified === '0' ? 'deactive' : 'Active'}
                                    </div>
                                    <Link to={`${e.ad_slug}/${e.ad_category}` }>edit</Link>
                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default Userlisting