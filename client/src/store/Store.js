import {createContext, useState} from 'react'

export const Menubar = createContext('')
export const SchoolID = createContext('')

const Store = ({children}) =>{
    const [visible, setVisible] = useState(true)

    const [sclId, setSclId] = useState('')

    return(
        <Menubar.Provider value={[visible, setVisible]}>
            <SchoolID.Provider value={[sclId, setSclId]} >
            {children}
            </SchoolID.Provider>
        </Menubar.Provider>
    )
}

export default Store;