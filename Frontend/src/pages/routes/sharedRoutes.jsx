import React from 'react'
import { Route } from 'react-router-dom'


import Dashboard from '../Shared/Dashboard'
import Profile from '../Shared/Profile'

function sharedRoutes() {
  return (
    <Route path='/'>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='profile' element={<Profile/>}/>
    </Route>
  )
}

export default sharedRoutes