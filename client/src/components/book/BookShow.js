import Cookies from 'js-cookie';
import React, { useEffect, useState, useContext } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Renders } from '../../store/Store';


function BookShow() {
  const key = Cookies.get("auth");
  const {bookId} = useParams();
  const [data, setData] = useState('')
  const [rerander, setrerander] = useContext(Renders)
  useEffect(() => {
  
    axios.get(`/api/book/${bookId}`)
    .then((result)=>{
        setrerander(!rerander)
        setData(result.data)
    })
    .catch(err => console.log(err))
  
  }, [rerander])

  const issueHandler =()=>{
    axios.post('/api/book/issue/issuerequest', {issueBook : data._id}, {headers : {auth : key}})
    .then((result)=>{
      if(result.data.authError){
        toast.error('you are not loged in!', {position : 'top-center'})
      }
      else if(result.data.error){
        toast.error(result.data.error, {position : 'bottom-left'})
      }else if ( result.data.message){
        toast.success(result.data.message, {position : 'bottom-left'})

      }else{
        console.log(result)
      }
    })
    .catch(err=> console.log('error here'))
  }
  
  return (
      <>
    <div className="bg-red-400 h-16">sr only</div>
   
   <div className="px-6 md:flex p-2">
        {/* <!-- summary component start from here --> */}
        <div className="lg:flex-row lg:space-x-8 lg:px-10 lg:text-left lg:w-10/12 md:w-7/12 text-center flex flex-col justify-center item-center">
          <img className="lg:p-1 w-82  h-96 object-contain py-6" src={`../../image/${data.image}`} alt='book' />
          <div className="lg:w-9/12">
            <h3 className="lg:text-4xl font-bold text-2xl capitalize">{data.title} </h3>
            <span className="text-pink-700 font-bold">{data.author} </span> 
            <span className="text-pink-700 font-bold">{data.year} </span>
            {data.availability ? 
              <p className="lg:w-32 lg:text-center bg-green-200 p-3 border-gray-500 border-2 rounded my-2 text-sky-800 text-xl">available</p>
            :
              <p className="lg:w-32 lg:text-center bg-red-200 p-3 border-gray-500 border-2 rounded my-2 text-sky-800 text-xl">unavailable</p>
            }
            <p className="text-left">{data.about} </p>
  
          </div>
        </div>
        {/* <!-- summary component ends here --> */}

        {/* <!-- booking component start from here --> */}
        <div className="lg:w-3/12 md:h-64 md:w-6/12 border-2 rounded mt-5">
          <div className="border-b-2 p-2">
              <h4 className=" text-xl text-green-700">Available</h4>
              <div>
                <span className="mr-2"> <span className="font-bold">{data.copy} </span>  copies</span>
                <span className="m-2"><span className="font-bold">{data.available} </span> available</span>
                <span className="m-2"><span className="font-bold">{data.hold} </span> on hold</span>
              </div>
          </div>
          <div className="py-3 ">
                {
                  data.progress ?
                  <div className="bg-yellow-700 m-2 rounded-lg hover:bg-yellow-900">
                  <button disabled className=" block w-full text-white p-2 text-lg  ">In progress</button>
                </div>
                :
                data.available <= 0 ?
                <div className="bg-red-700 m-2 rounded-lg hover:bg-red-900 cursor-not-allowed">
                  <button disabled className=" block w-full text-white p-2 text-lg  ">sold out</button>
                </div>
                :
                <div className="bg-green-700 m-2 rounded-lg hover:bg-green-900">
                  <button onClick={issueHandler} className=" block w-full text-white p-2 text-lg  ">Place hold</button>
                </div>
                }
              <div className="bg-green-700 m-2 rounded-lg hover:bg-green-900 border-2">
                <select className="block w-full p-2 text-lg ">
                  <option>for later</option>
                  <option>in progress</option>
                  <option>completed</option>
                </select>
              </div>
          </div>
        </div>
        {/* booking component ends here  */}
        <ToastContainer />
     </div>
     </>
  )
}

export default BookShow