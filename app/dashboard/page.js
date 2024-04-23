"use client"


import { useQuery } from '@tanstack/react-query';
import { Chart } from 'primereact/chart';
import { useState } from 'react';
import { Select,SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import axios from 'axios';
import EmailsList from './components/emailsList';
import UsersList from './components/usersList';


export default function page() {

    const [range, setRange] = useState({
      options: {
        range: 7,
        increment: 1
      }
    })

    const [selectValue, setSelect] = useState("")
    

    function handleSelectChange(e){
      setSelect(e.target.value)
      if(e.target.value == "lastYear"){
        setRange({
          options: {
            range: 365,
            increment: 30,
            month: true
          }
        })

      }
      else if(e.target.value == "lastMonth"){
        setRange({
          options: {
            range: 90,
            increment: 30,
            month: true
          }
        })
      }
      else{
        setRange({
          options: {
            range: 7,
            increment: 1
          }
        })
      }
    }


    function formatDate(date) {
      var dd = date.getDate() + 1
      var mm = date.getMonth() + 1;
      var yyyy = date.getFullYear();
      if (dd < 10) {
        dd = '0' + dd
      }
      if (mm < 10) {
        mm = '0' + mm
      }
      date = mm + '/' + dd + '/' + yyyy;
      let dateiso = new Date(date)
      return dateiso.toISOString()
    }

    function Period(range) {
      var result = [];

      for (var i = 0; i < range.options.range; i += range.options.increment) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        result.push(formatDate(d))
      }
      
      return (result);
    }

    const {data: stats, isLoading, isError} = useQuery({
      queryKey: [range],
      queryFn: async () => {
        let dates = Period(range)
        const { data } = await axios.post("/api/getEmails", { dates: dates })
        return data.data
      }
    })
    


    const [labels, setLabels] = useState(() => {
      return getlabels(range)
    })
    
  
    function getlabels(range){
      let label = []
   
      for (let i = 0; i < range.options.range; i += range.options.increment) {
        var d = new Date();
        if(range.options.month){
          d.setDate(d.getMonth() - i);
          label.push(d.getMonth() + 1)
        }
        else{
          d.setDate(d.getDate() - i);
          label.push(d.getDate())
        }
      }
 
      return label
    }



    const [chartOptions, setChartOptions] = useState({
        scales: {
            y: {
                beginAtZero: true
            }
        }
    });

    

  return (

    <div className='p-[30px]'>
      <p className="md:text-5xl font-bold mb-[40px] hero-text">Dashboard</p>
      {isLoading ? 
        <div className='flex items-center justify-center'>
          <l-trefoil
            size="80"
            stroke="4"
            stroke-length="0.15"
            bg-opacity="0.1"
            speed="1.4"
            color="white" 
          ></l-trefoil> 
      
        </div>
        : 
        <div className='p-5 mx-auto'>
        <div className='w-[100%]'>
          <p className="md:text-xl">Statistics</p>
          <div className='lg:flex gap-4 items-stretch'>
            <Table className='flex-1 mt-5' hideHeader topContent={
              
                <Select label="Data Range" placeholder="Select a range" onChange={handleSelectChange} selectedKeys={[selectValue]}>
                      <SelectItem key={"lastWeek"} value={"lastWeek"}>
                        Last Week
                      </SelectItem>
                      <SelectItem key={"lastMonth"} value={"lastMonth"}>
                        Last Month
                      </SelectItem>
                      <SelectItem key={"lastYear"} value={"lastYear"}>
                        Last Year
                      </SelectItem>
                </Select>
            
            }>
              <TableHeader>
                <TableColumn>
                  Chart
                </TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                      <Chart className='mx-auto w-full h-full mb-[40px]' type="bar" data={
                        {
                          labels: getlabels(range),
                          datasets: [
                              {
                                  label: 'Emails Sent',
                                  data: stats,
                                  backgroundColor: [
                                      'rgba(255, 159, 64, 0.2)',
                                      'rgba(75, 192, 192, 0.2)',
                                      'rgba(54, 162, 235, 0.2)',
                                      'rgba(153, 102, 255, 0.2)'
                                    ],
                                    borderColor: [
                                      'rgb(255, 159, 64)',
                                      'rgb(75, 192, 192)',
                                      'rgb(54, 162, 235)',
                                      'rgb(153, 102, 255)'
                                    ],
                                    borderWidth: 1
                                  }
                              ]
                          }
                      } 
                      options={chartOptions}
                      />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className='flex-1 mt-5'>
              <div className='grid h-[100%] grid-cols-2 gap-4'>
                  <div className='bg-gradient-to-r from-violet-500 to-fuchsia-500 h-full min-h-[150px] rounded-3xl'>ff</div>
                  <div className='bg-gradient-to-r from-cyan-500 to-blue-500 h-full min-h-[150px] rounded-3xl'>ff</div>
                  <div className='bg-gradient-to-r from-sky-500 to-indigo-500 h-full min-h-[150px] rounded-3xl'>ff</div>
                  <div className='bg-gradient-to-r from-purple-500 to-pink-500 h-full min-h-[150px] rounded-3xl'>ff</div>
              </div>
            </div>
          </div>
          
          <p className="md:text-xl">Email Sent</p>

          <EmailsList/>

          <p className="md:text-xl mt-[50px]">Users</p>

          <UsersList/>
          
            
        </div>
        
      </div>
      }
    </div>
      
    
    
  )
}