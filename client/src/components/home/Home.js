import React from "react";
import image from "../../assets/img/1.jpg";
import a from "../../assets/img/2.jpeg";
import b from "../../assets/img/3.jpg";
import c from "../../assets/img/4.jpg";
import Card from "./Card";
import Footer from "./Footer";
import Slider from "./Slider";

function Home() {

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
    <div className="bg-blue-100">
      <div className="bg-red-400 h-16">sr only</div>
      <Slider images={imgs} />
      <section>
        <Card />
      </section>
      <Footer />
    </div>
  );
}

export default Home;
