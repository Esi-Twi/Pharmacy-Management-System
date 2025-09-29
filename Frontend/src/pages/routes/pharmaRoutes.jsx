import React from 'react'
import { Route } from 'react-router-dom'

import CreateSales from '../Pharmacist/CreateSales'
import TodaySales from '../Pharmacist/TodaySales'
import TicketCheck from '../Pharmacist/TicketCheck'


function pharmaRoutes() {
  return (
    <Route path='/'>
      <Route path='create-sales' element={<CreateSales />} />
      <Route path='today-sales' element={<TodaySales />} />
      <Route path='ticket' element={<TicketCheck />} />
    </Route>
  )
}

export default pharmaRoutes