import React from 'react'

const Card = () => {
    const [card, setCard]=React.useState([])
    const test = [0,1,2,3,4,5]

    const previousHandler = ()=>{
       
    }
    const nextHandler =()=>{
 
    }
  return (
    <div className=''>
        <h1>most popular books</h1>
        <div className='text-center relative'>
            <div className='absolute z-10 top-2/4 flex justify-between w-full'>
                <button onClick={previousHandler}>previous</button>
                <button onClick={nextHandler}>next</button>
            </div>
            {test.map((data)=>{
                return(
                <div key={data} className=' w-4/12 md:w-3/12 lg:w-2/12 text-center inline-block p-2 rounded-b-md shadow-2xl opacity-90 hover:opacity-100'>
                    <img className='' src='https://www.mswordcoverpages.com/wp-content/uploads/2018/10/Book-cover-page-3-CRC.png' alt='book' />
                    <p>{data}</p>
                </div>
                )
            })}
            
        </div>
        

        
        
        
    </div>
  )
}

export default Card