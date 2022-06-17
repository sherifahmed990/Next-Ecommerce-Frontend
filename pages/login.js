import Head from 'next/head'
import {useContext, useState} from 'react'
import AuthContext from '../context/AuthContext'
import styles from '../styles/Login.module.css'

export default function Login() {

    const [email ,setEmail ] = useState("")
    const [password ,setPassword ] = useState("")
    const {loginUser} = useContext(AuthContext)

    const handleSubmit = (event) =>{
        event.preventDefault()
        loginUser(email, password)
    }
    return(
        <div>
            <Head>
                <tile>Loginn</tile>
                <meta name="description" content="Login here to make a purchase" />
            </Head>
            <h2>Loginn</h2>
            <form onSubmit={handleSubmit}>
                <input className={styles.input}
                type="email" value={email} 
                onChange={(event)=>setEmail(event.target.value)}
                placeholder="Email Address"
                />
                <input className={styles.input}
                type="password" value={password} 
                onChange={(event)=>setPassword(event.target.value)}
                placeholder="Password"
                />
                <button type="submit" className={styles.button}>
                    Login
                </button>
            </form>
        </div>
    )
}