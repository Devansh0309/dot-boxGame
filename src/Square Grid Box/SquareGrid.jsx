import React, { useContext, useEffect, useRef, useState } from "react";
import "./SquareGrid.css";
import { GridContext } from "../Contexts";
import background from "../background.jpg";
import GridComponent from "./GridComponent";

function SquareGrid() {
  const { state, dispatch } = useContext(GridContext);

  const InitialRender1 = useRef(true); //Initial Render 1 for initial render of first useEffect and so on for others useEffect
  const InitialRender2 = useRef(true);

  const setStatesAfterSel = (row, col) => {
    let arr = [];
    let horizontal = [];
    let vertical = [];
    let squares = [];
    for (let i = 0; i <= row * col + row + col; i++) {
      arr.push(i);
    }

    for (let i = 0; i < row * col + col; i++) {
      horizontal.push({
        key: i,
        type: "horizontal",
        isClicked: false,
        btncolor: "#2196f3",
        active: false,
      });
    }

    for (let i = 0; i < row * col + row; i++) {
      vertical.push({
        key: i,
        type: "vertical",
        isClicked: false,
        btncolor: "#2196f3",
        active: false,
      });
    }

    for (let i = 0; i < row * col; i++) {
      squares.push({ allClicked: false, squarecolor: "lightgrey", active: false });
    }
    return {
      horizontalButtons: horizontal,
      verticalButtons: vertical,
      squaresColors: squares,
      Box: arr,
    };
  };

  useEffect(() => {
    console.log(1);
    console.log("line 229: state.sel", state.sel);
    if (!state.Routed && InitialRender1.current) {
      InitialRender1.current = false;
    } else if (
      !state.Routed &&
      !InitialRender1.current &&
      state.numberOfSquares > 0 &&
      state.numberOfSquares === state.row * state.col
    ) {
      console.log("dispatching on line 256");
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
  }, [state.numberOfSquares]);

  useEffect(() => {
    console.log(2);
    if (!state.Routed && InitialRender2.current) {
      InitialRender2.current = false;
    } else if (state.Routed && InitialRender2.current) {
      dispatch({ type: "SetStates", payload: { Routed: false } });
      // InitialRender1.current = false;
      // InitialRender2.current = false;
      InitialRender1.current = false;
      InitialRender2.current = false;
    } else if (!state.Routed && !InitialRender2.current && state.won) {
      console.log("dispatching on line 299");
      dispatch({ type: "SetStates", payload: { won: "" } });
    }
  }, [state.start]);

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
        <GridComponent/>
      ) : state.sel === "Select size here" && state.won ? (
        <div>
          <br />
          <h3 className="result">{state.won}</h3>
        </div>
      ) : state.sel !== "Select size here" && state.won ? (
        ""
      ) : (
        <button
          type="button"
          onClick={() => {
            let obj = setStatesAfterSel(2, 3);
            console.log("line 214", obj);
            if (Object.keys(obj).length > 0) {
              dispatch({
                type: "SetStates",
                payload: {
                  Box: [],
                  start: false,
                  row:2,
                  col:3,
                  ...obj,
                  sel: "2*3",
                  player1Score:0,
                  player2Score:0,
                  player:"1",
                  gridWidth: 320,
                  gridHeight: 240
                },
              });
            }
          }}
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
