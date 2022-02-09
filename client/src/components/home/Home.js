import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from "@heroicons/react/outline";

import image from "../../assets/img/1.jpg";
import a from "../../assets/img/2.jpeg";
import b from "../../assets/img/3.jpg";
import c from "../../assets/img/4.jpg";

function Home() {
  let [ind, setInd] = useState(0);
  const imgs = [
    { mg: image, story: 'i am from bangladesh' },
    { mg: a, story: 'i am from china' },
    { mg: b, story: 'i am from india' },
    {mg: c, story: 'i am from south koria'},
    { mg: image, story: 'i"m from indonesia' },
    { mg: a, story: 'i am from newzeland' },
    { mg: b, story: 'i am from afganistan' },
    { mg: c, story: 'i am from uganda' },
  ];

  const styles = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  useEffect(() => {
   const clear = setInterval(() => {
      if(imgs.length - 1 === ind){
        setInd(0)
      }else{
        setInd((ind + 1))
      }
      }, 5000);
    return () => {
     clearInterval(clear)
    }
  }, [ind])

  const nextHandler = () => {
    if (imgs.length - 1 === ind) {
      setInd(0);
    } else {
      setInd(ind + 1);
    }
  };
  const previousHandler = () => {
    if (ind === 0) {
      setInd(imgs.length - 1); 
    } else {
      setInd(ind-1);
    }
  };

  return (
    <div className="bg-blue-100">
      <div className="bg-red-400 h-16">sr only</div>

      <div className="relative sm:h-screen md:h-4/6">
        {/*******search section start from here******/}
        <div className=" sm:p-4 flex justify-evenly  p-2 absolute w-full bg-white bg-opacity-20 z-10">
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
          <ArrowCircleLeftIcon className="w-12 mx-4 md:w-16 cursor-pointer hover:opacity-100 opacity-70" onClick={previousHandler}>previous</ArrowCircleLeftIcon>
          <ArrowCircleRightIcon className="w-12 mx-4 md:w-16 cursor-pointer hover:opacity-100 opacity-70" onClick={nextHandler}>next</ArrowCircleRightIcon>
        </div>

        {/***** slide section start from here ******/}
        
          
        
        <div className="flex justify-center">
          <animated.div
          style={styles}
          >

          <img className={`w-full h-8 sm:h-4/5  `} style={{height : '500px'}} src={(imgs[ind].mg)} alt="fs" />
          </animated.div>
        </div>
        

        {/* ***** slide title and link ******* */}
        <div className="relative ">
          <div className="bottom-5 absolute text-center text-gray-800 opacity-90 rounded bg-blue-200 w-full">
            <a href="##">
              <p className="text-xl sm:text-2xl uppercase font-bold">{imgs[ind].story} </p>
            </a>
          <p>{ind}</p> 
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default Home;
