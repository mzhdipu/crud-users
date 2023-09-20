import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Home = () => {
  const users = useLoaderData();
  const [displayUsers, setDisplayUsers] = useState(users);

  const handleDelete = (user) => {
    console.log(user._id);
    const agreed = window.confirm(`Are you wnat to Delete User`);

    if (agreed) {
      // console.log(`${user.name} Deleted Successfully!`)

      fetch(`http://localhost:5000/users/${user._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert(`User Deleted Successfully`);

            // instent Delete and remove from UI
            const remainingUsers = displayUsers.filter(
              (dusers) => dusers._id !== user._id
            );
            setDisplayUsers(remainingUsers);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUpdate = (user) => {
    console.log(user._id);
  };

  return (
    <div>
      <h1>Total Users : {displayUsers.length}</h1>
      {displayUsers.map((user) => (
        <p key={user._id}>
          {user.name} : {user.email}
          <Link to={`/users/${user._id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => handleDelete(user)}>X</button>
        </p>
      ))}

      <Link to="/add">
        <button>Add New User</button>
      </Link>
    </div>
  );
};

export default Home;
