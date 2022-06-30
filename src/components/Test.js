import React, { useState, useEffect } from "react";

function Test() {
 const [user, setUser] = useState([]);

 useEffect(() => {
   const fetchData = async () => {
     const response = await fetch(
       "https://jsonplaceholder.typicode.com/users"
     );
     const newData = await response.json();
     setUser(newData);
   };

   fetchData();
 }, []);

  return (
    <ul>
      {user.slice(0,2).map((item) => (
        <li key={item.id}>
          <p>
       
            <b style={{color:'orange'}}>name : </b>
            {item.name}
          </p>
          <p>
          
            <b style={{color:'red'}}>phone : </b>
            {item.phone}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default Test;
