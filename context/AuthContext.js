import {createContext, useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {Magic} from 'magic-sdk'
import {MAGIC_PUBLIC_KEY, API_URL} from '../utils/urls'
import Cookies from 'js-cookie'
import axios from 'axios';


const AuthContext = createContext()

let magic
export const AuthProvider = (props) =>{
    const [user, setUser] = useState(null)

    const router = useRouter()

    const loginUser = async (email, password) =>{
        const response = await fetch(`${API_URL}/api/auth/local`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                identifier: "sherif.ahmed990@gmail.com",
                password: "strapistrapi@123"
            })
        })
        const data = await response.json()
        await setToken(data)
        setUser({data})
    }
    const logoutUser = async () =>{
        try{
            Cookies.remove('jwt')
            setUser(null)
        }catch(err){
            console.log(err)
        }
    }
    const checkUserLoggedIn = async() =>{
        try {
            const t = await getToken('jwt')
            console.log(t)
            
            const {data} = await axios.get(`${API_URL}/api/users/me`, {
                headers: {
                Authorization:
                    `Bearer ${t}`,
                },
            })

            if (!data.username) {
                console.log('Logged Out')
                setUser(null)
                return false
            }else{
                console.log('Logged In')
                setUser({data})
                return true
            }

        } catch (err) {
            // It will be there!
    
            console.log(err)
            console.log('Logged Out')
            setUser(null)
            return false
        }
    }

    const setToken = async (data) => {
        if(typeof window === 'undefined'){
            return;
        }
        // Cookies.set('id', data.user.id)
        // Cookies.set('username', data.user.username)
        Cookies.set('jwt', data.jwt, { expires: 7 })

        if(Cookies.get('jwt')){
            router.push('/')
        }
        
    } 

    const getToken = async () => {
        try{
            return Cookies.get('jwt')
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        checkUserLoggedIn()
    }, [])
    return(
        <AuthContext.Provider value={{user, loginUser, logoutUser, getToken}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext