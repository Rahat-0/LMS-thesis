import React , {useEffect} from "react";
import axios from "axios";

function Home() {
  const [image, setImage] = React.useState();
  const [paths, setPath] = React.useState();

  useEffect(() => {
    axios.get("/api/test/upload")
    .then((result)=>{
         setPath(result.data)   
    })
    .catch(err => console.log(err))
  }, []);
  

  const fileHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("proImage", image);

    // axios
    //   .post("/api/test/upload", data, {
    //     headers: { enctype: "multipart/form-data" },
    //   })
    //   .then((result) => {
    //     //   const views = URL.createObjectURL(result.data)
    //     console.log(result.data)
    //     setPath(result.data)
        
    //   })
    //   .catch((err) => console.log(err));
  };

  
    
   
 

  return (
    <div className=" font-bold text-2xl pt-32 text-center">
      <div>
        this is home
        <form onSubmit={fileHandler}>
          <input
            type="file"
            name="proImage"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button type="submit">submit</button>
        </form>
        <img src={`image/${paths}`} alt="proimage" />
      </div>
    </div>
  );
}

export default Home;
