import React, { useContext, useEffect, useRef, useState } from "react";
import "./SquareGrid.css";
import { GridContext } from "../Contexts";
import ButtonSound2 from "../NewNavbar/ButtonSound/button1.mp3";
import background from "../background.jpg";
import GridComponent from "./GridComponent";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

function SquareGrid() {
  const [gridWidth, setGridWidth] = useState();
  const [gridHeight, setGridHeight] = useState();
  const { state, dispatch } = useContext(GridContext);

  const InitialRender1 = useRef(true); //Initial Render 1 for initial render of first useEffect and so on for others useEffect
  const InitialRender2 = useRef(true);
  const InitialRender3 = useRef(true);
  const InitialRender4 = useRef(true);
  const InitialRender5 = useRef(true);
  // const audio2 = new Audio(ButtonSound2);

  useEffect(() => {
    console.log(1);
    console.log("line 21: state.sel", state.sel);
    // console.log("line 20",state.sel)
    //Routed means route changed
    if (!state.Routed && InitialRender1.current) {
      console.log("line 24: state.sel", state.sel);
      InitialRender1.current = false;
    } else if (!state.Routed && !InitialRender1.current) {
      console.log("line 35: state.sel", state.sel);
      dispatch({
        type: "SetStates",
        payload: {
          row: state.sel.split("*").map(Number)[0],
          col: state.sel.split("*").map(Number)[1],
        },
      });
      
        
    }
  }, [state.sel]);

  useEffect(() => {
    console.log(2);
    console.log("line 48: state.sel", state.sel);
    let arr = [];
    let horizontal = [];
    let vertical = [];
    let squares = [];
    for (let i = 0; i <= state.row * state.col + state.row + state.col; i++) {
      arr.push(i);
    }

    for (let i = 0; i < state.row * state.col + state.col; i++) {
      horizontal.push({
        key: i,
        type: "horizontal",
        isClicked: false,
        btncolor: "lightgrey",
        active: false,
      });
    }

    for (let i = 0; i < state.row * state.col + state.row; i++) {
      vertical.push({
        key: i,
        type: "vertical",
        isClicked: false,
        btncolor: "lightgrey",
        active: false,
      });
    }

    for (let i = 0; i < state.row * state.col; i++) {
      squares.push({ allClicked: false, squarecolor: "grey", active: false });
    }

    if (!state.Routed && InitialRender2.current) {
      InitialRender2.current = false;
    } else if (!state.Routed && !InitialRender2.current) {
      dispatch({
        type: "SetStates",
        payload: {
          horizontalButtons: horizontal,
          verticalButtons: vertical,
          squaresColors: squares,
          Box: arr,
          numberOfSquares: 0,
          player1Score: 0,
          player2Score: 0,
          player: "1",
        },
      });
      let updateDocState = async()=>{
        await updateDoc(doc(db, "users", state.enterRoomId || state.roomId),{
          horizontalButtons: horizontal,
          verticalButtons: vertical,
          squaresColors: squares,
          Box: arr,
          numberOfSquares: 0,
          player1Score: 0,
          player2Score: 0,
          player: "1",
          sel:state.sel,
          row:state.row,
          col:state.col
        }).then((res)=>{
          console.log(res,"updated")
        }).catch((err)=>{console.log(err)})
      }
      updateDocState()
    }
    setGridWidth(80 * (state.col + 1));
    setGridHeight(80 * (state.row + 1));
  }, [state.row, state.col]);

  useEffect(() => {
    console.log(3);
    console.log("line 117: state.sel", state.sel);
    if (!state.Routed && InitialRender3.current) {
      InitialRender3.current = false;
    } else if (!state.Routed && !InitialRender3.current) {
      dispatch({
        type: "SetStates",
        payload: {
          sel: "Select size here",
          won:
            state.player1Score > 0 || state.player2Score > 0
              ? `${
                  state.player1Score > state.player2Score
                    ? state.player1Name
                    : state.player1Score === state.player2Score &&
                      state.player1Score > 0
                    ? " Tied and no one"
                    : state.player2Name
                } won!`
              : "",
        },
      });
    }
  }, [
    state.numberOfSquares > 0 &&
      state.numberOfSquares === state.row * state.col,
  ]);

  useEffect(() => {
    console.log(4);
    console.log("line 163: state.sel", state.sel);
    if (!state.Routed && InitialRender4.current) {
      InitialRender4.current = false;
    } else if (!state.Routed && !InitialRender5.current) {
      dispatch({ type: "SetStates", payload: { start: false } });
    }
  }, [state.sel === "Select size here" && state.won]);

  useEffect(() => {
    console.log(5);
    console.log("line 174: state.sel", state.sel);
    if (!state.Routed && InitialRender5.current) {
      InitialRender5.current = false;
    } else if (state.Routed && InitialRender5.current) {
      dispatch({ type: "SetStates", payload: { Routed: false } });
      InitialRender1.current = false;
      InitialRender2.current = false;
      InitialRender3.current = false;
      InitialRender4.current = false;
      InitialRender5.current = false;
    } else if (!state.Routed && !InitialRender5.current) {
      dispatch({ type: "SetStates", payload: { won: "" } });
    }
  }, [state.sel !== "Select size here" && state.won]);

  return (
    <div className="Appe">
      <img
        src={background}
        style={{
          width: "100vw",
          height: "100%",
          position: "absolute",
          zIndex: "-10",
          top: "-13px",
          bottom: "0",
          left: "0",
          right: "0",
        }}
      />
      {state.sel !== "Select size here" && !state.won ? (
        <GridComponent gridWidth={gridWidth} gridHeight={gridHeight}/>
      ) : state.sel === "Select size here" && state.won ? (
        <div>
          <br />
          <h3 className="result">{state.won}</h3>
        </div>
      ) : state.sel !== "Select size here" && state.won ? (
        ""
      ) : state.roomId ? (
        <p>Creating Room</p>
      ) : state?.playerEnteredRoom ? (
        <GridComponent gridWidth={gridWidth} gridHeight={gridHeight}/>
      ) : (
        <button
          type="button"
          onClick={() =>
            dispatch({ type: "SetStates", payload: { sel: "2*3" } })
          }
          style={{
            backgroundColor: "inherit",
            fontSize: "large",
            color: "#354dc1",
            marginTop: "0.625rem",
          }}
          className="start-default"
        >
          Start 2 x 3 game
        </button>
      )}
      {/* Idea for rendering square color on click of all neighbouring buttons: Create react components for four buttons surrounding innerbox or square which is to be colored and pass 'isClicked' prop to Button component i.e. <Button isClicked={}/> and from Button Component pass result of isClicked to a function in App.js whose result of allButtons clicked is passed as a prop to innerBox React component and then if allButtons clicked is true then change color of innerBox from innerBox react component there itself  */}
    </div>
  );
}
export default SquareGrid;
