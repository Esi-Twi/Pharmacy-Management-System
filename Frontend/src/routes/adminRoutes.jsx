import React from 'react'
import { Route, Router as Routes } from 'react-router-dom'

import AllMedicines from '../pages/Admin/AllMedicines'
import AddMedicine from '../pages/Admin/AddMedicine'
import ManageStaff from '../pages/Admin/ManageStaff'
import AddStaff from '../pages/Admin/AddStaff'
import ViewMore from '../pages/Admin/ViewMore'
import AllSales from '../pages/Admin/AllSales'
import Dashboard from '../pages/Admin/Dashboard'
import DailyReport from '../pages/Admin/DailyReport'
import WeeklyReport from '../pages/Admin/WeeklyReport'
import YearlyReport from '../pages/Admin/YearlyReport'
import MontlyReport from '../pages/Admin/MontlyReport'


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