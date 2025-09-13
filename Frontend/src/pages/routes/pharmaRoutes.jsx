import React from 'react'
import { Route } from 'react-router-dom'




function pharmaRoutes() {
  return (
   <Route path='/'>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='profile' element={<Profile/>}/>
    </Route>
  )
}

export default pharmaRoutes