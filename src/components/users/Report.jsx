import React, { Component, useState, useEffect } from 'react';
import axios from '../../config/api';
import {Pie} from 'react-chartjs-2';
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

export default function Report() {
	const [chartData, SetChartData] = useState({})
	const token = useSelector(state => state.auth.token)


	const chart = () => {
		const prodDat = []
		const grapDat = []
		const config = {headers: {Authorization: token}}
		axios.get('/report/count',config)
		.then((res) => {
			console.log(res.data)
			for(const dataObj of res.data){
			prodDat.push(dataObj.product_name)
			grapDat.push(parseInt(dataObj.total_jual))
			}
			console.log(prodDat)
			console.log(grapDat)
			SetChartData({
			
				labels: prodDat,
				datasets: [
					{
						label: 'level of thiccness',
						data: grapDat,
						backgroundColor: [
							'rgba(231, 106, 106, 1)',
							'rgba(243, 241, 130, 1)',
							'rgba(130, 179, 243, 1)',
							'rgba(151, 120, 242, 1)',
							'rgba(147, 242, 120, 1)',
							'rgba(242, 165, 120, 1)'
	
	
						],
						borderWidth:4
					}
				]
			})
		})
		.catch(err => console.log(err))


		
	}
		useEffect(() => {
			chart()
		},[])
	
	return(
		<div className="App">
			<div>
			<a className="ml-5 h1">Top Selling Products</a>
			<Link tag={Link} to ="/line">
			<button  className="btn btn-danger mb-3 btn-lg ml-3">Chart Line</button>
			</Link>
			</div>
			<div>
				<Pie data={chartData}/>
			</div>
		</div>
	)
}





