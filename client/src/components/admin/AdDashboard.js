import axios from "axios";
import Cookies from "js-cookie";
import { Menubar } from "../../store/Store";
import { useEffect, useState, useContext } from "react";
import Dashboard from "./Dashboard";

function AdDashboard() {
  const [visible] = useContext(Menubar);

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const key = Cookies.get("auth");

  useEffect(() => {
    axios
      .get("/api/admin/dashboard", { headers: { auth: key } })
      .then((result) => {
        if (result.data.error) {
            
        } else {
          setData(result.data);
          console.log("renderd")
        }
      })
      .catch((err) => {
        console.log("custom error here" + err);
        setError(err);
      });
  }, []);

  const routes = "Dashboard"

  return <Dashboard data={[data]}  routes={routes} error={error} visible={visible} />;
}
export default AdDashboard;
