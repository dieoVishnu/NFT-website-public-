import {useState, useEffect} from 'react'
import axios from 'axios'


const useCurrency = ()=>{

    const from = 'usd';
    const currencyData = JSON.parse(localStorage.getItem("currency"))
    const [info, setInfo] = useState()
    const [ currencysign, setCurrencysign] = useState()

    useEffect(()=>{

        const handelFentch  = async ()=>{
            try {
                const res = await axios.get(
                    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
                )
                setInfo(res.data[from])
            }
            catch (error) {
                console.log(error)
            }
        }

        handelFentch()

    },[])

    useEffect(()=>{

        const handelCurrencyCHange = ()=>{
            if(currencyData === 'usd'){
                setCurrencysign('$')
            }
            if(currencyData === 'aed'){
                setCurrencysign('AED')
            }
            if(currencyData === 'eur'){
                setCurrencysign('EUR')
            }
            if(currencyData === 'btc'){
                setCurrencysign('BTC')
            }
            if(currencyData === 'eth'){
                setCurrencysign('ETH')
            }
            if(currencyData === 'ftm'){
                setCurrencysign('FTM')
            }
            
        }
        handelCurrencyCHange()
    },[currencyData])

    return {info:info, currencysign:currencysign,currencyData:currencyData};
    
}

export default useCurrency;