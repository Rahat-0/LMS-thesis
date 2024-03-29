import axios from "axios";
import Cookies from "js-cookie";
import { Menubar } from "../../store/Store";
import { useEffect, useState, useContext } from "react";
import Table from "../common/Table";

function LibrarianList() {
  const [visible] = useContext(Menubar);

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true)

  const key = Cookies.get("auth");

  useEffect(() => {
    axios
      .get("/api/admin/librarians", { headers: { auth: key } })
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

  const tableHeader = ["Name", "SchoolID" ,"Status","UserType"]
  const routes = "Librarians"

  return <Table endPoint='admin' data={[data, loading]} tableHeader={[tableHeader]} routes={routes} error={error} visible={visible} />;
}
export default LibrarianList;
