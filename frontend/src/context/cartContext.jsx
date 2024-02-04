import {useState,useContext , createContext} from "react"

const AppContext = createContext()


const CartProvider = ({children}) =>{ 

const [cartUpdated, updateCart ] = useState(false)

 return (
    <AppContext.Provider value={[cartUpdated, updateCart]}>
        {children}
    </AppContext.Provider>
 )
}

//custom hook
const useAppContext = () => useContext(AppContext)

export {useAppContext , CartProvider}