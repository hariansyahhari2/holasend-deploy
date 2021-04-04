import React, { useState } from "react";
import swal from "sweetalert"
import { Link } from "react-router-dom"

const Menu = () => {
  const [role] = useState(localStorage.getItem("role"))
  const [username] = useState(localStorage.getItem("username"))

  const handleLogout = (e) => {
    swal({
      title: "Log Out?",
      text: "Are you sure want to log out now?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((logout) => {
        if (logout) {
          localStorage.removeItem("token")
          localStorage.removeItem("role")
          localStorage.removeItem("username")
          window.location.href = "/"
        }
      });
  }

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ backgroundColor: '#152C5B' }}>
      {/* Brand Logo */}
      <div className="brand-link">
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <img
            src="/dist/img/newotw.png"
            alt="hola!"
            className="brand-image img-circle elevation-3"
          />
          <span style={{ color: '#536DFE', fontWeight: 'bold' }}>&nbsp; hola<span className="brand-text font-weight-light" style={{ color: 'white', fontWeight: 'bold' }}>Send!</span></span>
        </Link>
      </div>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="info">
            <a className="d-block">
              &nbsp; {username}
            </a>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Add icons to the links using the .nav-icon class
             with font-awesome or any other icon font library */}
            <li className="nav-item has-treeview" style={{ marginBottom: '3px' }}>
              <a href="#" className="nav-link active" style={{ backgroundColor: '#536DFE' }}>
                <i className="nav-icon fas fa-edit" />
                <p>
                  Tasks
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/dashboard/create-task">
                    <a href="#" className="nav-link">
                      <i className="fas fa-plus nav-icon" />
                      <p>New Task</p>
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/dashboard/unfinished-tasks">
                    <a href="#" className="nav-link">
                      <i className="fas fa-spinner nav-icon" />
                      <p>Unfinished Tasks</p>
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/dashboard/delivered-tasks">
                    <a href="#" className="nav-link">
                      <i className="fas fa-check-square nav-icon" />
                      <p>Delivered Tasks</p>
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item has-treeview" style={{ marginBottom: '3px' }}>
              <a href="#" className="nav-link active" style={{ backgroundColor: '#536DFE' }}>
                <i className="nav-icon fas fa-map-marked-alt" />
                <p>
                  Destinations
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/dashboard/create-destinations">
                    <a href="#" className="nav-link">
                      <i className="fas fa-plus nav-icon" />
                      <p>New Destination</p>
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/dashboard/destinations-list">
                    <a href="#" className="nav-link">
                      <i className="fas fa-list nav-icon" />
                      <p>Destination Lists</p>
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            {
              role == "ADMIN" ?
                <>
                  <li className="nav-item has-treeview" style={{ marginBottom: '3px' }}>
                    <a href="#" className="nav-link active" style={{ backgroundColor: '#536DFE' }}>
                      <i className="nav-icon fas fa-user" />
                      <p>
                        Users
                </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <Link to="/dashboard/user-managements">
                          <a href="#" className="nav-link">
                            <i className="fas fa-users-cog nav-icon" />
                            <p>User Managements</p>
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item has-treeview" style={{ marginBottom: '3px' }}>
                    <a href="#" className="nav-link active" style={{ backgroundColor: '#536DFE' }}>
                      <i className="nav-icon fas fa-copy" />
                      <p>
                        Reports
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <Link to="/dashboard/tasks-report">
                          <a href="#" className="nav-link">
                            <i className="far fa-file nav-icon" />
                            <p>Tasks Report</p>
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </> : <></>
            }
            <li className="nav-item has-treeview" style={{ marginBottom: '3px' }}>
              <a href="#" className="nav-link active" style={{ backgroundColor: '#536DFE' }}>
                <i className="nav-icon fas fa-cogs" />
                <p>
                  Settings
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/dashboard/change-password">
                    <a href="#" className="nav-link">
                      <i className="fas fa-key nav-icon" />
                      <p>Change Password</p>
                    </a>
                  </Link>
                </li>
                {
                  role == "ADMIN" ? 
                  <li className="nav-item">
                  <Link to="/dashboard/radius">
                    <a href="#" className="nav-link">
                    <i class="fas fa-wrench nav-icon" />
                      <p>Radius</p>
                    </a>
                  </Link>
                </li> : <></>
                }
              </ul>   
            </li>
            <li className="nav-item has-treeview" style={{ marginBottom: '3px' }} onClick={handleLogout}>
              <a href="#" className="nav-link active" style={{ backgroundColor: '#536DFE' }}>
                <i className="nav-icon fas fa-sign-out-alt" />
                <p>
                  Log Out
                </p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Menu;
