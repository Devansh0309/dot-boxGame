
import { useEffect, useRef, useState } from 'react';
import './App.css';
// import InnerBox from './InnerBox';
// import Sidebtn from './Sidebtn';
// import SideLastbtn from './SideLastbtn';
// import Upperbtn from './Upperbtn';



function App() {
  const[sel,setSelect]=useState('')
 const [row,setRow]=useState(0)
 const [col,setCol]=useState(0)
 const [Box,setBox]=useState([])
 const [horizontalButtons,setHorizontalButtons]=useState([])
 const [verticalButtons,setVerticalButtons]=useState([])
 const [squaresColors,setSquareColors]=useState([])

  // const makeBox=(e)=>{
  //   setBox([])
  //   setSelect(e.target.value)
  // }

useEffect(()=>{
  
 setCol(sel.split("*").map(Number)[1])
 setRow(sel.split("*").map(Number)[0])

},[sel])


useEffect(()=>{
  let arr=[];
  let horizontal=[]
  let vertical=[]
  let squares=[]
  for(let i=0;i<row*col+row+col;i++){
    arr.push(i)
  }
  for(let i=0;i<row*col+col;i++){
    horizontal.push({key:i,type:'horizontal',isClicked:false})
  }
  for(let i=0;i<row*col+row;i++){
    vertical.push({key:i,type:'vertical',isClicked:true})
  }
  for(let i=0;i<row*col;i++){
    squares.push({allClicked:false})
  }
  setHorizontalButtons(horizontal)
  setVerticalButtons(vertical)
  setSquareColors(squares)
  setBox(arr)
  // let rc=sel.split("*").map(Number)
  // console.log("rc",rc,"r","c",row,col)
},[sel,row,col])

// useEffect(()=>{
//   console.log(squaresColors)
//   console.log(Box)
// },[squaresColors,Box])

const areAllClicked=(id,type)=>{
  //type:'vertical' or 'horizontal'
  // id : key of buttons
  //put square formed function in dotsAndDashes.java
  // console.log('Inside areAllClicked')
  if(type==='horizontal'){
    if(Math.floor(id/col)===0){
      if(horizontalButtons[id].isClicked && horizontalButtons[id+col].isClicked && verticalButtons[id].isClicked && verticalButtons[id+1].isClicked){
        let temp=[...squaresColors]
        temp[id].allClicked=true
        setSquareColors(temp)
      }
    }
    else if(Math.floor(id/col)===row){
      if(horizontalButtons[id-col].isClicked && horizontalButtons[id].isClicked && verticalButtons[id-col+row-1].isClicked && verticalButtons[id-col+row].isClicked){
        let temp=[...squaresColors]
        temp[id-col].allClicked=true
        setSquareColors(temp)
      }
    }
    else{
      if((horizontalButtons[id-col].isClicked && horizontalButtons[id].isClicked && verticalButtons[id-col+Math.floor(id/col)-1].isClicked && verticalButtons[id-col+Math.floor(id/col)].isClicked) && (!horizontalButtons[id].isClicked || !horizontalButtons[id+col].isClicked || !verticalButtons[id+Math.floor(id/col)].isClicked || !verticalButtons[id+Math.floor(id/col)+1].isClicked)){//first row upper btn id provided
        let temp=[...squaresColors]
        temp[id-col].allClicked=true
        setSquareColors(temp)
      }
      else if((!horizontalButtons[id-col].isClicked || !horizontalButtons[id].isClicked || !verticalButtons[id-col+Math.floor(id/col)-1].isClicked || !verticalButtons[id-col+Math.floor(id/col)].isClicked) && (horizontalButtons[id].isClicked && horizontalButtons[id+col].isClicked && verticalButtons[id+Math.floor(id/col)].isClicked && verticalButtons[id+Math.floor(id/col)+1].isClicked)){
        //last row lower btn id provided
        let temp=[...squaresColors]
        temp[id].allClicked=true
        setSquareColors(temp)
      }
      else if((horizontalButtons[id-col].isClicked && horizontalButtons[id].isClicked && verticalButtons[id-col+Math.floor(id/col)-1].isClicked && verticalButtons[id-col+Math.floor(id/col)].isClicked) && (horizontalButtons[id].isClicked && horizontalButtons[id+col].isClicked && verticalButtons[id+Math.floor(id/col)].isClicked && verticalButtons[id+Math.floor(id/col)+1].isClicked)){
        //middle row (not first and not last) btn id provided
        let temp=[...squaresColors]
        temp[id].allClicked=true
        temp[id-col].allClicked=true
        setSquareColors(temp)
      }
    }
  }
  else{
    if(Math.floor(id/(col+1))===0){//first column upper btn id provided

    }
    else if(Math.floor(id/(col+1))===col){//last column lower btn id provided

    }
    else{//middle column (not first and not last) btn id provided

    }
  }
}

const setClick=(id,type)=>{
  // console.log('Inside setClick')
  if(type==='horizontal'){
    let temp=[...horizontalButtons]
    temp[id].isClicked=true
    setHorizontalButtons(temp)
    //or this?
    // setHorizontalButtons(...horizontalButtons,{key:id,type:'horizontal',isClicked:true})
  }
  else{
    let temp=[...verticalButtons]
    temp[id].isClicked=true
    setVerticalButtons(temp)
    //or this?
    // setHorizontalButtons(...horizontalButtons,{key:id,type:'horizontal',isClicked:true})
  }
}
const GridStyle={
  gridTemplateColumn:`repeat(${col},1fr)`,
  // border:"1px solid red"
}
  return (
    <div className="App">
     <select onChange={(e)=>{setBox([]);
    setSelect(e.target.value)
     }} >
      <option>select size here</option>
<option value="2*3">2 x 3</option>
<option value="3*4">3 x 4</option>
     </select>


  <div className='gridBox' 
  style={{display:"grid",
  gridTemplateColumns:`repeat(${col+1},1fr)`}}
  >
{
Box.map((item)=>
  item%(col+1) ===col?
  <div className='onebox'>

    <button className='sidelastbtn' key={item} onClick={()=>{setClick(item,'vertical');areAllClicked(item,'vertical')}}></button>
    {/* <SideLastbtn key={item} clicked={setClick} areAllClicked={areAllClicked}/> */}

  </div> :item>=row*(col+1)?
    <div className='onebox'>

      <button className='upperbtn' key={item-Math.floor(item/(col+1))} onClick={()=>{setClick(item-Math.floor(item/(col+1)),'horizontal');areAllClicked(item-Math.floor(item/(col+1)),'horizontal')}}></button>
      {/* <Upperbtn key={item-Math.floor(item/(col+1))} clicked={setClick} areAllClicked={areAllClicked}/> */}

    </div>
   :<div key={item} className='onebox'>

      {/* <Upperbtn key={item-Math.floor(item/(col+1))} clicked={setClick}/> */}
      <button className='upperbtn' key={item-Math.floor(item/(col+1))} onClick={()=>{setClick(item-Math.floor(item/(col+1)),'horizontal');areAllClicked(item-Math.floor(item/(col+1)),'horizontal')}}></button>

      <div  style={{display:"flex",height:"80%"}}>

        <button className='sidebtn' key={item} onClick={()=>{setClick(item,'vertical');areAllClicked(item,'vertical')}}></button>
        {/* <Sidebtn key={item} clicked={setClick} areAllClicked={areAllClicked}/> */}

        <div className='innerBox' style={{backgroundColor:squaresColors[item-Math.floor(item/(col+1))].allClicked?'yellow':'lightgrey'}}>hi{item}</div>
        {/* <InnerBox areAllClicked={squaresColors[item].allClicked} key={item}/> */}
      </div>
    </div>
)

  }
    </div>
    {/* Idea for rendering square color on click of all neighbouring buttons: Create react components for four buttons surrounding innerbox or square which is to be colored and pass 'isClicked' prop to Button component i.e. <Button isClicked={}/> and from Button Component pass result of isClicked to a function in App.js whose result of allButtons clicked is passed as a prop to innerBox React component and then if allButtons clicked is true then change color of innerBox from innerBox react component there itself  */}
    </div>
  );
}
export default App;
