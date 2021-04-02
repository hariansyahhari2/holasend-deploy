import React, {useState} from 'react'
import { Doughnut } from '@reactchartjs/react-chart.js'

const DoughnutChart = ({data}) => (
    <Doughnut data={data} className="mt-2" />
)

export default DoughnutChart