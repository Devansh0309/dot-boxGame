import React from 'react'

function InnerBox({areAllClicked,key}) {

  return (
    <div className='innerBox' style={{backgroundColor:areAllClicked?'yellow':'grey'}} key={key}>hi{item}</div> 
  )
}

export default InnerBox