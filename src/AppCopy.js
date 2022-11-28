
import { useEffect, useRef, useState } from 'react';
import './App.css';
// import InnerBox from './InnerBox';
// import Sidebtn from './Sidebtn';
// import SideLastbtn from './SideLastbtn';
// import Upperbtn from './Upperbtn';



function AppCopy() {
  const[sel,setSelect]=useState('Select size here')
 const [row,setRow]=useState(0)
 const [col,setCol]=useState(0)
 const [Box,setBox]=useState([])
 const [horizontalButtons,setHorizontalButtons]=useState([])
 const [verticalButtons,setVerticalButtons]=useState([])
 const [squaresColors,setSquareColors]=useState([])
 const [numberOfSquares,setNumberOfSquares]=useState(0)
 const [player1Score,setPlayer1Score]=useState(0)
 const [player2Score,setPlayer2Score]=useState(0)
//  const [firstTime,setFirstTime]=useState(true)
 const [player,setPlayer]=useState('1')


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
  setNumberOfSquares(0)
  setPlayer1Score(0)
  setPlayer2Score(0)
  setPlayer('1')
  // let rc=sel.split("*").map(Number)
  // console.log("rc",rc,"r","c",row,col)
},[row,col])

// useEffect(()=>{
//   console.log(squaresColors)
//   console.log(Box)
// },[squaresColors,Box])

// useEffect(()=>{
//   // console.log(numberOfSquares)
//   console.log('Player1 Score:'+ player1Score,'Player2 Score:'+ player2Score)
// },[numberOfSquares])

const areAllClicked=(id,type,player)=>{
  //type:'vertical' or 'horizontal'
  // id : key of buttons
  //put square formed function in dotsAndDashes.java
  // console.log('Inside areAllClicked')
  
  if(type==='horizontal'){
    if(Math.floor(id/col)===0){
      if(horizontalButtons[id].isClicked && horizontalButtons[id+col].isClicked && verticalButtons[id].isClicked && verticalButtons[id+1].isClicked){
        let temp=[...squaresColors]
        temp[id].allClicked=true
        if(player==='1'){
          setPlayer1Score(player1Score+1)
        }
        else{
          setPlayer2Score(player2Score+1)
        }
        setSquareColors(temp)
        setNumberOfSquares(numberOfSquares+1)
      }
      else{
        setPlayer(player==='1'?'2':'1')
      }
    }
    else if(Math.floor(id/col)===row){
      if(horizontalButtons[id-col].isClicked && horizontalButtons[id].isClicked && verticalButtons[id-col+row-1].isClicked && verticalButtons[id-col+row].isClicked){
        let temp=[...squaresColors]
        temp[id-col].allClicked=true
        if(player==='1'){
          setPlayer1Score(player1Score+1)
        }
        else{
          setPlayer2Score(player2Score+1)
        }
        setSquareColors(temp)
        setNumberOfSquares(numberOfSquares+1)
      }
      else{
        setPlayer(player==='1'?'2':'1')
      }
    }
    else{
      if((horizontalButtons[id-col].isClicked && horizontalButtons[id].isClicked && verticalButtons[id-col+Math.floor(id/col)-1].isClicked && verticalButtons[id-col+Math.floor(id/col)].isClicked) && (!horizontalButtons[id].isClicked || !horizontalButtons[id+col].isClicked || !verticalButtons[id+Math.floor(id/col)].isClicked || !verticalButtons[id+Math.floor(id/col)+1].isClicked)){//first row upper btn id provided
        let temp=[...squaresColors]
        temp[id-col].allClicked=true
        if(player==='1'){
          setPlayer1Score(player1Score+1)
        }
        else{
          setPlayer2Score(player2Score+1)
        }
        setSquareColors(temp)
        setNumberOfSquares(numberOfSquares+1)
      }
      else if((!horizontalButtons[id-col].isClicked || !horizontalButtons[id].isClicked || !verticalButtons[id-col+Math.floor(id/col)-1].isClicked || !verticalButtons[id-col+Math.floor(id/col)].isClicked) && (horizontalButtons[id].isClicked && horizontalButtons[id+col].isClicked && verticalButtons[id+Math.floor(id/col)].isClicked && verticalButtons[id+Math.floor(id/col)+1].isClicked)){
        //last row lower btn id provided
        let temp=[...squaresColors]
        temp[id].allClicked=true
        if(player==='1'){
          setPlayer1Score(player1Score+1)
        }
        else{
          setPlayer2Score(player2Score+1)
        }
        setSquareColors(temp)
        setNumberOfSquares(numberOfSquares+1)
      }
      else if((horizontalButtons[id-col].isClicked && horizontalButtons[id].isClicked && verticalButtons[id-col+Math.floor(id/col)-1].isClicked && verticalButtons[id-col+Math.floor(id/col)].isClicked) && (horizontalButtons[id].isClicked && horizontalButtons[id+col].isClicked && verticalButtons[id+Math.floor(id/col)].isClicked && verticalButtons[id+Math.floor(id/col)+1].isClicked)){
        //middle row (not first and not last) btn id provided
        let temp=[...squaresColors]
        temp[id].allClicked=true
        temp[id-col].allClicked=true
        if(player==='1'){
          setPlayer1Score(player1Score+2)
        }
        else{
          setPlayer2Score(player2Score+2)
        }
        setSquareColors(temp)
        setNumberOfSquares(numberOfSquares+2)
      }
      else{
        setPlayer(player==='1'?'2':'1')
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
      setSelect(e.target.value);
      setNumberOfSquares(0)
     }}>
      <option>Select size here</option>
      <option value="2*3">2 x 3</option>
      <option value="3*4">3 x 4</option>
      <option value="7*8">7 x 8</option>
     </select>

  {numberOfSquares<row*col?
  <div className='gridBox' 
  style={{display:"grid",
  gridTemplateColumns:`repeat(${col+1},1fr)`}}
  >
  {
  Box.map((item)=>
  item%(col+1) ===col?
  <div className='onebox'>

    <button className='sidelastbtn' key={item} onClick={()=>{setClick(item,'vertical');areAllClicked(item,'vertical',player)}}></button>
    {/* <SideLastbtn key={item} clicked={setClick} areAllClicked={areAllClicked}/> */}

  </div> :item>=row*(col+1)?
    <div className='onebox'>

      <button className='upperbtn' key={item-Math.floor(item/(col+1))} onClick={()=>{setClick(item-Math.floor(item/(col+1)),'horizontal');areAllClicked(item-Math.floor(item/(col+1)),'horizontal',player)}}></button>
      {/* <Upperbtn key={item-Math.floor(item/(col+1))} clicked={setClick} areAllClicked={areAllClicked}/> */}

    </div>
   :<div key={item} className='onebox'>

      {/* <Upperbtn key={item-Math.floor(item/(col+1))} clicked={setClick}/> */}
      <button className='upperbtn' key={item-Math.floor(item/(col+1))} onClick={()=>{setClick(item-Math.floor(item/(col+1)),'horizontal');areAllClicked(item-Math.floor(item/(col+1)),'horizontal',player)}}></button>

      <div  style={{display:"flex",height:"80%"}}>

        <button className='sidebtn' key={item} onClick={()=>{setClick(item,'vertical');areAllClicked(item,'vertical',player)}}></button>
        {/* <Sidebtn key={item} clicked={setClick} areAllClicked={areAllClicked}/> */}

        <div className='innerBox' style={{backgroundColor:squaresColors[item-Math.floor(item/(col+1))].allClicked?'yellow':'lightgrey'}}>hi{item}</div>
        {/* <InnerBox areAllClicked={squaresColors[item].allClicked} key={item}/> */}
      </div>
    </div>
    )
    }
    </div>:
    sel!='Select size here'?
    <div style={{margin:'auto'}}>
      Player{player1Score>player2Score?'1':player1Score===player2Score?'s Tied and no one':'2'} won!
      </div>:''
  }
    
    {/* Idea for rendering square color on click of all neighbouring buttons: Create react components for four buttons surrounding innerbox or square which is to be colored and pass 'isClicked' prop to Button component i.e. <Button isClicked={}/> and from Button Component pass result of isClicked to a function in App.js whose result of allButtons clicked is passed as a prop to innerBox React component and then if allButtons clicked is true then change color of innerBox from innerBox react component there itself  */}
    </div>
  );
}
export default AppCopy;
