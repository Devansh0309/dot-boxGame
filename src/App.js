
import { useEffect, useRef, useState } from 'react';
import './App.css';
import LeftDrawer from './Drawer';


function App() {
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


  const makeBox=(e)=>{
    setBox([])
    setSelect(e.target.value)
    // setNumberOfSquares(0)
  }

useEffect(()=>{
  
 setCol(sel.split("*").map(Number)[1])
 setRow(sel.split("*").map(Number)[0])

},[sel])


useEffect(()=>{
  let arr=[];
  let horizontal=[]
  let vertical=[]
  let squares=[]
  for(let i=0;i<=row*col+row+col;i++){
    arr.push(i)
  }
  for(let i=0;i<row*col+col;i++){
    horizontal.push({key:i,type:'horizontal',isClicked:false,btncolor:"lightgrey"})
  }
  for(let i=0;i<row*col+row;i++){
    vertical.push({key:i,type:'vertical',isClicked:false,btncolor:"lightgrey"})
  }
  for(let i=0;i<row*col;i++){
    squares.push({allClicked:false,squarecolor:"grey"})
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

useEffect(()=>{
  setSelect('Select size here')
  setNumberOfSquares(0)
  // alert(`Player${player1Score>player2Score?'1':player1Score===player2Score?'s Tied and no one':'2'} won!`)

},[numberOfSquares>0 && numberOfSquares===row*col])

const areAllClicked=(id,type,player)=>{
  //type:'vertical' or 'horizontal'
  // id : key of buttons
  //put square formed function in dotsAndDashes.java
  // console.log('Inside areAllClicked')
  
  if(type==='horizontal'){

    let colortemp=[...horizontalButtons]
    if(player==='1'){
      colortemp[id].btncolor="green"
      // console.log(id-Math.floor(id/col+1),colortemp[id-Math.floor(id/col+1)].btncolor)
    }
    else{
      colortemp[id].btncolor="red"
      // console.log(id-Math.floor(id/col+1),colortemp[id-Math.floor(id/col+1)].btncolor)
    }
     setHorizontalButtons(colortemp)

    if(Math.floor(id/col)===0){
      if(horizontalButtons[id].isClicked && horizontalButtons[id+col].isClicked && verticalButtons[id].isClicked && verticalButtons[id+1].isClicked){
        let temp=[...squaresColors]
        temp[id].allClicked=true
        
        if(player==='1'){
          temp[id].squarecolor='green'
          setPlayer1Score(player1Score+1)
        }
        else{
          temp[id].squarecolor='red'
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
      if(horizontalButtons[id-col].isClicked && horizontalButtons[id].isClicked && 
        verticalButtons[id-col+row-1].isClicked && verticalButtons[id-col+row].isClicked){
        let temp=[...squaresColors]
        temp[id-col].allClicked=true
        if(player==='1'){
          temp[id-col].squarecolor='green'
          setPlayer1Score(player1Score+1)
        }
        else{
          temp[id-col].squarecolor='red'
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
      if((horizontalButtons[id-col].isClicked && horizontalButtons[id].isClicked && 
        verticalButtons[id-col+Math.floor(id/col)-1].isClicked && 
        verticalButtons[id-col+Math.floor(id/col)].isClicked) && 
        (!horizontalButtons[id].isClicked || !horizontalButtons[id+col].isClicked || !verticalButtons[id+Math.floor(id/col)].isClicked || !verticalButtons[id+Math.floor(id/col)+1].isClicked)){//first row upper btn id provided
        let temp=[...squaresColors]
        temp[id-col].allClicked=true
        if(player==='1'){
          temp[id-col].squarecolor='green'
          setPlayer1Score(player1Score+1)
        }
        else{
          temp[id-col].squarecolor='red'
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
          temp[id].squarecolor='green'
          setPlayer1Score(player1Score+1)
        }
        else{
          temp[id].squarecolor='red'
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
          temp[id].squarecolor='green'
          temp[id-col].squarecolor='green'
          setPlayer1Score(player1Score+2)
        }
        else{
          temp[id].squarecolor='red'
          temp[id-col].squarecolor='red'
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
    let colortemp=[...verticalButtons]
    if(player==='1'){
      colortemp[id].btncolor="green"
      // console.log(id-Math.floor(id/col+1),colortemp[id-Math.floor(id/col+1)].btncolor)
    }
    else{
      colortemp[id].btncolor="red"
      // console.log(id-Math.floor(id/col+1),colortemp[id-Math.floor(id/col+1)].btncolor)
    }
    
    setVerticalButtons(colortemp)

    if(id%(col+1)===0){//first column left vertical btn id provided
      if(horizontalButtons[id-Math.floor(id/(col+1))].isClicked && horizontalButtons[id-Math.floor(id/(col+1))+col].isClicked && verticalButtons[id].isClicked && verticalButtons[id+1].isClicked){
        let temp=[...squaresColors]
        temp[id-Math.floor(id/(col+1))].allClicked=true
        if(player==='1'){
          temp[id-Math.floor(id/(col+1))].squarecolor="green"
          setPlayer1Score(player1Score+1)
        }
        else{
          temp[id-Math.floor(id/(col+1))].squarecolor="red"
          setPlayer2Score(player2Score+1)
        }
        setSquareColors(temp)
        setNumberOfSquares(numberOfSquares+1)
      }
      else
      { 
        setPlayer(player==='1'?'2':'1')
      }
    }
    else if(id%(col+1)===col){//last column right vertical btn id provided
      if(horizontalButtons[id-Math.ceil(id/(col+1))].isClicked && horizontalButtons[id+col-Math.ceil(id/(col+1))].isClicked && verticalButtons[id-1].isClicked && verticalButtons[id].isClicked){
        let temp=[...squaresColors]
        temp[id-Math.ceil(id/(col+1))].allClicked=true
        if(player==='1'){
          temp[id-Math.ceil(id/(col+1))].squarecolor="green"
          setPlayer1Score(player1Score+1)
        }
        else{
          temp[id-Math.ceil(id/(col+1))].squarecolor="red"
          setPlayer2Score(player2Score+1)
        }
        setSquareColors(temp)
        setNumberOfSquares(numberOfSquares+1)
      }
      else{
       
        setPlayer(player==='1'?'2':'1')
      }
    }
    else{//middle column (not first and not last) btn id provided
      if((horizontalButtons[id-Math.floor(id/(col+1))].isClicked && horizontalButtons[id+col-Math.floor(id/(col+1))].isClicked && verticalButtons[id].isClicked && verticalButtons[id+1].isClicked) && (!horizontalButtons[id-Math.ceil(id/(col+1))].isClicked || !horizontalButtons[id+col-Math.ceil(id/(col+1))].isClicked || !verticalButtons[id-1].isClicked || !verticalButtons[id].isClicked)){//first row upper btn id provided
        let temp=[...squaresColors]
        temp[id-Math.floor(id/(col+1))].allClicked=true
        if(player==='1'){
          temp[id-Math.floor(id/(col+1))].squarecolor="green"
          setPlayer1Score(player1Score+1)
        }
        else{
          temp[id-Math.floor(id/(col+1))].squarecolor="red"
          setPlayer2Score(player2Score+1)
        }
        setSquareColors(temp)
        setNumberOfSquares(numberOfSquares+1)
      }
      else if((!horizontalButtons[id-Math.floor(id/(col+1))].isClicked || !horizontalButtons[id+col-Math.floor(id/(col+1))].isClicked || !verticalButtons[id].isClicked || !verticalButtons[id+1].isClicked) && (horizontalButtons[id-Math.ceil(id/(col+1))].isClicked && horizontalButtons[id+col-Math.ceil(id/(col+1))].isClicked && verticalButtons[id-1].isClicked && verticalButtons[id].isClicked)){
        //last row lower btn id provided
        let temp=[...squaresColors]
        temp[id-Math.ceil(id/(col+1))].allClicked=true
        if(player==='1'){
          temp[id-Math.ceil(id/(col+1))].squarecolor="green"
          setPlayer1Score(player1Score+1)
        }
        else{
          temp[id-Math.ceil(id/(col+1))].squarecolor="red"
          setPlayer2Score(player2Score+1)
        }
        setSquareColors(temp)
        setNumberOfSquares(numberOfSquares+1)
      }
      else if((horizontalButtons[id-Math.floor(id/(col+1))].isClicked && horizontalButtons[id+col-Math.floor(id/(col+1))].isClicked && verticalButtons[id].isClicked && verticalButtons[id+1].isClicked) &&(horizontalButtons[id-Math.ceil(id/(col+1))].isClicked && horizontalButtons[id+col-Math.ceil(id/(col+1))].isClicked && verticalButtons[id-1].isClicked && verticalButtons[id].isClicked)){
        //middle row (not first and not last) btn id provided
        let temp=[...squaresColors]
        temp[id-Math.floor(id/(col+1))].allClicked=true
        temp[id-Math.ceil(id/(col+1))].allClicked=true
        if(player==='1'){
          temp[id-Math.floor(id/(col+1))].squarecolor="green"
          temp[id-Math.ceil(id/(col+1))].squarecolor="green"
          setPlayer1Score(player1Score+2)
        }
        else{
          temp[id-Math.floor(id/(col+1))].squarecolor="red"
          temp[id-Math.ceil(id/(col+1))].squarecolor="red"
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

  return (
    <>
    <LeftDrawer select={sel} setSelect={setSelect} makeBox={makeBox}/>
    <br/>
    <div className="App">
     {/* <select onChange={(e)=>{
     makeBox(e)
     }} value={sel}>
      <option>Select size here</option>
      <option value="2*3">2 x 3</option>
      <option value="3*4">3 x 4</option>
      <option value="4*5">4 x 5</option>
      <option value="5*6">6 x 7</option>
      <option value="7*8">7 x 8</option>
     </select> */}

  {numberOfSquares<row*col && sel!=='Select size here'?
  (<>
  <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',gap:'50px'}}>
    <div style={{backgroundColor:'green'}}>Player1: {player1Score}</div> 
    <div style={{backgroundColor:'red'}}>Player2: {player2Score}</div>
  </div>
  <br/>
  <div>
    Player {player} chance
  </div>
  <div className='gridBox' 
  style={{height: `${80*(row+1)}px`,
    width: `${80*(col+1)}px`,display:"grid",
  gridTemplateColumns:`repeat(${col+1},1fr)`,
  gridTemplateRows:`repeat(${row+1},1fr)`}}
  >
  {
  Box.map((item)=>
  item%(col+1) ===col && item<row*col+row+col?
    <div className='twobox' style={{display:'flex',flexDirection:'column'}}>
      <div style={{backgroundColor:'black',width:'20%',height:'20%'}}>
      </div>
      <button className='sidelastbtn'
      style={{
        backgroundColor:
        `${verticalButtons[item].btncolor}`}}

      key={item} onClick={()=>{setClick(item,'vertical');areAllClicked(item,'vertical',player)}}></button>
    </div>
  : 
    item>=row*(col+1)?
      item<row*col+row+col?
        <div className='twobox'  style={{display:'flex'}}>
          <div style={{backgroundColor:'black',width:'20%',height:'20%'}}>
          </div>
          <button className='lowerbtn' 
          style={{
            backgroundColor:
            `${horizontalButtons[item-Math.floor(item/(col+1))].btncolor}`}}

           key={item-Math.floor(item/(col+1))} onClick={()=>{setClick(item-Math.floor(item/(col+1)),'horizontal');areAllClicked(item-Math.floor(item/(col+1)),'horizontal',player)}}></button>
        </div>
      :
        <div style={{backgroundColor:'black',width:'20%',height:'20%'}}>
        </div>

    :
      <div key={item} className='onebox'>
      <div  style={{display:"flex",height:"20%"}}>
        <div style={{backgroundColor:'black',width:'20%'}}>
        </div>
        <button className='upperbtn' 

        style={{
          backgroundColor:
          `${horizontalButtons[item-Math.floor(item/(col+1))].btncolor}`}}

         key={item-Math.floor(item/(col+1))} onClick={()=>{setClick(item-Math.floor(item/(col+1)),'horizontal');
         areAllClicked(item-Math.floor(item/(col+1)),'horizontal',player)}}></button>
      </div>
      
      <div  style={{display:"flex",height:"80%",width:'100%'}}>

        <button className='sidebtn'
         style={{
          backgroundColor:`${verticalButtons[item].btncolor}`}}

         key={item} onClick={()=>{setClick(item,'vertical');areAllClicked(item,'vertical',player)}}></button>
        

        <div className='innerBox' style={{backgroundColor:squaresColors[item-Math.floor(item/(col+1))].squarecolor}}>
          {(squaresColors[item-Math.floor(item/(col+1))].squarecolor==="green"?"Player-1":null)||
          (squaresColors[item-Math.floor(item/(col+1))].squarecolor==="red"?"Player-2":null)}</div>
        
      </div>
      </div>
  )
  }
  </div>
  </>
  )
  :
  numberOfSquares===row*col && numberOfSquares>0?
    <div style={{margin:'auto'}}>
      Player{player1Score>player2Score?'1':player1Score===player2Score?'s Tied and no one':'2'} won!
      {/* setSelect('Select size here') */}
    </div>
  :''
  }
       {/* <Upperbtn key={item-Math.floor(item/(col+1))} clicked={setClick} areAllClicked={areAllClicked}/> */}
      {/* <Upperbtn key={item-Math.floor(item/(col+1))} clicked={setClick}/> */}
     {/* <Sidebtn key={item} clicked={setClick} areAllClicked={areAllClicked}/> */}
    {/* <InnerBox areAllClicked={squaresColors[item].allClicked} key={item}/> */}
     {/* <SideLastbtn key={item} clicked={setClick} areAllClicked={areAllClicked}/> */}
     {/* const GridStyle={
        gridTemplateColumn:`repeat(${col},1fr)`,
       // border:"1px solid red"
     } */}
     {/* Idea for rendering square color on click of all neighbouring buttons: Create react components for four buttons surrounding innerbox or square which is to be colored and pass 'isClicked' prop to Button component i.e. <Button isClicked={}/> and from Button Component pass result of isClicked to a function in App.js whose result of allButtons clicked is passed as a prop to innerBox React component and then if allButtons clicked is true then change color of innerBox from innerBox react component there itself  */}
    </div>
    </>
    
  );
}
export default App;
