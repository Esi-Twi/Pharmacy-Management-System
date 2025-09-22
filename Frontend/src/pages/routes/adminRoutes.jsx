import React from 'react'
import { Route } from 'react-router-dom'

import AllMedicines from '../Admin/AllMedicines'
import AddMedicine from '../Admin/AddMedicine'
import ManageStaff from '../Admin/ManageStaff'
import UpdateStaff from '../Admin/UpdateStaff'
import AddStaff from '../Admin/AddStaff'
import ViewMore from '../Admin/ViewMore'


function adminRoutes() {
  return (
    <Route path='/'>
        <Route path='all-meds' element={<AllMedicines/>}/>
        <Route path='add-med' element={<AddMedicine/>}/>
        <Route path='add-staff' element={<AddStaff/>}/>
        <Route path='staff' element={<ManageStaff/>}/>
        <Route path='update-staff' element={<UpdateStaff/>}/>
        <Route path='view-more' element={<ViewMore/>}/>
    </Route>
  )
}

export default adminRoutes