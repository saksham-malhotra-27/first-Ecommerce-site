import {useState,  useEffect,useContext , createContext} from "react"

const AuthContext = createContext()


const AuthProvider = ({children}) =>{ 

const [auth, setAuth ] = useState({
    user:null,
    token:""
})
useEffect(()=>{
    const data = localStorage.getItem('auth')
    if(data){
        const parseData = JSON.parse(data)
        setAuth({
            ...auth,
            user: parseData.user,
            token: parseData.token
        })
    }
    },
     [auth?.token])

const updateAuth = (newAuth) => {
    setAuth(newAuth)
    localStorage.setItem('auth', JSON.stringify(newAuth))
}

 return (
    <AuthContext.Provider value={[auth, updateAuth]}>
        {children}
    </AuthContext.Provider>
 )
}
//custom hook
const useAuth = () => useContext(AuthContext)

export {useAuth , AuthProvider}