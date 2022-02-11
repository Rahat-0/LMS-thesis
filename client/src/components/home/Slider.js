import React, {useEffect} from 'react'
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from "@heroicons/react/outline";


function Slider({images}) {
  let [index, setIndex] = React.useState(0);


      useEffect(() => {
        const clear = setInterval(() => {
           nextHandler()
           }, 5000);
         return () => {
          clearInterval(clear)
         }
       }, [index])

       const nextHandler = () => {
        if (images.length - 1 === index) {
          setIndex(0);
        } else {
          setIndex(index + 1);
        }
      };
    
      const previousHandler = () => {
        if (index === 0) {
          setIndex(images.length - 1); 
        } else {
          setIndex(index-1);
        }
      };
    


  return (
    <div className="relative sm:h-screen md:h-4/6">
        {/*******search section start from here******/}
        <div className=" sm:p-4 flex justify-evenly  p-2 absolute w-full bg-white bg-opacity-20 hover:bg-opacity-50 focus:bg-opacity-50 z-10">
          <select className=" sm:w-3/12 sm:m-1 sm:rounded-lg px-5 p-1 rounded text-sm outline-none focus:ring-2 opacity-60">
            <option>history</option>
            <option>science</option>
            <option>arts</option>
            <option>commerce</option>
          </select>
          <input
            className=" sm:w-2/4 sm:py-3 sm:m-1 sm:rounded-lg px-2 p-1 rounded bg-gray-50 text-sm outline-none focus:ring-2 bg-opacity-60"
            type="search"
            placeholder="search here"
          />
          <input
            className=" sm:w-2/12 sm:m-1 sm:rounded-lg px-5 p-1 rounded bg-gray-400 outline-none hover:bg-gray-800 hover:text-gray-50 focus:ring-2 opacity-60"
            type="submit"
            value="search"
          />
        </div>
        {/* ******* next and previous button component****** */}
        <div className="absolute h-4/5 flex w-full justify-between text-red-200 items-center">
          <ArrowCircleLeftIcon className="w-12 mx-4 md:w-16 cursor-pointer hover:opacity-100 opacity-70 z-10" onClick={previousHandler}>previous</ArrowCircleLeftIcon>
          <ArrowCircleRightIcon className="w-12 mx-4 md:w-16 cursor-pointer hover:opacity-100 opacity-70 z-10" onClick={nextHandler}>next</ArrowCircleRightIcon>
        </div>

        {/***** slide section start from here ******/}
        
        {/* className={`w-full h-8 sm:h-4/5  `}   */}
        
        <div className="flex justify-between ">
          {images.map((imgs, indx)=>{
            return(
            <div
              className={`${indx===index ? ' w-full wtransition delay-150 duration-700' : 'w-0'} `}
          >
          <img style={{height : '500px'}} src={imgs.mg} alt="fs" />
            </div>
            )
          })}
        </div>
        

        {/* ***** slide title and link ******* */}
        <div className="relative">
          <div className=' flex  justify-center'>
            <div className="bottom-5 absolute text-center text-gray-800 opacity-90 rounded bg-blue-200  md:w-2/4 w-3/4 ">
              <a href="##">
                <p className="text-xl sm:text-2xl uppercase font-bold">{images[index].story} </p>
              </a>
            <p>{index}</p> 
            </div>
          </div>
        
        </div>
      </div>
  )
}

export default Slider