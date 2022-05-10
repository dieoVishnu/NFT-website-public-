import React,{useState} from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'

function Chekout() {

    let initialvalues = {
        imgfile: "",
        uploadPhoto: "4" ,
        list_title: "" ,
        list_price: "",
        list_location: "",
        list_contact: "" ,
        list_details: "" ,
        limited_age: "",
        limited_condition: "",
        limited_category: "Memorabilia"
        
    }
    const [formvalues, setFormValues] = useState(initialvalues)

    const handelChange = (e)=>{
        const {name,value} = e.target
        setFormValues({...formvalues,[name]:value})
        console.log(formvalues)
    }
  return (
    <div>
        <Header />
        <section>
            <div className="container">
                <div className='hero-box'>
                    <div className="row">
                        <div className="col">
                            <div className='p-5'>
                                <h4>Order Summary</h4>
                                <div className='box'>
                                    <div className="row">
                                        <div className="col">Product</div>
                                        <div className="col">price</div>
                                    </div>
                                    <div className="row">
                                        <div className="col">Product</div>
                                        <div className="col">price</div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className='p-5'>
                                <h4 className='p-3'>Shipping Address</h4>
                            {/* form */}
                            <form id="create-item-1" acceptCharset="utf-8">
                            <div className="input-group">
                                    <input name="list_price" onChange={handelChange} value={formvalues.list_price} type="text" placeholder="First Name" required />
                                    <input name="list_location" onChange={handelChange} value={formvalues.list_location} type="text" placeholder="Last Name" required />
                                </div>
                                <div className="input-group">
                                    <input name="list_title" onChange={handelChange} value={formvalues.list_title} className="m-0" type="text" placeholder="Email" required />
                                </div>
                                <div className="input-group">
                                    <input name="list_title" onChange={handelChange} value={formvalues.list_title} className="m-0" type="text" placeholder="Address" required />
                                </div>
                                <div className="input-group">
                                    <input name="list_price" onChange={handelChange} value={formvalues.list_price} type="text" placeholder="City" required />
                                    <input name="list_location" onChange={handelChange} value={formvalues.list_location} type="text" placeholder="Emirate" required />
                                </div>
                                <div className="input-group">
                                    <input name="list_title" onChange={handelChange} value={formvalues.list_title} className="m-0" type="text" placeholder="Contact Number" required />
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
        </section>

        <Footer />
    </div>
  )
}

export default Chekout