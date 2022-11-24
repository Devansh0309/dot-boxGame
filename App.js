
import { useEffect, useRef, useState } from 'react';
import './App.css';





function App() {
  const[sel,setSelect]=useState('')
 const [row,setRow]=useState(0)
 const [col,setCol]=useState(0)
 const [Box,setBox]=useState([])



  const makeBox=(e)=>{
    setBox([])
    setSelect(e.target.value)
  }

useEffect(()=>{
  
  let rc=sel.split("").map(Number)
  
 setCol(rc[1])
 setRow(rc[0])

 
console.log("rc",rc,"r","c",row,col)
},[sel])


useEffect(()=>{
  let arr=[]
for(let i=0;i<row*col+row+col;i++){
  arr.push(i)
  }
setBox(arr)
},[row,col])

const GridStyle={
  gridTemplateColumn:`repeat(${col},1fr)`,
  // border:"1px solid red"
}


  return (
    <div className="App">
     <select onChange={makeBox} >
      <option>select size here</option>
<option value="23">2 x 3</option>
<option value="34">3 x 4</option>
     </select>


  <div className='gridBox' 
  style={{display:"grid",
  gridTemplateColumns:`repeat(${col+1},1fr)`}}
  >
{
Box.map((item)=>
  item%(col+1) ===col?
  <div className='onebox'>
    <button className='sidelastbtn'></button></div> :
    item>=row*(col+1)?
    <div className='onebox' ><button className='upperbtn' > </button></div>
    :<div key={item} className='onebox'>
    <button className='upperbtn'></button>
   <box  style={{display:"flex",height:"80%"}}> 
   <button className='sidebtn'></button>
  <div className='innerBox'>hi{item} </div>
  </box>
  </div>
)

  }
    </div>




      
    </div>
  );
}

export default App;
