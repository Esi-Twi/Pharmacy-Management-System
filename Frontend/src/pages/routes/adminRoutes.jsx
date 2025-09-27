import React from 'react'
import { Route, Router as Routes } from 'react-router-dom'

import AllMedicines from '../Admin/AllMedicines'
import AddMedicine from '../Admin/AddMedicine'
import ManageStaff from '../Admin/ManageStaff'
import UpdateStaff from '../Admin/UpdateStaff'
import AddStaff from '../Admin/AddStaff'
import ViewMore from '../Admin/ViewMore'
import AllSales from '../Admin/AllSales'
import Dashboard from '../Admin/Dashboard'
import DailyReport from '../Admin/DailyReport'
import WeeklyReport from '../Admin/WeeklyReport'
import YearlyReport from '../Admin/YearlyReport'
import MontlyReport from '../Admin/MontlyReport'


function adminRoutes() {
  return (
    <>
      <Route path='/'>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='view-more' element={<ViewMore />} />
      </Route>

      <Route path='/medicine'>
        <Route path='' element={<AllMedicines />} />
        <Route path='add' element={<AddMedicine />} />
      </Route>

      <Route path='/staff'>
        <Route path='' element={<ManageStaff />} />
        <Route path='add' element={<AddStaff />} />
        <Route path='update' element={<UpdateStaff />} />
      </Route>

      <Route path='/sales'>
        <Route path='' element={<AllSales />} />
      </Route>

      <Route path='/reports'>
        <Route path='daily' element={<DailyReport />} />
        <Route path='weekly' element={<WeeklyReport />} />
        <Route path='monthly' element={<MontlyReport />} />
        <Route path='yearly' element={<YearlyReport />} />
      </Route>
    </>


  )
}

export default adminRoutes