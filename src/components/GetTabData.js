import React, { useState, useEffect } from "react";
import axios from "axios";
import BarGraph from "./BarGraph";

const GetTabData= () => {
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState("asc")

  const sorting=(col)=>{
      if(order==="asc"){
          const sorted=[...users].sort((a,b)=>a[col].toLowerCase() > b[col].toLowerCase()? 1 : -1 );
          setUsers(sorted);
          setOrder("dsc");
      }
      if(order==="dsc"){
          const sorted=[...users].sort((a,b)=>a[col].toLowerCase() < b[col].toLowerCase()? 1 : -1 );
          setUsers(sorted);
          setOrder("asc");
      }
  };

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
       setUsers(response.data);
       console.log(response, "response");
    }
    );
  }
  ,[]);
  
  

  return (
    <div className="container" >
        <table className="table table-bordered my-5">
        <thead>
          <tr>
            <th>Id</th>
            <th onClick={()=>sorting("name")}>Name</th>
            <th onClick={()=>sorting("username")}>User Name</th>
            <th onClick={()=>sorting("email")}>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => {
            return (
              <tr>
                <td> {item.id} </td>
                <td> {item.name} </td>
                <td> {item.username} </td>
                <td> {item.email} </td>
                <td> {item.address.street + "," + item.address.suite + "," +item.address.city + "," + item.address.zipcode } </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <BarGraph/>
    </div>
    
  );
};

export default GetTabData;