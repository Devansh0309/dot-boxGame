import React,{useContext,useEffect,useRef} from 'react'
import './SquareGrid.css'
import { GridContext } from '../Contexts';
import ButtonSound2 from '../NewNavbar/ButtonSound/button1.mp3'
import background from '../background.jpg'

function SquareGrid() {
    const {state,dispatch,areAllClicked,setClick} = useContext(GridContext)
    const InitialRender1 = useRef(true)//Initial Render 1 for initial render of first useEffect and so on for others useEffect
    const InitialRender2 = useRef(true)
    const InitialRender3 = useRef(true)
    const InitialRender4 = useRef(true)
    const InitialRender5 = useRef(true)
    const audio2=new Audio(ButtonSound2)

    useEffect(()=>{
       //Routed means route changed
      if(!state.Routed && InitialRender1.current){
        dispatch({type:'SetStates',payload:{row:state.sel.split("*").map(Number)[0],col:state.sel.split("*").map(Number)[1]}})
        InitialRender1.current = false
      }
      if(!state.Routed && !InitialRender1.current){
        dispatch({type:'SetStates',payload:{row:state.sel.split("*").map(Number)[0],col:state.sel.split("*").map(Number)[1]}})
      }
      }
    ,[state.sel])

    useEffect(()=>{
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
        
        if(!state.Routed && InitialRender2.current){
          dispatch({type:'SetStates',payload:{horizontalButtons:horizontal,verticalButtons:vertical,squaresColors:squares,Box:arr,numberOfSquares:0,player1Score:0,player2Score:0,player:'1'}})
          InitialRender2.current = false
        }
        else if(!state.Routed && !InitialRender2.current){
          dispatch({type:'SetStates',payload:{horizontalButtons:horizontal,verticalButtons:vertical,squaresColors:squares,Box:arr,numberOfSquares:0,player1Score:0,player2Score:0,player:'1'}})
        }
        
      },[state.row,state.col])  
      
    useEffect(()=>{
      if(!state.Routed && InitialRender3.current){
        dispatch({type:'SetStates',payload:{sel:'Select size here',won:(state.player1Score>0||state.player2Score>0)?`${state.player1Score>state.player2Score?state.player1Name:
      (state.player1Score===state.player2Score && state.player1Score>0)?
      ' Tied and no one':state.player2Name} won!`:''}})
        InitialRender3.current = false
      }
      else if(!state.Routed && !InitialRender3.current){
        dispatch({type:'SetStates',payload:{sel:'Select size here',won:(state.player1Score>0||state.player2Score>0)?`${state.player1Score>state.player2Score?state.player1Name:
          (state.player1Score===state.player2Score && state.player1Score>0)?
          ' Tied and no one':state.player2Name} won!`:''}})
      }
      
      },[state.numberOfSquares>0 && state.numberOfSquares===state.row*state.col])

    useEffect(()=>{
      if(!state.Routed && InitialRender4.current){
        dispatch({type:'SetStates',payload:{start:false}})
        InitialRender4.current = false
      }
      else if(!state.Routed && !InitialRender5.current){
        dispatch({type:'SetStates',payload:{start:false}})
      }
    },[state.sel==='Select size here' && state.won])

    useEffect(()=>{
      if(!state.Routed && InitialRender5.current){
        dispatch({type:'SetStates',payload:{won:''}})
        InitialRender5.current = false
      }
      else if(state.Routed && InitialRender5.current){
        dispatch({type:'SetStates',payload:{Routed:false}})
        InitialRender1.current = false
        InitialRender2.current = false
        InitialRender3.current = false
        InitialRender4.current = false
        InitialRender5.current = false
      }
      else if(!state.Routed && !InitialRender5.current){
        dispatch({type:'SetStates',payload:{won:''}})
      }
  },[state.sel!=='Select size here' && state.won])

  return (
    <div className="Appe" style={{position:'relative',minHeight:'100vh'}}>
      <img src={background} style={{width:'100vw',height:'100%',position:'absolute',zIndex:'-10',top:'-13px',bottom:'0',left:'0',right:'0'}}/>
    {state.sel!=='Select size here' && !state.won?
    (<div>
      <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',gap:'3.125rem',marginTop: '0.6rem',
    padding: '0.5rem'}}>
        <div style={{backgroundColor:'#eb5d5d',borderRadius:'0.3125rem',padding:'0.3125rem'}}>{state.player1Name}: {state.player1Score}</div>
        <div style={{backgroundColor:'#42c442',borderRadius:'0.3125rem',padding:'0.3125rem'}}>{state.player2Name}: {state.player2Score}</div>
      </div>
      <div className='chance' style={{backgroundColor:state.player==='1'?'#eb5d5d':'#42c442',padding:'0.3125rem'}}>
      {state.player==='1'?state.player1Name:state.player2Name} chance
      </div>
      <div className='gridBox' 
      style={{
        height: 'var(--height)',
        width: 'var(--width)',
        gridTemplateColumns:`repeat(${state.col+1},calc(var(--width)/${state.col+1}))`,
      gridTemplateRows:`repeat(${state.row+1},calc(var(--width)/${state.col+1}))`,
        display:"grid",
        // height:`calc(${state.row+1}*var(--height))`,
        // width:`calc(${state.col+1}*var(--width))`,
      // gridTemplateColumns:`repeat(${state.col+1},1fr)`,
      // gridTemplateRows:`repeat(${state.row+1},1fr)`
    }}
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
          border:`${state.verticalButtons[item].active?'2px solid black':'none'}`,borderRadius:'0.9375rem'}}
    
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
                border:`${state.horizontalButtons[item-Math.floor(item/(state.col+1))].active?'2px solid black':'none'}`,borderRadius:'0.9375rem'}}
    
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
              <button className='upperbtn' style={{
              backgroundColor:
              `${state.horizontalButtons[item-Math.floor(item/(state.col+1))].btncolor}`,border:`${state.horizontalButtons[item-Math.floor(item/(state.col+1))].active?'2px solid black':'none'}`,borderRadius:'0.9375rem'}}
              key={item-Math.floor(item/(state.col+1))}
              disabled={state.horizontalButtons[item-Math.floor(item/(state.col+1))].isClicked} 
              onClick={()=>{setClick(item-Math.floor(item/(state.col+1)),'horizontal');
              areAllClicked(item-Math.floor(item/(state.col+1)),'horizontal');audio2.play()}}>
              </button>
            </div>
          
            <div  style={{display:"flex",height:"80%",width:'100%'}}>
              <button className='sidebtn'
               style={{
               backgroundColor:`${state.verticalButtons[item].btncolor}`,
               border:`${state.verticalButtons[item].active?'2px solid black':'none'}`,borderRadius:'15px'}}
               key={item} disabled={state.verticalButtons[item].isClicked} onClick={()=>{setClick(item,'vertical');areAllClicked(item,'vertical');audio2.play()}}>
              </button>
    
              <div className='innerBox' style={{backgroundColor:state.squaresColors[item-Math.floor(item/(state.col+1))].squarecolor,border:state.squaresColors[item-Math.floor(item/(state.col+1))].active?'2px solid black':'none',borderRadius:'0.3125rem'}}>
              {/* {(state.squaresColors[item-Math.floor(item/(state.col+1))].squarecolor==="#eb5d5d"?state.player1Name:null)||
              (state.squaresColors[item-Math.floor(item/(state.col+1))].squarecolor==="#42c442"?state.player2Name:null)} */}
              </div>
            
            </div>
          </div>
      )
      }
      </div>
      </div>
      )
    :state.sel==='Select size here' && state.won?
    <div><br/><h3 className='result'>{state.won}</h3></div>
     :state.sel!=='Select size here' && state.won?''
     :<button type='button' onClick={()=>dispatch({type:'SetStates',payload:{sel:'2*3'}})} style={{backgroundColor: 'inherit',
     fontSize: 'large',color: '#354dc1',marginTop:'0.625rem'}} className='start-default'>Start 2 x 3 game</button>
    }
       {/* Idea for rendering square color on click of all neighbouring buttons: Create react components for four buttons surrounding innerbox or square which is to be colored and pass 'isClicked' prop to Button component i.e. <Button isClicked={}/> and from Button Component pass result of isClicked to a function in App.js whose result of allButtons clicked is passed as a prop to innerBox React component and then if allButtons clicked is true then change color of innerBox from innerBox react component there itself  */}
      </div>
  )
}
export default SquareGrid