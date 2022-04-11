import React, {useEffect, useState} from "react";
import axios from "axios";
import image from "../../assets/img/1.jpg";
import a from "../../assets/img/2.jpeg";
import b from "../../assets/img/3.jpg";
import c from "../../assets/img/4.jpg";
import Footer from "./Footer";
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

  return (
    <div className=" bg-gradient-to-tr bg-red-100">
      <div className="bg-red-400 h-16">sr only</div>
      <div className="md:mx-8 md:px-2">
        <Slider images={data} />
          <ComSlider data= {[data]} title = {"new books"} />
          <ComSlider data= {[data]} title = {"most popular books"} />
          <ComSlider data= {[data]} title = {"historical books"} />
      </div>
   
      <Footer />
    </div>
  );
}

export default Home;
