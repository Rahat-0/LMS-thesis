import axios from "axios";
import Cookies from "js-cookie";
import { Menubar } from "../../store/Store";
import { useEffect, useState, useContext } from "react";
import Dashboard from "../common/Dashboard";

function AdDashboard() {
  const [visible] = useContext(Menubar);

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const key = Cookies.get("auth");

  useEffect(() => {
    axios
      .get("/api/admin/dashboard", { headers: { auth: key } })
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

  const routes = "Dashboard"
  const title = {first : 'Total Admins', second : 'Total Librarians', third : 'Total Students', fourth : 'Total Books'}
  const links = {first : 'admin', second : '/admin/librarianlist', third : '/admin/studentlist', fourth : '/admin/booklist'}

  return <Dashboard data={[data, loading]}  routes={routes} title={title} links={links} error={error} visible={visible} />;
}
export default AdDashboard;
