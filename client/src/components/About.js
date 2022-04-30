import React, { useState } from 'react'
import author from '../assets/img/rahat.JPG'
import library from '../assets/img/nanjingLibrary.jpg'

function About() {
    const [para, setPara] = useState(false)
    let str = "The project will be known as Library Management System based on web application. There are six modules in LMS, which are Client/student Information module, administration Information module, Booking Management module, book issuing module, book Returning module, Report module. This report contains the introduction, methodology, analysis, design, implementation, testing, and project conclusion of the project. To develop the real system, designs had been made that covers the system architecture, user interfaces, and database design. This system is hoped to help the university in handling the online library management. System function:•	Only authentic user must have the access to the system.•	Only the user must be able to provide the information related to the library.•	User must be able to:•	Provide the information regarding books.•	Search for the required books from database.•	Add new book to the database.•	Update the number of books in database.•	Enter data of issued book in Database.•	Information of returned books."
     
  return (
    <div><section className="text-gray-600 body-font flex justify-center">
    <div className="container px-5 py-24 mx-auto flex flex-col">
      <div className="lg:w-4/6 mx-auto">
        <div className="rounded-lg h-64 overflow-hidden">
          <img alt="content" className="object-cover object-center h-full w-full" src={library} />
        </div>
        <div className="flex flex-col sm:flex-row mt-10">
          <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
            <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
              <img className='rounded-full w-full h-full bg-cover' src={author} alt="author" />
            </div>
            <div className="flex flex-col items-center text-center justify-center">
              <h2 className="font-medium title-font mt-4 text-gray-900 text-xl">Rafi Mir Rahat Hasan</h2>
              <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
              <p className="text-base"> 
              <span className='font-bold'>Student ID: 201853082050</span> <br></br>
              <span className=' italic'>Nanjing University of Information Science and Technology</span> <br></br>
              <span className=' font-bold'>mirrahat00@gmail.com</span> <br></br>
              <span className='italic'>+8801710218990</span>
              </p>
            </div>
          </div>
          <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
            <p className="leading-relaxed text-lg mb-4">
                 {para ? str : str.slice(0 , str.length/2)}
            </p>
            <input type='button' value={para ?  "Learn Less" : "Learn More"} onClick={()=> setPara(!para) }  className="text-indigo-500 inline-flex items-center"> 
             
            </input>
          </div>
        </div>
      </div>
    </div>
  </section></div>
  )
}

export default About