import React,{useState} from 'react'
import axios from "../../../assets/axios";
function Addlimited(props) {

    const initialData = props.data
     // loading
     const [loading, setLoading] = useState(false)
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
     if (initialData !==null && initialData !== undefined){
        initialvalues = {
            imgfile: "",
            uploadPhoto: "4" ,
            list_title: initialData.ad_title ,
            list_price: initialData.ad_price,
            list_location: initialData.adlocation,
            list_contact: initialData.ad_price ,
            list_details: initialData.ad_details ,
            limited_age: initialData.adyear,
            limited_condition: initialData.adcondition,
            limited_category: "Memorabilia"
            
        }
     }

     const [formvalues, setFormValues] = useState(initialvalues)
 
     const handelChange = (e)=>{
         const {name,value} = e.target
         setFormValues({...formvalues,[name]:value})
         console.log(formvalues)
     }
     const handelUpload = (e)=>{
         const {name,files} = e.target
         setFormValues({...formvalues,[name]:files})
     }
     const handelSubmit = (e)=>{
         e.preventDefault()
         setLoading(true)
 
         const formData = new FormData();
 
 
         for (let i = 0; i < formvalues.imgfile.length; i++) {
             formData.append("upload[]", formvalues.imgfile[i]);
        }
         formData.append("list_title",formvalues.list_title);
         formData.append("upload",formvalues.imgfile);
         formData.append("uploadPhoto",formvalues.uploadPhoto);
         formData.append("list_price",formvalues.list_price);
         formData.append("list_location",formvalues.list_location);
         formData.append("list_contact",formvalues.list_contact);
         formData.append("list_details",formvalues.list_details);
         formData.append("limited_age",formvalues.limited_age);
         formData.append("limited_condition",formvalues.limited_condition);
         formData.append("limited_category",formvalues.limited_category);
 
         const PostLogin = async () => {
             try {
                 const res = await axios({
                     method: "post",
                     url: "imi_api/carproductadd",
                     data: formData,
                     headers: { "Content-Type": "multipart/form-data" },
                   
                 })
                 if (res.data.data === null || res.data.data === "null") {
                     // dispatch(loginFaild(res.data.data))
                     console.log('faild')
                 }
                 else {
                     // dispatch(loginSuccess(res.data.data))
                     console.log(res)
                     setLoading(false)
                     // console.log(formData)
                     // res.data && window.location.replace('/')
                 }
 
             }
             catch (error) {
                 console.log('this is error', error)
             }
         }
         PostLogin()
     }
  return (
    <div>
        <section>
            <div className="container">
            <div className="row">
                <div className="col-md-12">
                <div className="form-create-item-content justify-content-center p-5">
                        <div className="form-create-item">
                            <form id="create-item-1" onSubmit={handelSubmit} acceptCharset="utf-8">

                                <label className="uploadFile">
                                    <span className="filename">Choose photos</span>
                                    <input onChange={handelUpload} type="file" multiple className="inputfile form-control" name="imgfile" />
                                    <span className="icon"><i className="far fa-cloud-upload"></i></span>
                                </label>

                                <div className="input-group">
                                    <input name="list_title" onChange={handelChange} value={formvalues.list_title} className="m-0" type="text" placeholder="Item Name" required />
                                </div>
                                <div className="input-group">
                                    <input name="list_price" onChange={handelChange} value={formvalues.list_price} type="text" placeholder="price" required />
                                    <input name="list_location" onChange={handelChange} value={formvalues.list_location} type="text" placeholder="Location" required />
                                </div>
                                
                                <div className="input-group">
                                <select onChange={handelChange} value={formvalues.limited_age} className="form-control custom-select rounded-0 mr-4 mb-0" id="exampleFormControlSelect1" name="limited_age" required>
                                <option>Age</option>
                                        <option value="Brand New">Brand New</option>
                                        <option value="0-1 month">0-1 month</option>
                                        <option value="1-6 months">1-6 months</option>
                                        <option value="6-12 months">6-12 months</option>
                                        <option value="1-2 years">1-2 years</option>
                                        <option value="2-5 years">2-5 years</option>
                                        <option value="5-10 years">5-10 years</option>
                                        <option value="10+ years">10+ years</option>
                                    </select>
                                    <select onChange={handelChange} value={formvalues.limited_condition} className="form-control custom-select rounded-0 mb-0" id="exampleFormControlSelect1" name="limited_condition" required>
                                    <option value="Perfect">Perfect</option>
                                        <option value="Slightly used">Slightly used</option>
                                        <option value="Above average wear and tear">Above average wear and tear</option>
                                    </select>
                                   
                                </div>
                               
                                <textarea onChange={handelChange} value={formvalues.list_details} id="comment-message" name="list_details" tabIndex="4"
                                    placeholder="Description" aria-required="true"></textarea>
                                <div className="input-group style-2 ">
                                    <div className="btn-check">
                                        <input type="radio" id="sale" name="fav_language" />
                                        <label htmlFor="sale">Put On Sale</label>
                                    </div>
                                    <div className="btn-check">
                                        <input type="radio" id="price" name="fav_language" />
                                        <label htmlFor="price">
                                            Instant Sale Price
                                        </label>
                                    </div>
                                    <div className="btn-check">
                                        <input type="radio" id="purchase" name="fav_language" />
                                        <label htmlFor="purchase">
                                            Unlock Purchased
                                        </label>
                                    </div>
                                </div>
                                <button name="submit" type="submit" id="submit"
                                    className="sc-button style letter style-2"><span>Create Item</span> </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
            {loading ? (
                <>
                loading
                </>
            ):(
                <>
                </>
            )}
            </div>
        </section>
        


    </div>
  )
}

export default Addlimited