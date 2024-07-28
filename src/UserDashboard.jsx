import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserList from "./UserList";
import RechartsComponent from "./RechartsComponent";

const UserDashboard = () => {
  const [showUserList, setShowUserList] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const toggleUserList = () => {
    setShowUserList((prev) => !prev);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand">User Dashboard</span>
          <div className="d-flex ms-auto align-items-center">
            <div className="dropdown me-3">
              <button
                className="btn btn-outline-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Menu Options
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => {
                      toggleUserList();
                    }}
                  >
                    User List
                  </a>
                </li>
              </ul>
            </div>
            <button
              className="btn btn-outline-secondary"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container-fluid flex-grow-1 d-flex">
        <div className="bg-light p-4 d-flex flex-column sidebar">
          <h6 className="border-bottom pb-2 mb-3">Menu</h6>
          <a className="sidebar-link mb-2" href="#" onClick={toggleUserList}>
            User List
          </a>
        </div>

        <div className="p-4 flex-grow-1 content-center">
          {showUserList ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "100%" }}
            >
              <UserList />
            </div>
          ) : (
            <RechartsComponent />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
