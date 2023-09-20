import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Update = () => {
  const storedUser = useLoaderData();

  const [user, setUser] = useState(storedUser);

  const handleUpdateUser = (event) => {
    event.preventDefault();
    // console.log(user);

    fetch(`http://localhost:5000/users/${storedUser._id}`, {
        method: "PUT", 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.modifiedCount > 0){
            alert(`User Updated Successfully`)
        }
    })


  };

  const handleInputChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const newUser = { ...user };
    newUser[field] = value;
    setUser(newUser);
  };
  return (
    <div>
      <h1>Update users</h1>

      <form onSubmit={handleUpdateUser}>
        <input
          onBlur={handleInputChange}
          type="text"
          name="name"
          placeholder="name"
          defaultValue={storedUser.name}
        />{" "}
        <br />
        <input
          onBlur={handleInputChange}
          type="email"
          name="email"
          placeholder="email"
          defaultValue={storedUser.email}
        />{" "}
        <br />
        <button type="submit">Update User</button>
      </form>

      <br />
      <br />
      <Link to="/">
        <button>View All Users</button>
      </Link>
    </div>
  );
};

export default Update;
