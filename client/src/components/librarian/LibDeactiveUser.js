import axios from "axios";
import Cookies from "js-cookie";
import { Menubar } from "../../store/Store";
import { useEffect, useState, useContext } from "react";
import Table from "../common/Table";
import { useLocation } from "react-router-dom";

function LibDeactiveUser() {
  const [visible] = useContext(Menubar);
  const location = useLocation()
  const vpath = location.pathname.split('/')[1]

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true)

  const key = Cookies.get("auth");

  useEffect(() => {
    axios
      .get("/api/librarian/students/deactiveuser", { headers: { auth: key } })
      .then((result) => {
        console.log(result.data)
        if (result.data.error) {
        } else {
          setData(result.data);
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log("custom error here" + err);
        setError(err);
      });
  }, []);

  const tableHeader = ["Name", "SchoolID" ,"Status","UserType"]
  const routes = "Deactive User"

  return <Table data={[data, loading]} endPoint={vpath} tableHeader={[tableHeader]} routes={routes} error={error} visible={visible} />;
}
export default LibDeactiveUser;
