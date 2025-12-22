import React from 'react'
import { Route } from 'react-router-dom'


import Profile from '../pages/Shared/Profile'

function sharedRoutes() {
  return (
    <Route path='/'>
      <Route path='profile' element={<Profile />} />
    </Route>
  )
}

export default sharedRoutes