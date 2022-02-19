import React from 'react'
import {Link, useParams} from 'react-router-dom'

export function Test() {
  const Handler =(e)=>{
    e.preventDefault()
  }
  return (
   <>
   <div className="bg-red-400 h-16">sr only</div>
   <div className='text-center'>test</div>
   <form onSubmit={Handler} method='get'>
     <input name='name' type='text' />
     <input type='submit' value='submit' />
   </form>
   
   </>
  )
}

export function Case1(){
    return(
      <>
       <div className="bg-red-400 h-16">sr only</div>
      <div className=''>case one here</div>
      <Link to ='/case2/232443'>send</Link>
      </>
    )
}

export function Case2(){
  const {id} = useParams()
  return(
    <>
     <div className="bg-red-400 h-16">sr only</div>
      <div>case two here</div>
      <p>here is the link id {id} </p>
      <Link to ='/case1'>send</Link>
    </>
  )
}