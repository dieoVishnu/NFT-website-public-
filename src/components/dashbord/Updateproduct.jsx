import React from 'react'
import { useLocation } from 'react-router-dom'
import useSingelpost from '../../customhook/useSingelpost'
import Addcar from '../layouts/creacte-item/Addcar'
import Addlimited from '../layouts/creacte-item/Addlimited'
import Newfrom from '../layouts/creacte-item/Newfrom'

function Updateproduct() {

    const location = useLocation()
    const path1 = location.pathname.split("/")[3]
    const path2 = location.pathname.split("/")[4]
    
    const imoodiniData = useSingelpost(path1,path2)

    console.log(imoodiniData)


  return (
    <div>
        {imoodiniData ? (
            <>
            {path2 === 'Limited' ? (
                <Addlimited data={imoodiniData.data}/>
                
                ): (
                <Addcar data={imoodiniData.data}/>
            )}
            </>
        ) : (
            <>
            </>
        )}
    </div>
  )
}

export default Updateproduct