import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2'
import axios from '../../axios/axios'
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
const OrderChart = () => {
    const [data,setData]=useState({})
    const [prevData,setPrevData]=useState({})
    const [loading, setLoading] = useState(true);
    const getSalesData = async () => {
        try {
          const response = await axios.get("/salesChart", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
            },
          });
          if (response.data.success) {
            const chartData = response.data.data.map((item) => item.totalPrice);
            const prevChartData = response.data.prevData.map((item) => item.totalPrice);
    
            setData(chartData);
            setPrevData(prevChartData);
          }
        } catch (error) {
          console.log(error);
        }
        finally {
            setLoading(false); // Set loading to false regardless of success or failure
          }
      };
      useEffect(() => {
        getSalesData();
      }, []);
      const labels =  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const Data = {
        labels,
        datasets: [
          {
            label: 'This year',
            data:data,
            backgroundColor: '#13CACA',
          },
          {
            label: 'Previous year',
            data:prevData,
            backgroundColor: '#09768E',
          },
        ],
      };
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Sales Overview (Yearly Sales Report)',
          },
        },
      };
      
return (
  <>
    <Box>
        {loading ? (
          <p>Loading...</p>
        ) : (
            <Box sx={{width:650,height:350,backgroundColor:'#ffffff'}}>

                <Bar data={Data} options={options} />
            </Box>
        )}
      </Box>
  </>
);
}

export default OrderChart
