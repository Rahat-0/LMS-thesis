// import axios from "axios";
// import Cookies from "js-cookie";
import StudentList from "./studentList";
// import { useEffect, useState } from "react";

 function Tables() {
  // const [visible] = props.states;

  // const [data, setData] = useState([]);
  // const [error, setError] = useState(false);

  // const key = Cookies.get("auth");

  // useEffect(() => {
  //   axios
  //     .get("/api/admin/students", { headers: { auth: key } })
  //     .then((result) => {
  //       if (result.data.error) {

  //       } else {
  //         setData(result.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("custom error here" + err);
  //       setError(err);
  //     });
  // }, []);


  return (
    <div>
      <StudentList />
    </div>
  );
}
export default Tables;