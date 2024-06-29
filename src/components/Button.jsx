import React from 'react'
import "./css/Button.css"
export const Button = ({ onClick, text, color }) => {
  return (
    <>
     <button   className={`custom-button ${color}`} >
      {text}
    </button>
    </>
  )
}
