import {createContext, useState} from 'react'

export const Menubar = createContext('')
export const SchoolID = createContext('')
export const Renders = createContext('')


const Store = ({children}) =>{
    const [rerander, setRerander] = useState(false)
    const [visible, setVisible] = useState(false)
    const [sclId, setSclId] = useState('')

    return(
        <Menubar.Provider value={[visible, setVisible]}>
            <SchoolID.Provider value={[sclId, setSclId]} >
                <Renders.Provider value={[rerander, setRerander]} >
                    {children}
                </Renders.Provider>
            </SchoolID.Provider>
        </Menubar.Provider>
    )
}

export default Store;