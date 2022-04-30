import React, {useEffect, useState} from "react";
import axios from "axios";
// import image from "../../assets/img/1.jpg";
// import a from "../../assets/img/2.jpeg";
// import b from "../../assets/img/3.jpg";
// import c from "../../assets/img/4.jpg";
import Slider from "./Slider";
import ComSlider from '../common/ComSlider'

function Home() {

  const [data, setData] = useState([0])

  useEffect(() => {
    axios.get('/api/book/all')
    .then((result)=>{
      setData(result.data)
    })
    .catch(err => console.log(err))
  }, [])

  

  return (
    <div className=" bg-gradient-to-tr bg-red-100">
      <div className="bg-red-400 h-16">sr only</div>
      <div className="md:mx-8 md:px-2">
        <Slider images={data} />
          <ComSlider data= {[data]} title = {"new books"} />
          <ComSlider data= {[data]} title = {"most popular books"} />
          <ComSlider data= {[data]} title = {"historical books"} />
      </div>
    </div>
  );
}

export default Home;
