import React,{useContext,useEffect} from 'react'
import './SquareGrid.css'
import { GridContext } from '../Contexts';
import ButtonSound2 from '../NewNavbar/ButtonSound/button1.mp3'

function SquareGrid() {
    // const {sel,setSelect,row,setRow,col,setCol,Box,setBox,player,setPlayer,horizontalButtons,setHorizontalButtons,verticalButtons,setVerticalButtons,player1Score,setPlayer1Score,player2Score,setPlayer2Score,squaresColors,setSquareColors,numberOfSquares,setNumberOfSquares,areAllClicked,setClick,won,setWon,setStart} = useContext(GridContext)
    const {state,dispatch,areAllClicked,setClick} = useContext(GridContext)

    const audio2=new Audio(ButtonSound2)

    useEffect(()=>{
      console.log('runned')
      dispatch({type:'SetStates',payload:{row:state.sel.split("*").map(Number)[0],col:state.sel.split("*").map(Number)[1]}})
      }
    ,[state.sel])

    useEffect(()=>{
      console.log('runned')
        let arr=[];
        let horizontal=[]
        let vertical=[]
        let squares=[]
        for(let i=0;i<=state.row*state.col+state.row+state.col;i++){
          arr.push(i)
        }
        for(let i=0;i<state.row*state.col+state.col;i++){
          horizontal.push({key:i,type:'horizontal',isClicked:false,btncolor:"lightgrey",active:false})
        }
        for(let i=0;i<state.row*state.col+state.row;i++){
          vertical.push({key:i,type:'vertical',isClicked:false,btncolor:"lightgrey",active:false})
        }
        for(let i=0;i<state.row*state.col;i++){
          squares.push({allClicked:false,squarecolor:"grey",active:false})
        }
        dispatch({type:'SetStates',payload:{horizontalButtons:horizontal,verticalButtons:vertical,squaresColors:squares,Box:arr,numberOfSquares:0,player1Score:0,player2Score:0,player:'1'}})

      },[state.row,state.col])  
      
    useEffect(()=>{
      dispatch({type:'SetStates',payload:{sel:'Select size here',won:(state.player1Score>0||state.player2Score>0)?`Player${state.player1Score>state.player2Score?'1':
      (state.player1Score===state.player2Score && state.player1Score>0)?
      's Tied and no one':'2'} won!`:''}})
      },[state.numberOfSquares>0 && state.numberOfSquares===state.row*state.col])

    useEffect(()=>{
      dispatch({type:'SetStates',payload:{start:false}})
    },[state.sel==='Select size here' && state.won!==''])

    useEffect(()=>{
      dispatch({type:'SetStates',payload:{won:''}})
  },[state.sel!=='Select size here' && state.won!==''])

  return (
    <div className="Appe">
    {state.sel!=='Select size here' && state.won===''?
    (<div>
      <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',gap:'50px'}}>
      <div style={{backgroundColor:'#eb5d5d',borderRadius:'5px'}}>Player1: {state.player1Score}</div> 
      <div style={{backgroundColor:'#42c442',borderRadius:'5px'}}>Player2: {state.player2Score}</div>
      </div>
      <br/>
      <div className='chance' style={{backgroundColor:state.player==='1'?'#eb5d5d':'#42c442'}}>
        Player {state.player} chance
      </div>
      <br/>
      <div className='gridBox' 
      style={{height: `${80*(state.row+1)}px`,
        width: `${80*(state.col+1)}px`,display:"grid",
      gridTemplateColumns:`repeat(${state.col+1},1fr)`,
      gridTemplateRows:`repeat(${state.row+1},1fr)`}}
      >
      {
      (state.Box).map((item)=>
      item%(state.col+1) ===state.col && item<state.row*state.col+state.row+state.col?
        <div className='twobox' style={{display:'flex',flexDirection:'column'}}>
          <div style={{backgroundColor:'black',width:'20%',height:'20%'}}>
          </div>
          <button className='sidelastbtn'
          style={{
            backgroundColor:
            `${state.verticalButtons[item].btncolor}`,
          border:`${state.verticalButtons[item].active?'2px solid black':'none'}`,borderRadius:'15px'}}
    
          key={item} disabled={state.verticalButtons[item].isClicked} onClick={()=>{setClick(item,'vertical');areAllClicked(item,'vertical');audio2.play()}}></button>
        </div>
      : 
        item>=state.row*(state.col+1)?
          item<state.row*state.col+state.row+state.col?
            <div className='twobox'  style={{display:'flex'}}>
              <div style={{backgroundColor:'black',width:'20%',height:'20%'}}>
              </div>
              <button className='lowerbtn' 
              style={{
                backgroundColor:
                `${state.horizontalButtons[item-Math.floor(item/(state.col+1))].btncolor}`,
                border:`${state.horizontalButtons[item-Math.floor(item/(state.col+1))].active?'2px solid black':'none'}`,borderRadius:'15px'}}
    
               key={item-Math.floor(item/(state.col+1))}  disabled={state.horizontalButtons[item-Math.floor(item/(state.col+1))].isClicked} onClick={()=>{setClick(item-Math.floor(item/(state.col+1)),'horizontal');areAllClicked(item-Math.floor(item/(state.col+1)),'horizontal');audio2.play()}}></button>
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
              `${state.horizontalButtons[item-Math.floor(item/(state.col+1))].btncolor}`,
              border:`${state.horizontalButtons[item-Math.floor(item/(state.col+1))].active?'2px solid black':'none'}`,borderRadius:'15px'
            }}
    
             key={item-Math.floor(item/(state.col+1))}
             disabled={state.horizontalButtons[item-Math.floor(item/(state.col+1))].isClicked} 
             onClick={()=>{setClick(item-Math.floor(item/(state.col+1)),'horizontal');
             areAllClicked(item-Math.floor(item/(state.col+1)),'horizontal');audio2.play()}}></button>
          </div>
          
          <div  style={{display:"flex",height:"80%",width:'100%'}}>
    
            <button className='sidebtn'
             style={{
              backgroundColor:`${state.verticalButtons[item].btncolor}`,
              border:`${state.verticalButtons[item].active?'2px solid black':'none'}`,borderRadius:'15px'}}
    
             key={item} disabled={state.verticalButtons[item].isClicked} onClick={()=>{setClick(item,'vertical');areAllClicked(item,'vertical');audio2.play()}}></button>
    
            <div className='innerBox' style={{backgroundColor:state.squaresColors[item-Math.floor(item/(state.col+1))].squarecolor,border:state.squaresColors[item-Math.floor(item/(state.col+1))].active?'2px solid black':'none',borderRadius:'5px'}}>
              {(state.squaresColors[item-Math.floor(item/(state.col+1))].squarecolor==="#eb5d5d"?"Player-1":null)||
              (state.squaresColors[item-Math.floor(item/(state.col+1))].squarecolor==="#42c442"?"Player-2":null)}</div>
            
          </div>
          </div>
      )
      }
      </div>
      </div>
      )
    :state.sel==='Select size here' && state.won!==''?
    <h3 className='result'>{state.won}</h3>
     :state.sel!=='Select size here' && state.won!==''?''
     :<button type='button' onClick={()=>dispatch({type:'SetStates',payload:{sel:'1*1'}})} style={{backgroundColor: 'inherit',
     fontSize: 'large',color: '#354dc1'}} className='start-default'>Start 1 x 1 game</button>
    }
       {/* Idea for rendering square color on click of all neighbouring buttons: Create react components for four buttons surrounding innerbox or square which is to be colored and pass 'isClicked' prop to Button component i.e. <Button isClicked={}/> and from Button Component pass result of isClicked to a function in App.js whose result of allButtons clicked is passed as a prop to innerBox React component and then if allButtons clicked is true then change color of innerBox from innerBox react component there itself  */}
      </div>
  )
}
export default SquareGrid