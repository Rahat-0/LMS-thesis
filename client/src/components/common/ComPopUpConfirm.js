import React from 'react'
// import axios from 'axios';
import {ToastContainer} from 'react-toastify'
// import {useNavigate} from 'react-router-dom'

function ComPopUpConfirm(props) {
  const {deleted, deactived} = props
    
    const [deletes, setDelete, deactivate, setDeactivate, data] = props.states;

   
  return (
    <div
        className={`${deletes || deactivate ? "block" : "hidden"} text-center flex justify-center items-center opacity-90 `}
      >
        <div className="  fixed bg-gray-200 shadow-2xl top-1/3 rounded-2xl">
          <div className="  w-96 h-56 flex justify-center items-center">
            <div className="font-bold">
              <p className="mt-20 px-2">
               {deletes ?  'do you want to delete this account ?' : `do you want to ${!data ? 'deactive' : data.userStatus === 'active' ? "deactive" : "active"} this account?`}
              </p>
              <div className="flex justify-between mt-12">
                <input
                  className="text-black p-2 px-9 rounded-xl bg-gray-400 border focus:ring-2 focus:ring-gray-500 cursor-pointer"
                  onClick={()=> setDelete(false) || setDeactivate(false)}
                  type="button"
                  value="cancel"
                /> 
                {deletes ? 
                <input
                className={` p-2 px-9 rounded-xl bg-red-400 border focus:ring-2 focus:ring-red-500 cursor-pointer`}
                onClick={deleted}
                type="button"
                value="delete"
              /> 
              :
              
                <input
                  className={` p-2 px-9 rounded-xl bg-yellow-400 border focus:ring-2 focus:yellow-red-500 cursor-pointer`}
                  onClick={deactived}
                  type="button"
                  value={!data ? 'deactive' : `${data.userStatus === 'active' ? "deactive" : "active"}`}
                />
                }
              </div>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
  )
}

export default ComPopUpConfirm