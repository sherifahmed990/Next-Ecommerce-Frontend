import Head from 'next/head'
import {useContext, useState, useEffect} from 'react'
import Link from 'next/link'
import AuthContext from '../context/AuthContext'
import { API_URL } from '../utils/urls'

const useOrders = (user, getToken) => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(()=>{
        const fetchOrders = async () =>{
            if(user){
                try{
                    setLoading(true)
                    const token = await getToken()
                    const order_res = await fetch(`${API_URL}/api/orders/`,{
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })

                    const data = await order_res.json()
                    setOrders(data.data)
                }catch (err){
                    setOrders([])
                }
                setLoading(false)
            }
        }
        fetchOrders()
    }, [user])
    return {orders, loading}
}
export default function Account(){

    const {user, logoutUser, getToken} = useContext(AuthContext)

    const {orders, loading} = useOrders(user, getToken)

    if(!user){
        return(
            <div>
                <p>Please login or register</p>
                <Link href="/"><a>Go Back</a></Link>
            </div>
        )
    }
    return(
        <div>
            <Head>
                <tile>Account Page</tile>
                <meta name="description" content="The account page, view your order" />
            </Head>
            <h2>Account page</h2>
            <h3>Your Orders</h3>
            {loading && <p>Loading .........</p>}
            {orders.map(order =>(
                <div key={order.id}>
                     {new Date(order.attributes.createdAt).toLocaleDateString('en-EN')} {order.attributes.product.data.attributes.name} ${order.attributes.total} {order.attributes.status}
                </div>
            ))}
            <hr/>
            <p>Logged in as: {user.data.email}</p>
            <a href="#" onClick={logoutUser}>Logout</a>
        </div>
    )
}