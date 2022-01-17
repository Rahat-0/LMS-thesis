import axios from "axios";
import Cookies from "js-cookie";
import { Menubar } from "../../store/Store";
import { useEffect, useState, useContext } from "react";
import Table from "./Table";

function LibrarianList() {
  const [visible] = useContext(Menubar);

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const key = Cookies.get("auth");

  useEffect(() => {
    axios
      .get("/api/admin/librarians", { headers: { auth: key } })
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

  const tableHeader = ["Name", "SchoolID" ,"Status","UserType"]

  return <Table data={[data]} tableHeader={[tableHeader]} error={error} visible={visible} />;
}
export default LibrarianList;
