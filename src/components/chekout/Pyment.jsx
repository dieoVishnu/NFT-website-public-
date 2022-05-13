import React,{useRef,useEffect} from 'react'
import { Tab,Row,Col,Nav } from 'react-bootstrap';
import axios from '../../assets/axios';

function Pyment(props) {
    const productDetails = props.data
    const paypal = useRef();

    const handelSubmit = (e)=>{
        e.preventDefault()
        window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            application_context: {
              shipping_preferences: '"NO_SHIPPING"', //Just add this and it will take the address
            },
            intent: "CAPTURE",
            purchase_units: [
              {
                description: productDetails.list_name,
                amount: {
                  currency_code: "USD",
                  value: "10",
                },
              },
              
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log("apoorve payment done",order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
      

    }

    const onSucess = async(e)=>{
      e.preventDefault()
      const formData = new FormData();
      formData.append("user",productDetails.userid);
      formData.append("price",productDetails.list_price);
      formData.append("items",productDetails.id);
      formData.append("status","200");
      formData.append("itemData[]",productDetails);
      formData.append("name",productDetails.first_name);
      formData.append("contact",productDetails.list_contact);
      formData.append("email",productDetails.email);
      formData.append("location",productDetails.list_location);
      formData.append("city",productDetails.city);
      formData.append("contry",productDetails.contry);
    //   for (let i = 0; i < formvalues.imgfile.length; i++) {
    //     formData.append("upload[]", formvalues.imgfile[i]);
    // }
      try {
        const res = await axios({
            method: "post",
            url: 'imi_api/checkout/che',
            data: formData,
            headers: { "Content-Type": "form-data" },
          
        })
        if (res.data.data === null || res.data.data === "null") {
            // dispatch(loginFaild(res.data.data))
            console.log('faild')
        }
        else {
            // setData(res.data.data)
            console.log(res)
            // res.data && window.location.replace('/')
        }

    }
    catch (error) {
        console.log('this is error', error)
    }
    }
    
  return (
    <div className="paym">
         <h4 className='pl-4'>Payment Method</h4>
        <div className='p-4'>
        
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
            <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                <Nav.Item>
                    <Nav.Link eventKey="first" className='pay-link' onClick={e=>paypal.current.removeChild(paypal.current.children[0])}>
                        <div className='box-small'>
                            <img src="/assets/images/bg-page-title.png" alt="visa" />
                        </div>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="second" onClick={e=>handelSubmit(e)}>
                    <div className='box-small'>
                            <img src="/assets/images/paypal_PNG13.png" alt="visa" />
                        </div>
                    </Nav.Link>
                </Nav.Item>
                </Nav>
            </Col>
            <Col sm={9}>
                <Tab.Content>
                <Tab.Pane eventKey="first">
                <div>
                    hellow
                    <button onClick={e=>onSucess(e)} >close</button>
                </div>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                <div>
                    <div ref={paypal}>

                    </div>
                </div>
                </Tab.Pane>
                </Tab.Content>
            </Col>
            </Row>
        </Tab.Container>
        </div>     
    </div>
  )
}

export default Pyment