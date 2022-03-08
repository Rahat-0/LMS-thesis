import axios from "axios";
import Cookies from "js-cookie";
import { Menubar } from "../../store/Store";
import { useEffect, useState, useContext } from "react";
import Table from "../common/Table";
import { useLocation } from "react-router-dom";

function LibIssueList() {
  const location = useLocation()
  const vpath = location.pathname.split('/')[1]
  const [visible] = useContext(Menubar);

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true)

  const key = Cookies.get("auth");

  useEffect(() => {
    axios
      .get(`/api/book/issue/all`, { headers: { auth: key } })
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

  // issueUser and issueBook should be get from table. which is indeviduals.
  const isseAcceptHandler =()=>{
    axios.post('/api/librarian/issue/recive', {issueUser : data.issueUser, issueBook : data.issueBook}, {headers : {auth : key}})
    .then((result)=>{
      console.log(result.data)
    })
    .catch(err => console.log(err))
  }

  const isseDeleteHandler =()=>{
    axios.post('/api/librarian/issue/reject', {issueUser : data.issueUser, issueBook : data.issueBook}, {headers : {auth : key}})
    .then((result)=>{
      console.log(result.data)
    })
    .catch(err => console.log(err))
  }

  const tableHeader = ["Book", "School ID", "User name", "Issue Date"]
  const routes = "Issues"
  

  return <Table endPoint={vpath} data={[data, loading, isseAcceptHandler, isseDeleteHandler]} tableHeader={[tableHeader]} routes={routes} error={error} visible={visible} />;
}
export default LibIssueList;
