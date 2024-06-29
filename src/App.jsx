//import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router'
import { Dashboard } from './pages/Dashboard'
import   Cart  from './pages/Cart'
import Delete from './pages/Delete'
import Update from './pages/Update'
import { Admin } from './Admin'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ProductGallery from './Test'
import OrdersPage from './pages/Orders'
import { Create } from './pages/Create'
import { QueryClient, QueryClientProvider } from 'react-query'
 
 const queryClient = new QueryClient()
function App() {
 
  return (
    <>
    <QueryClientProvider client={queryClient} contextSharing={true}> 
     <Routes>
      <Route exact path="/"  element={<Dashboard/>} /> 
      <Route exact path="/cart"  element={<Cart/>} /> 
      <Route exact path="/orders"  element={<OrdersPage/>} /> 

      <Route exact path="/sdmin"  element={<Admin/>} /> 
      <Route exact path="/signup"  element={<SignUp/>} /> 
      <Route exact path="/signin"  element={<SignIn/>} /> 
      <Route exact path="/create"  element={<Create/>} /> 

{/* 
      <Route path="/update/:id" element={<Update/>} />*/}
      <Route path="/items/:id" element={<Delete/>} /> 
    </Routes>
   </QueryClientProvider> </>
  )
}

export default App
