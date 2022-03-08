import axios from "axios";
import Cookies from "js-cookie";
import { Menubar } from "../../store/Store";
import { useEffect, useState, useContext } from "react";
import Dashboard from "../common/Dashboard";

function LibDashboard() {
  const [visible] = useContext(Menubar);

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const key = Cookies.get("auth");

  useEffect(() => {
    axios
      .get("/api/librarian/dashboard", { headers: { auth: key } })
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

  const routes = "Librarian"
  const title = {first : 'Total Student', second : 'Deactive User', third : 'Issue Request', fourth : 'Total Books'}
  const links = {first : '/librarian/studentlist', second : '/librarian/deactiveuser', third : '/librarian/issuerequest', fourth : '/librarian/booklist'}

  return <Dashboard data={[data, loading]} links={links}  routes={routes} title={title} error={error} visible={visible} />;
}
export default LibDashboard;
