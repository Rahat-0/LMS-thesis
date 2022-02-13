import React from 'react'

function UserSetting() {
  return (
    <div className='bg-white md:flex md:justify-around md:py-16'>
        <div className='hidden md:block md:w-3/12'>
            <h3 className='font-bold text-4xl py-3'>Settings</h3>
            <ul>
                <li className='p-2 bg-gray-100 my-2 rounded-lg hover:bg-red-50'>Public profile</li>
                <li className='p-2 bg-gray-100 my-2 rounded-lg hover:bg-red-50'>Account settings</li>
            </ul>
        </div>
        <div className='md:w-8/12'>
            <h3 className='text-center md:text-left text-3xl p-2 bg-gray-200 md:bg-white'>Public profile</h3>
            <div className='flex flex-col md:flex-row md:w-9/12  justify-center items-center'>
                <div className='flex justify-center w-56 h-56 m-2'>
                    <img className=' shadow-2xl bg-cover md:w-60 object-contain text-center border-8 rounded-full' src='https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt='profile pictures' />
                </div>
                <div className='text-white'>
                    <button className=' md:w-52 block md:ml-10 md:my-6 bg-green-500 w-80 my-2 rounded-lg py-2 hover:bg-green-800'>Change picture</button>
                    <button className=' md:w-52 block md:ml-10 md:my-6 bg-red-500 w-80 my-2 rounded-lg py-2 hover:bg-red-800'>Edit profile</button>
                </div>
            </div>
            <div className='flex flex-col  justify-center md:items-start items-center'>
                <div className='flex flex-col md:m-2 md:flex-row md:w-9/12 md:space-x-5 justify-center items-center '>

                    <div className='md:w-6/12'>
                        <label className='font-bold'>First name</label>
                        <input className='block w-80 md:w-full rounded-lg px-2 py-2 bg-green-100 outline-none' value='rahat' type='text' />
                    </div>
                    <div className='md:w-6/12'>
                        <label className='font-bold'>last name</label>
                        <input className='block w-80 md:w-full rounded-lg px-2 py-2 bg-green-100 outline-none' value='rahat' type='text' />
                    </div>
                </div>
                <div className='md:w-full md:m-2'>
                        <label className='block font-bold'>email</label>
                        <input className='w-80 md:w-9/12 rounded-lg px-2 py-2 bg-green-100 outline-none' value='rahat' type='text' />
                </div>
                <div className='md:w-full md:m-2'>
                        <label className='block font-bold'>schoold ID</label>
                        <input className='w-80 md:w-9/12 rounded-lg px-2 py-2 bg-green-100 outline-none'  type='number' />
                </div>

                <div className='md:w-full md:m-2'>
                        <label className='block font-bold'>user type</label>
                        <input className='w-80 md:w-9/12 rounded-lg px-2 py-2 bg-green-100 outline-none '  type='text'   />
                </div>

                <div className='md:w-full md:m-2'>
                        <label className='block font-bold'>mobile</label>
                        <input className='w-80 md:w-9/12 rounded-lg px-2 py-2 bg-green-100 outline-none' value='rahat' type='number' />
                </div>

                <div className='md:w-full md:m-2'>
                        <label className='block font-bold'>Bio</label>
                        <textarea className='w-80 md:w-9/12 rounded-lg px-2 py-2 bg-green-100 outline-none' type='textarea' />
                </div>
            </div>

        </div>
    </div>
  )
}

export default UserSetting