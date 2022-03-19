import axios from "axios";
import Cookies from "js-cookie";
import { Menubar } from "../../store/Store";
import { useEffect, useState, useContext } from "react";
import Table from "./Table";
import { useLocation } from "react-router-dom";

function BookList() {
  const [visible] = useContext(Menubar);
  const location =  useLocation()
  const vpath = location.pathname.split('/')[1]

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true)

  const key = Cookies.get("auth");

  useEffect(() => {
    axios
      .get(`/api/${vpath}/books`, { headers: { auth: key } })
      .then((result) => {
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

//   const {bookId, title, author, year} = data;
  const tableHeader = ["id", "title" ,"author","year"]
  const routes  = "Books"

  return <Table endPoint={vpath} data={[data, loading]} tableHeader={[tableHeader]} routes={routes} error={error} visible={visible} />;
}
export default BookList;
