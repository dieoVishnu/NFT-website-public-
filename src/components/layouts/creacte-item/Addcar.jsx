import React,{useState,useEffect} from "react";
import axios from "../../../assets/axios";
import { useSelector } from "react-redux";

const Addcar = (props)=>{

    // user
    const user = useSelector(state => state.user.token)
    // loading
    const initialData = props.data
    const [loading, setLoading] = useState(false)
    let initialvalues = {
        postLink: "carproductadd",
        imgfile: "",
        uploadPhoto: "1" ,
        list_title: "" ,
        list_price: "",
        list_location: "",
        list_contact: "" ,
        list_details: "" ,
        car_make: "" ,
        car_year: "",
        car_kilometers: "",
        car_condition: "",
        car_transmission: "",
        car_color: "",
        car_bodytype: "",
        car_fueltype: "",
        car_specs: "",
        car_doors: "2",
    }
    
    if (initialData !==null && initialData !== undefined){
        initialvalues = {
        postLink: "updateproduct",
        imgfile: "",
        uploadPhoto: "1",
        list_title: initialData.ad_title,
        list_price: initialData.ad_price,
        list_location: initialData.adlocation,
        list_contact: initialData.ad_price ,
        list_details: initialData.ad_details ,
        car_make: initialData.ad_make,
        car_year: initialData.adyear,
        car_kilometers: initialData.ad_kms,
        car_condition: initialData.adcondition,
        car_transmission: initialData.ad_transmission,
        car_color: initialData.ad_color,
        car_bodytype: initialData.ad_cartype,
        car_fueltype: initialData.ad_fuel,
        car_specs: initialData.ad_dirve,
        car_doors: "2",
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
        formData.append("car_make",formvalues.car_make);
        formData.append("car_year",formvalues.car_year);
        formData.append("car_kilometers",formvalues.car_kilometers);
        formData.append("car_condition",formvalues.car_condition);
        formData.append("car_transmission",formvalues.car_transmission);
        formData.append("car_color",formvalues.car_color);
        formData.append("car_bodytype",formvalues.car_bodytype);
        formData.append("car_fueltype",formvalues.car_fueltype);
        formData.append("car_specs",formvalues.car_specs);
        formData.append("car_doors",formvalues.car_doors);
        formData.append("user",user.userID);


        const PostLogin = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: `imi_api/${formvalues.postLink}`,
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
    
    return <div>

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
                                    <input name="car_kilometers" onChange={handelChange} value={formvalues.car_kilometers} type="text" placeholder="killometer" required />
                                </div>
                                <div className="input-group">
                                
                                    <input name="car_make" onChange={handelChange} value={formvalues.car_make} type="text" placeholder="brand" required />
                                    <input name="list_location" onChange={handelChange} value={formvalues.list_location} type="text" placeholder="location" required />
                                </div>
                                <div className="input-group">
                                    
                                    <input name="car_year" onChange={handelChange} value={formvalues.car_year} type="year" placeholder="Year" required />
                                    <select onChange={handelChange}  value={formvalues.car_color} className="form-control custom-select rounded-0 mb-0" id="exampleFormControlSelect1" name="car_color" required>
                                        <option >Select a Color</option>
                                        <option value="Black">Black</option>
                                        <option value="Blue">Blue</option>
                                        <option value="Brown">Brown</option>
                                        <option value="Burgundy">Burgundy</option>
                                        <option value="Gold">Gold</option>
                                        <option value="Grey">Grey</option>
                                        <option value="Orange">Orange</option>
                                        <option value="Green">Green</option>
                                        <option value="Purple">Purple</option>
                                        <option value="Red">Red</option>
                                        <option value="Silver">Silver</option>
                                        <option value="Tan">Tan</option>
                                        <option value="Teal">Teal</option>
                                        <option value="White">White</option>
                                        <option value="Yellow">Yellow</option>
                                        <option value="Other Color">Other Color</option>
                                    </select>
                                    
                                </div>
                                <div className="input-group">
                                <select onChange={handelChange} value={formvalues.car_bodytype} className="form-control custom-select rounded-0 mr-4 mb-0" id="exampleFormControlSelect1" name="car_bodytype" required>
                                        <option value="">Body Type</option>
                                        <option value="Coupe">Coupe</option>
                                        <option value="Crossover">Crossover</option>
                                        <option value="Hard Top Convertible">Hard Top Convertible</option>
                                        <option value="Hatchback">Hatchback</option>
                                        <option value="Pick Up Truck">Pick Up Truck</option>
                                        <option value="Sedan">Sedan</option>
                                        <option value="Soft Top Convertible">Soft Top Convertible</option>
                                        <option value="Sports Car">Sports Car</option>
                                        <option value="SUV">SUV</option>
                                        <option value="Utility Truck">Utility Truck</option>
                                        <option value="Van">Van</option>
                                        <option value="Wagon">Wagon</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <select onChange={handelChange} value={formvalues.car_fueltype} className="form-control custom-select rounded-0 mb-0" id="exampleFormControlSelect1" name="car_fueltype" required>
                                        <option value="">Fuel Type</option>
                                        <option value="Gasoline">Gasoline</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Hybrid">Hybrid</option>
                                        <option value="Electric">Electric</option>
                                    </select>
                                   
                                </div>
                         
                                <div className="input-group">
                                    <select onChange={handelChange}  value={formvalues.car_condition}  className="form-control custom-select rounded-0 mr-4 mb-0" id="exampleFormControlSelect1" name="car_condition" required>
                                        <option value="">Select a Condition</option>
                                        <option value="Perfect">Perfect</option>
                                        <option value="Slightly used">Slightly used</option>
                                        <option value="Part out">Part out</option>
                                    </select>
                                    <select onChange={handelChange} value={formvalues.car_transmission} className="form-control custom-select rounded-0 mb-0" id="exampleFormControlSelect1" name="car_transmission" required>
                                        <option value="">Select Transmission</option>
                                        <option value="Manual">Manual Transmission</option>
                                        <option value="Automatic">Automatic Transmission</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                <select onChange={handelChange} value={formvalues.car_specs} className="form-control custom-select rounded-0 mr-4 mb-0" id="exampleFormControlSelect1" name="car_specs" required>
                                        <option  value="">Regional Specs</option>
                                        <option value="European">European Specs</option>
                                        <option value="GCC">GCC Specs</option>
                                        <option value="Japanese">Japanese Specs</option>
                                        <option value="North American">North American Specs</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <input onChange={handelChange} value={formvalues.list_contact} name="list_contact" type="text" placeholder="Contact" required />
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
}


export default Addcar