import React from 'react'
import { Route } from 'react-router-dom'

import AllMedicines from '../Admin/AllMedicines'
import AddMedicine from '../Admin/AddMedicine'

function adminRoutes() {
  return (
    <Route path='/'>
        <Route path='all-meds' element={<AllMedicines/>}/>
        <Route path='add-med' element={<AddMedicine/>}/>
    </Route>
  )
}

export default adminRoutes