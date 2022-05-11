import React,{useRef,useEffect} from 'react'
import { Tab,Row,Col,Nav } from 'react-bootstrap';

function Pyment(props) {
    const productDetails = props.data
    const paypal = useRef();

    const handelSubmit = (e)=>{
        e.preventDefault()
        window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: productDetails.list_name,
                amount: {
                  currency_code: "USD",
                  value: 10,
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
                    <button>close</button>
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