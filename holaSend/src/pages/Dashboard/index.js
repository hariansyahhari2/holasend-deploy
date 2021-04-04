import React, {useState} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import ErrorDashboard from "../Error/ErrorDashboard";
import ChangePassword from "./Content/ChangePassword";
import CreateDestinations from "./Content/CreateDestinations";
import CreateTask from "./Content/CreateTask/index";
import DestinationsList from "./Content/DestinationsList";
import DashboardCharts from "./Content/index";
import TasksFinished from "./Content/TasksFinished";
import TasksList from "./Content/TasksList";
import TasksUnfinished from "./Content/TasksUnfinished";
import UserManagements from "./Content/UserManagements";
import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";
import {STAFF} from "../../configs/constants/roles/roleConstant";
import Profile from "./Content/Profile";
import Radius from "./Content/Radius";

const Dashboard = () => {
  const [token] = useState(localStorage.getItem("token"))
  const [role] = useState(localStorage.getItem("role"))
  return (
    <div>
      <Header />
      <Menu />
        <Switch>
          <Route path="/dashboard/profile" component={Profile} exact />
          <Route path="/dashboard/change-password" component={ChangePassword} exact />
          <Route path="/dashboard/unfinished-tasks" component={TasksUnfinished} exact />
          <Route path="/dashboard/delivered-tasks" component={TasksFinished} exact />
          <Route path="/dashboard/destinations-list" component={DestinationsList} exact />
          <Route path="/dashboard/create-task" component={CreateTask} exact />
          <Route path="/dashboard/tasks-report" exact render={() => (
              (role == STAFF && token) ?
                  <Redirect to="/dashboard" /> : <TasksList />
          )} />
          <Route path="/dashboard/create-destinations" component={CreateDestinations} exact />
          <Route path="/dashboard/create-destinations/:id" component={CreateDestinations} exact />
          <Route path="/dashboard/user-managements" exact render={() => (
              (role == STAFF && token) ?
                  <Redirect to="/dashboard" /> : <UserManagements />
          )} />
           <Route path="/dashboard/radius" exact render={() => (
              (role == STAFF && token) ?
                  <Redirect to="/dashboard" /> : <Radius />
          )} />
          <Route path="/dashboard" component={DashboardCharts} exact />
          <Route path="/dashboard/*" component={ErrorDashboard} exact />
        </Switch>
      <Footer />
    </div>
  );
};

export default Dashboard;
