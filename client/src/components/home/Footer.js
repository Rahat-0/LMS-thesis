import React from 'react'
import facebook from '../../assets/icons/facebook-brands.svg'
import github from '../../assets/icons/github-brands.svg'
import linkedin from '../../assets/icons/linkedin-brands.svg'
import youtube from '../../assets/icons/youtube-brands.svg'
import twitter from '../../assets/icons/twitter-brands.svg'


const Footer = () => {
  return (
    <div>
        <div className='flex justify-center items-center bg-green-400'>
            <img className='w-8 h-8 m-1 focus:ring-2  cursor-pointer' src={facebook} alt="fa" />
            <img className='w-8 h-8 m-1 focus:ring-2  cursor-pointer' src={youtube} alt="fa" />
            <img className='w-8 h-8 m-1 focus:ring-2  cursor-pointer' src={linkedin} alt="fa" />
            <img className='w-8 h-8 m-1 focus:ring-2  cursor-pointer' src={twitter} alt="fa" />
            <img className='w-8 h-8 m-1 focus:ring-2  cursor-pointer' src={github} alt="fa" />
        </div>
    </div>

  )
}

export default Footer