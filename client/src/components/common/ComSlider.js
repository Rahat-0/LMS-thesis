import React, {useRef} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from "@heroicons/react/outline";
 const ComSlider =()=> {
  const sliderRef = useRef(null)
    var settings = {
      dots: false,
      infinite: false,
      speed: 1000,
      slidesToShow: 5,
      slidesToScroll: 5,
      initialSlide: 0,
      arrows : false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: false,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    }

    const test = [1,2,3, 4,5,6,7,8,9,10,11, 12,13,14,15]
    return (
      <div>
        <div className="bg-green-200">
          <h3 className="bg-gray-200 my-3 py-2 font-bold text-lg">most popular books</h3>
        </div>
         <div className='text-center relative '>
            <div className='absolute z-10 top-2/4 flex justify-between w-full'>
                <ArrowCircleLeftIcon  className="w-10 text-gray-500" onClick={()=> sliderRef.current.slickPrev()} />
                <ArrowCircleRightIcon  className="w-10 text-gray-500" onClick={()=> sliderRef.current.slickNext()}   />
            </div>
            <div>
            <Slider ref={sliderRef} {...settings}>
              {test.map((data)=>{
                      return(
                      <div key={data} className=' w-4/12 md:w-3/12 lg:w-2/12 text-center pr-2 rounded shadow-2xl opacity-90 hover:opacity-100'>
                          
                          <img className='rounded'  src='https://www.mswordcoverpages.com/wp-content/uploads/2018/10/Book-cover-page-3-CRC.png' alt='book' />
                          <p>{data}</p>
                      </div>
                      )
                  })}
            </Slider>
            </div>
            
        </div>
        
      </div>
    );
  
}

export default ComSlider;