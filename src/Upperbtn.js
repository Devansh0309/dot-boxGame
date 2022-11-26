import React from 'react'

function Upperbtn({key,clicked,areAllClicked}) {
  return (
        <button className='upperbtn' key={key} onClick={()=>{clicked(key,'horizontal');areAllClicked(key,'horizontal')}}> </button>
  )
}

export default Upperbtn