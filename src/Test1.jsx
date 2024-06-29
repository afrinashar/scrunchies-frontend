import React from 'react'

export const Test1 = () => {
const json=[
    {"id":0, "name": "Hi"},
    {"id":1, "name": "H"}
 ]

  return (
    <div>Test1{json}</div>

    {json.map((data)=> {return
       (<>{data.id}</>)
    })}
  )
}
