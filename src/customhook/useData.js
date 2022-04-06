// import axios from "axios"
import axios from "../assets/axios"
import { useState,useEffect } from "react"

const useData = ()=>{

    const [data, setData] = useState([])
  
    useEffect(()=>{

    const handeleFentch = async (e)=>{
        try{
            const res = await axios.get('/imi_api/listPosts?category=0')
            setData(res.data.data)
        }
        catch(error){
            console.log(error)
        }
    }
    handeleFentch()

},[])
    return data
    

}

export default useData 