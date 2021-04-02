import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getChartsTaskAction, getChartsUserAction } from "../../../configs/actions/charts/chartsAction";
import UserChart from "./Charts"
import {DashboardTask} from "../../../components/atoms";

const DashboardCharts = (props) => {
  const [username] = useState(localStorage.getItem("username"))
  const [dataChartUser, setDataChartUser] = useState({
    labels: [],
    datasets: [
      {
        label: '# of Votes',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      }
    ],
  })
  const [dataChartTask, setDataChartTask] = useState({
    labels: [],
    datasets: [
      {
        label: '# of Votes',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      }
    ],
  })

  const [lastRequest, setLastRequest] = useState([])
  const [lastPickup, setLastPickup] = useState([])
  const [lastDelivered, setLastDelivered] = useState([])
  const [dataStatus] = useState([
    "WAITING",
    "ASSIGNED",
    "PICKUP",
    "DELIVERED"
  ])
  const [dataRole] = useState([
    "ADMIN",
    "STAFF",
    "COURIER",
    "UNASSIGED",
    "DISABLED"
  ])

  useEffect(() => {
    onReload()
  }, [])

  useEffect(() => {
    if (props.chartUser) {
      setDataChartUser({...dataChartUser, ['labels']: dataRole, ['datasets']: [{
          label: '# of Votes',
          data: Object.values(props.chartUser),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        }]   
      })
    }

    if (props.chartTask) {
      setDataChartTask({...dataChartTask, ['labels']: dataStatus, ['datasets']: [{
        label: '# of Votes',
        data: Object.values(props.chartTask),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      }]   
    })

      setLastRequest(props.chartTask.lastRequest)
      setLastPickup(props.chartTask.lastPickup)
      setLastDelivered(props.chartTask.lastDelivered)
    }
  }, [props.chartUser, props.chartTask])

  const onReload = () => {
    props.dispatchGetChartsUserAction()
    props.dispatchGetChartsTaskAction()
  }

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container" style={{ marginTop: '50px' }}>
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Hello {username}!</h1>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-6 col-sm-12">
              <div class="card">
                <div class="card-header">Users Charts</div>
                <div class="card-body">
                  <UserChart data={dataChartUser}/>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div class="card">
                <div class="card-header">Tasks Charts</div>
                <div class="card-body">
                  <UserChart data={dataChartTask} />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="card">
                <div className="card-header">Last 5 Requested Task</div>
                <div className="card-body">
                  <DashboardTask datas={lastRequest} />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="card">
                <div className="card-header">Last 5 Picked Up Task</div>
                <div className="card-body">
                  <DashboardTask datas={lastPickup} />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="card">
                <div className="card-header">Last 5 Delivered Task</div>
                <div className="card-body">
                  <DashboardTask datas={lastDelivered} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// reducer
const mapStateToProps = (state) => {
  return {
      chartUser: state.getChartsUserReducer.data,
      chartTask: state.getChartsTaskReducer.data,
      isLoading: state.getChartsUserReducer.isLoading || state.getChartsTaskReducer.isLoading,
      error: state.getChartsUserReducer.error || state.getChartsTaskReducer.error
  }
}

// action
const mapDispatchToProps = {
  dispatchGetChartsUserAction: getChartsUserAction,
  dispatchGetChartsTaskAction: getChartsTaskAction
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCharts);