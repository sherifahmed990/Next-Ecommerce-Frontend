import { useContext } from 'react'
import Router, { useRouter } from 'next/router'
import styles from '../styles/BuyButton.module.css'
import AuthContext from '../context/AuthContext'
import {loadStripe} from '@stripe/stripe-js'
import {STRIPE_PK, API_URL} from '../utils/urls'

const stripePromise = loadStripe(STRIPE_PK)

export default function BuyButton({product}) {
   
    const {user, getToken} = useContext(AuthContext)
    const router = useRouter()

    const redirectToLogin = () =>{
        router.push('/login')
    }

    const handleBuy = async () =>{
        const stripe = await stripePromise
        const token = await getToken()
        console.log(product)
                
        const res = await fetch(`${API_URL}/api/orders`,{
            method: 'POST',
            body: JSON.stringify({product}),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const session = await res.json()

        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        })
    }

    return (
        <>
        {!user &&
            <button className={styles.buy}
                    onClick={redirectToLogin}>
                Login to Buy
            </button>
        }
        {user&&
        <button className={styles.buy}
            onClick={handleBuy}>
            Buy
        </button>
        }
        </>
    )
}