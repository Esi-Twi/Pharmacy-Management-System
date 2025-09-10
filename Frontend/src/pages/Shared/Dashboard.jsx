import React from 'react'


import PharmaSideNav from '../Pharmacist/PharmaSideNav'
import AdminSideNav from '../Admin/AdminSideNav'

/*
----------dashboard for pharmacist----------------
-----functions-----
1. create new sales
2. get all sales and filter by date and drug for current day
3. look up sales receipt for current day
-Sales Page – generate receipt
-Stock Update Page – update quantities when sold, view drugs, search drugs
-Sales History Page – lookup previous transactions for current day



----------------prompt 
write code so that i want to create a dashboard with the sidebar full width static and doesn't scroll but only scorll inside 
with a content page right beside it which is open when click on the siebar but has a default page 
i have a dashboard page that will takt eh sidebar and display a content based on the role fo the 
im using react js tailwind write cliean neate and simple code 
*/


function Dashboard() {
  const role = JSON.parse(localStorage.getItem('user')).role
  
  return (
    <div>

      {role === 'Pharmacist' ? <PharmaSideNav /> : <AdminSideNav />}



    </div>
  )
}

export default Dashboard