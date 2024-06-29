import React from 'react'
import "./css/Card.css"
export const Card = ({title,content,backgroundColor,image,border}) => {
  return (
    <> <div className="custom-card" style={{ backgroundColor, border }}>
    <h2 className="card-title">{title}</h2>
    <img  src={image}></img>
    <p className="card-content">{content}</p>
  </div></>
  )
}
