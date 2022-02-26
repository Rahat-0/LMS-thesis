import React from 'react'

function BookShow() {
  return (
      <>
    <div className="bg-red-400 h-16">sr only</div>
   
   <div className="px-6 md:flex p-2">
        {/* <!-- summary component start from here --> */}
        <div className="lg:flex-row lg:space-x-8 lg:px-10 lg:text-left lg:w-10/12 md:w-7/12 text-center flex flex-col justify-center item-center">
          <img className="lg:p-1 w-82  h-96 object-contain py-6" src='https://www.syndetics.com/index.aspx?isbn=9781250765826&issn=/LC.JPG&client=sepup&type=xw12' alt='book' />
          <div className="">
            <h3 className="lg:text-4xl font-bold text-2xl capitalize">cool for the summer</h3>
            <p className="text-pink-700 font-bold">author name</p>
            <p className="lg:w-32 lg:text-center bg-green-200 p-3 border-gray-500 border-2 rounded my-2 text-sky-800 text-xl">available</p>
            <p className="text-left">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim necessitatibus fugiat nemo qui facilis maxime ab ipsum voluptatum quod sint aliquid numquam odit, ad corporis. Tenetur impedit eveniet doloremque at illo, et minus quae officia dicta qui doloribus ipsum dolor nesciunt optio eaque laborum ipsam odio, cumque id! Aut ipsa accusamus itaque laudantium praesentium, hic eveniet nostrum voluptatem voluptate maiores, assumenda perferendis quibusdam molestias cum deleniti, animi dolorum alias odit incidunt. Quibusdam necessitatibus tempore molestias! Corporis unde est, incidunt, consequatur recusandae accusantium ad provident velit nemo quasi molestiae! Reprehenderit similique voluptatibus assumenda quia </p>
  
          </div>
        </div>
        {/* <!-- summary component ends here --> */}

        {/* <!-- booking component start from here --> */}
        <div className="lg:w-3/12 md:h-64 md:w-6/12 border-2 rounded mt-5">
          <div className="border-b-2 p-2">
              <h4 className=" text-xl text-green-700">Available</h4>
              <div>
                <span className="mr-2"> <span className="font-bold">4</span>  copies</span>
                <span className="m-2"><span className="font-bold">2</span> available</span>
                <span className="m-2"><span className="font-bold">1</span> on hold</span>
              </div>
          </div>
          <div className="py-3 ">
              <div className="bg-green-700 m-2 rounded-lg hover:bg-green-900">
                <button className=" block w-full text-white p-2 text-lg  ">Place hold</button>
              </div>
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
     </div>
     </>
  )
}

export default BookShow