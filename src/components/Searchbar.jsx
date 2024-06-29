import React, { useState } from 'react'
import { Dashboard } from '../pages/Dashboard'

export const Searchbar = () => {
    const [search,setSearch]=useState("")
const onSearch=(e)=>{
  const Lower=e.target.value.toLowerCase()
  setSearch(Lower)
}
  return (
    <><input type='search' onChange={(e)=>onSearch(e)} ></input>{search}
    
  

    
     </>
 
 
  )
}
