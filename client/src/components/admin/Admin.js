import React from "react";
import "../../assets/css/common.module.css";
import AdminNavber from "./AdminNavber";
import Menus from "./Menus";
import Table from "./Table";

function Admin() {
  const [visible, setVisible] = React.useState(true)
  console.log(visible)
  
  return (
    <div>
      <AdminNavber  />
      <Menus states ={[visible, setVisible]} />
      <Table states ={[visible]} />
    </div>
  );
}

export default Admin;
