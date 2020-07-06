import React, { Component, useState, useEffect } from 'react';
import axios from '../../config/api';
import {Bar} from 'react-chartjs-2';
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

export default function Reportlink() {
	const [chartData, SetChartData] = useState({})
	const token = useSelector(state => state.auth.token)


	const chart = () => {
		const prodDat = []
        const grapDat = []
        const dateDat = []
		const config = {headers: {Authorization: token}}
		axios.get('/report/line',config)
		.then((res) => {
            grapDat.push(res.data)
			for(const dataObj of res.data){
            
            dateDat.push(dataObj.time)

            }
            console.log(grapDat)
            // console.log(dateDat)
        //     axios.get('/report/count',config)
		// .then((res) => {
		// 	for(const dataObj of res.data){
        //     prodDat.push(dataObj.product_name)

     
        //     }
            

        const renderGrapDat = grapDat.map((data) =>
            {
                return(
                    {
						label: data.product_name,
                        data: [data.total_jual],
                        fill: false,
                        lineTension:0,
						backgroundColor: [
							'rgba(151, 120, 242, 1)',
						],
						borderWidth:4
                    }
                )

            })
            console.log(grapDat)
			SetChartData({
			
				labels: dateDat,
				datasets: [
                        renderGrapDat
				]
			})
        }) .catch(err => console.log(err))
    // })
	// 	.catch(err => console.log(err))


		
	}
		useEffect(() => {
			chart()
		},[])
	
	return(
		<div className="App">
			<div>
			<a className="ml-5 h1">Top Selling By Date</a>
			<Link tag={Link} to ="/report">
			<button  className="btn btn-danger mb-3 btn-lg ml-3">Chart Pie</button>
			</Link>
			</div>
			<div>
				<Bar data={chartData}/>
			</div>
		</div>
	)
}





