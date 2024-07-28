import React, { useEffect, useState } from "react";
import { fetchUsers, createUser, updateUser, deleteUser } from "./api";
import UserForm from "./UserForm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const sortedUsers = await fetchUsers();
      setUsers(sortedUsers);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setFormKey(formKey + 1);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      loadUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      if (currentUser) {
        await updateUser(currentUser.userId, values);
      } else {
        await createUser(values);
      }
      loadUsers();
      resetForm();
      setCurrentUser(null);
      setFormKey(formKey + 1);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container mt-5">
      <UserForm
        key={formKey}
        initialValues={currentUser || {}}
        onSubmit={handleFormSubmit}
      />
      <div className="table-responsive mt-5">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>User ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm mr-8"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.userId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
