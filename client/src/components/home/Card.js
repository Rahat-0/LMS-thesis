import React from 'react'

const Card = () => {
    const [current, setcurrent]=React.useState([])
    const test = [0,1,2,3,4,5,1, 2, 3,3 ,3,33, 3, 3,3, 3,3]

    const previousHandler = ()=>{
       
    }
    const nextHandler =()=>{
 
    }
  return (
    <div className=''>
        <h1 className='mt-5 p-2 bg-indigo-300 font-bold text-indigo-800 rounded-sm rounded-r-3xl w-7/12'>most popular books</h1>
        <div className='text-center relative'>
            <div className='absolute z-10 top-2/4 flex justify-between w-full'>
                <button onClick={previousHandler}>previous</button>
                <button onClick={nextHandler}>next</button>
            </div>
            <div className='flex overflow-hidden'>
            {test.map((data)=>{
                return(
                <div key={data} className=' w-4/12 md:w-3/12 lg:w-2/12 text-center p-2 rounded-b-md shadow-2xl opacity-90 hover:opacity-100'>
                    <img className='' style={{minWidth : '11rem'}}  src='https://www.mswordcoverpages.com/wp-content/uploads/2018/10/Book-cover-page-3-CRC.png' alt='book' />
                    <p>{data}</p>
                </div>
                )
            })}
            </div>
            
        </div>
        

        
        
        
    </div>
  )
}

export default Card