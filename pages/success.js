import Router, { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { API_URL } from '../utils/urls'

const useOrder = (session_id) =>{
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const fetchOrder = async () =>{
            setLoading(true)
            try{
                const res = await fetch(`${API_URL}/api/orders/confirm`,{
                    method: 'POST',
                    body: JSON.stringify({checkout_session: session_id}),
                    headers: {
                        'Content-type': 'application/json',
                    }
                })
                const data = await res.json()
                setOrder(data)
            }catch(err){
                setOrder(null)
            }
        }
        fetchOrder()
    },[session_id])

    return {order, loading}
}
export default function Success(){
    const router = useRouter()
    const {session_id} = router.query

    const {order, loading} = useOrder(session_id)
    return(
        <div>
            <Head>
                <title>Thank you for your purchase</title>
                <meta name='description' content="Thank you for your purchase"/>
            </Head>

            <h2>Success!</h2>
            {loading && <p>Loading</p>}
            {order && <p>Your order is confirmed, with order number: {order.data.id}</p>}
        </div>
    )
}