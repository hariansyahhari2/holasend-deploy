import React from "react";

const DashboardTask = (props) => {
    return(
        <div
            className="card-body table-responsive p-0"
            style={{ padding: 10 }}>
            <table className="table text-nowrap table-bordered table-head-fixed">
                <thead>
                    <tr>
                        <th>Destination</th>
                        <th>Priority</th>
                        <th>Requested By</th>
                    </tr>
                </thead>
                <tbody>
                {props.datas.map((e) => (
                    <tr>
                        <td>
                            {e.destination.name}
                        </td>
                        <td>{e.priority}</td>
                        <td>
                            {e.requestBy
                                ? e.requestBy
                                    .username
                                : ""}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default DashboardTask