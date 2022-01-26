import {createContext, useState} from 'react'

export const Menubar = createContext('')
export const Stuidentity = createContext('')

const Store = ({children}) =>{
    const [visible, setVisible] = useState(true)

    const [StuID, setStuID] = useState('')

    return(
        <Menubar.Provider value={[visible, setVisible]}>
            <Stuidentity.Provider value={[StuID, setStuID]} >
            {children}
            </Stuidentity.Provider>
        </Menubar.Provider>
    )
}

export default Store;