import React from 'react'
import {Navigate} from 'react-router-dom' 

const ProtectedRoute = ({element: Component, ...props}) => {
  return (
   props.loggefIn ? <Component {...props} /> : <Navigate to="/sign-up" />
  )
}

export default ProtectedRoute