import React from 'react'

function Sidebtn({key,clicked,areAllClicked}) {
  return (
    <button className='sidebtn' key={key} onClick={()=>{clicked(key,'vertical');areAllClicked(key,'vertical')}}></button>
  )
}

export default Sidebtn