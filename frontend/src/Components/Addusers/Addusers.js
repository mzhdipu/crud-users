import React, { useState } from "react";
import { Link } from "react-router-dom";

const Addusers = () => {
  const [users, setUsers] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(users);

    fetch(`http://localhost:5000/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(users),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.acknowledged) {
          alert(`User Added Sucessfully`);
          event.target.reset();
        }
      });
  };

  const handleInputBlur = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const newUser = { ...users };
    newUser[field] = value;
    setUsers(newUser);
  };

  return (
    <div>
      <h1>Please Add New Users</h1>

      <form onSubmit={handleSubmit}>
        <input
          onBlur={handleInputBlur}
          type="text"
          name="name"
          placeholder="name"
        />{" "}
        <br />
        <input
          onBlur={handleInputBlur}
          type="email"
          name="email"
          placeholder="email"
        />{" "}
        <br />
        <button type="submit">Add User</button>
      </form>

      <br />
      <br />
      <Link to="/">
        <button>View All Users</button>
      </Link>
    </div>
  );
};

export default Addusers;
