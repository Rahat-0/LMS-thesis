import {createContext, useState} from 'react'

export const isLogins = createContext('')

const Store = ({children}) =>{
    const [isValid, setIsValid] = useState(false)

    return(
        <isLogins.Provider value={[isValid, setIsValid]}>
            {children}
        </isLogins.Provider>
    )
}

export default Store;