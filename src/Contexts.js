import React,{useState} from 'react'
export const GridContext=React.createContext()

function Contexts(props) {

    //States
    const [sel,setSelect]=useState('Select size here')
    const [row,setRow]=useState(0)
    const [col,setCol]=useState(0)
    const [Box,setBox]=useState([])
    const [horizontalButtons,setHorizontalButtons]=useState([])
    const [verticalButtons,setVerticalButtons]=useState([])
    const [squaresColors,setSquareColors]=useState([])
    const [numberOfSquares,setNumberOfSquares]=useState(0)
    const [player1Score,setPlayer1Score]=useState(0)
    const [player2Score,setPlayer2Score]=useState(0)
    const [player,setPlayer]=useState('1')

    //Functions
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
              temp[id].active=true
              for(let i=0;i<temp.length;i++){
                if(i!==id){
                    temp[i].active=false
                }
              }
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
              temp[id-col].active=true
              for(let i=0;i<temp.length;i++){
                if(i!==id){
                    temp[i].active=false
                }
              }
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
              temp[id-col].active=true
              for(let i=0;i<temp.length;i++){
                if(i!==id){
                    temp[i].active=false
                }
              }
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
              temp[id].active=true
              for(let i=0;i<temp.length;i++){
                if(i!==id){
                    temp[i].active=false
                }
              }
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
              temp[id].active=true
              temp[id-col].active=true
              for(let i=0;i<temp.length;i++){
                if(i!==id && i!==id-col){
                    temp[i].active=false
                }
              }
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
          let temp2=[...verticalButtons]
          temp[id].isClicked=true
          temp[id].active=true
          for(let i=0;i<temp.length;i++){
            if(i!==id){
              temp[i].active=false
            }
          }
          for(let i=0;i<temp2.length;i++){
            temp2[i].active=false
          }
          if(player==='1'){
            temp[id].btncolor="green"
          }
          else{
            temp[id].btncolor="red"
          }
          setHorizontalButtons(temp)
          //or this?
          // setHorizontalButtons(...horizontalButtons,{key:id,type:'horizontal',isClicked:true})
        }
        else{
          let temp=[...verticalButtons]
          let temp2=[...horizontalButtons]
          temp[id].isClicked=true
          temp[id].active=true
          for(let i=0;i<temp.length;i++){
            if(i!==id){
              temp[i].active=false
            }
          }
          for(let i=0;i<temp2.length;i++){
            temp2[i].active=false
          }
          if(player==='1'){
            temp[id].btncolor="green"
          }
          else{
            temp[id].btncolor="red"
          }
          setVerticalButtons(temp)
          //or this?
          // setHorizontalButtons(...horizontalButtons,{key:id,type:'horizontal',isClicked:true})
        }
    }
  return (
  <GridContext.Provider value={{sel,setSelect,row,setRow,col,setCol,Box,setBox,player,setPlayer,horizontalButtons,setHorizontalButtons,verticalButtons,setVerticalButtons,player1Score,setPlayer1Score,player2Score,setPlayer2Score,squaresColors,setSquareColors,numberOfSquares,setNumberOfSquares,areAllClicked,setClick}}>      {props.children}
  </GridContext.Provider>)
}

export default Contexts