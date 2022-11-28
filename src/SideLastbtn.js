import React from 'react'

function SideLastbtn({key,clicked,areAllClicked}) {
  return (
    <button className='sidelastbtn' key={key} onClick={()=>{clicked(key,'vertical');areAllClicked(key,'vertical')}}></button>
  )
}

export default SideLastbtn