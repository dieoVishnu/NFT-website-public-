import React,{useState} from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import { useDispatch, useSelector } from 'react-redux'
import {ethers} from 'ethers'
import { useLocation } from 'react-router-dom'
import useCurrency from '../../customhook/useCurreny'
import { walletconnect } from '../../redux/metaWallet'
import useSingelpost from '../../customhook/useSingelpost'
import Pyment from './Pyment'

function Chekout() {

    const [paymetn,setPayment] = useState(false)

    let initialvalues = {
        id: "",
        first_name: "" ,
        list_name: "",
        list_price: "",
        list_id: "",
        list_location: "",
        list_contact: "" ,
        email: "" ,
        city: "",
        contry: "",
        limited_category: "Memorabilia",
        user: "",
        setPayment:setPayment
    }


    const [formvalues, setFormValues] = useState(initialvalues)

      // const [path,setPath] = useState()
      const location = useLocation()
      const path1 = location.pathname.split("/")[2]
      const path2 = location.pathname.split("/")[3]
      
  
    const imoodiniData = useSingelpost(path1,path2)
      // currency converter
    const {info:currency,currencysign,currencyData} = useCurrency()

    const handelChange = (e)=>{
        const {name,value} = e.target
        setFormValues({...formvalues,[name]:value})
        console.log(imoodiniData.data)
    }

     // metamask wallet connect

    //  redux
    const dispatch = useDispatch();
    const metaWallet = useSelector(state => state.wallet.walletid);
    const user = useSelector(state => state.user.token)
     const handelMetamask = async (e)=>{
        e.preventDefault()
            try {
                if(!window.ethereum)
                    throw new Error('metmask not found..');
                const result = await window.ethereum.request({method: 'eth_requestAccounts'})
                if (result){
                    dispatch(walletconnect(result[0]))
                    alert(result)
                }
            } catch (error) {
                console.log('error mettamask', error)
            }
        
    }

    const handelwallettransfer =  (e)=>{
        e.preventDefault()
        const transfer = async (val)=>{
            try {
                if(!window.ethereum)
                    throw new Error('metmask not found..');
                const tx = await window.ethereum.request({
                    method: 'eth_sendTransaction',
                    params:[
                        {
                            from: metaWallet,
                            to: '0xf80CCa0450F5026FE105349B2E8Fe4F5Fe1B9190',
                            value: val,
                            gasPrice: '0x09184e72a000',
                            gas: '0x2710',
                        },
                    ],
                })
                if (tx)
                    console.log(tx)
            } catch (error) {
                console.log(error)
            }
        }
        const priceToEth = ()=>{
            const eth = Number(imoodiniData.data.ad_price * currency[currencyData]).toLocaleString()
            const result  = ethers.utils.parseEther(eth)
            // console.log(result, metaWallet)
            transfer(result._hex)
        }
        priceToEth()
        

    }

    const handelSubmit = (e)=>{
        e.preventDefault()
        setFormValues({...formvalues,
            ['list_price']:imoodiniData.data.ad_price,
            ['list_name']: imoodiniData.data.ad_title,
            ['id']: imoodiniData.data.ad_id,
            ['userid']: user.usersid
        })
        setPayment(!paymetn)

    }
  return (
    <div>
        <Header />
        <section className={paymetn ? "active": ''}>
            <div className="container">
                
                <div className='hero-box'>
                    
                    <div className="row">
                        <div className="col">
                            <div className='p-5'>
                                <h4>Order Summary</h4>
                                <div className='box'>
                                    <div className="row pt-5">
                                        <div className="col">
                                            <h5>Product</h5>
                                        </div>
                                        <div className="col">
                                            <h5>price</h5>
                                        </div>
                                    </div>
                                    <div className="row pt-5">
                                        <div className="col"><h5>
                                        {imoodiniData && imoodiniData.data ?imoodiniData.data.ad_title : ""}
                                            </h5></div>
                                        <div className="col">
                                            <h6>{imoodiniData ? `$ ${imoodiniData.data.ad_price}`: ''}</h6>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col">Total</div>
                                        <div className="col"> <h5>{imoodiniData ? `$ ${imoodiniData.data.ad_price}`: ''}</h5></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className='p-5'>
                                <h4 className='p-3'>Shipping Address</h4>
                            {/* form */}
                            <form id="create-item-1" acceptCharset="utf-8" onSubmit={handelSubmit}>
                            <div className="input-group">
                                    <input name="first_name" required onChange={handelChange} value={formvalues.first_name} type="text" placeholder="First Name" />
                                    <input name="list_name" onChange={handelChange} value={formvalues.list_name} type="text" placeholder="Last Name" required />
                                </div>
                                <div className="input-group">
                                    <input name="email" onChange={handelChange} value={formvalues.email} className="m-0" type="email" placeholder="Email" required />
                                </div>
                                <div className="input-group">
                                    <input name="list_location" onChange={handelChange} value={formvalues.list_location} className="m-0" type="text" placeholder="Address" required />
                                </div>
                                <div className="input-group">
                                    <input name="city" onChange={handelChange} value={formvalues.city} type="text" placeholder="City" required />
                                    <input name="contry" onChange={handelChange} value={formvalues.contry} type="text" placeholder="Emirate" required />
                                </div>
                                <div className="input-group">
                                    <input name="list_contact" onChange={handelChange} value={formvalues.list_contact} className="m-0" type="phone" placeholder="Contact Number" required />
                                </div>
                                
                                <div className="input-group style-2 ">
                                   
                                </div>
                                <button name="submit" type="submit" id="submit"
                                    className="sc-button style letter style-2"><span>Continue to Payment</span> </button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {paymetn ? (
                    <Pyment data={formvalues} />
                    ) : ("")}
            </div>
        </section>
       

        <Footer />
    </div>
  )
}

export default Chekout