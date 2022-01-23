import {createContext, useState} from 'react'

export const Menubar = createContext('')
export const Update = createContext('')

const Store = ({children}) =>{
    const [visible, setVisible] = useState(true)

    const [update, setupdate] = useState('')

    return(
        <Menubar.Provider value={[visible, setVisible]}>
            <Update.Provider value={[update, setupdate]} >
            {children}
            </Update.Provider>
        </Menubar.Provider>
    )
}

export default Store;