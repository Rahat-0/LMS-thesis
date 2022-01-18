import axios from "axios";
import Cookies from "js-cookie";
import { Menubar } from "../../store/Store";
import { useEffect, useState, useContext } from "react";
import Table from "./Table";

function BookList() {
  const [visible] = useContext(Menubar);

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const key = Cookies.get("auth");

  useEffect(() => {
    axios
      .get("/api/admin/books", { headers: { auth: key } })
      .then((result) => {
        if (result.data.error) {
        } else {
          setData(result.data);
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

  return <Table data={[data]} tableHeader={[tableHeader]} routes={routes} error={error} visible={visible} />;
}
export default BookList;
