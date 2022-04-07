// import axios from "axios"
import axios from "../assets/axios"
import { useState,useEffect } from "react"

const useSingelpost = (id,category)=>{

    const [data, setData] = useState(false)
  
    useEffect(()=>{

    const handeleFentch = async (e)=>{
        let catid 
        if (category == 'Limited'){
             catid = 2
        }else {
             catid = 1
        }
        try{
            const res = await axios.get('/imi_api/getPost',{
                params: {
                    product_id:id,
                    category_id:catid,
                }
            })
            setData(res.data)
        }
        catch(error){
            console.log(error,"single post error")
        }
    }
    handeleFentch()

},[id,category])
    return data
    

}

export default useSingelpost 