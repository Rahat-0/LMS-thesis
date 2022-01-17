import {createContext, useState} from 'react'

export const Menubar = createContext('')

const Store = ({children}) =>{
    const [visible, setVisible] = useState(true)

    return(
        <Menubar.Provider value={[visible, setVisible]}>
            {children}
        </Menubar.Provider>
    )
}

export default Store;