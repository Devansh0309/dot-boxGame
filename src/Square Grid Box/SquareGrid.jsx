import React, { useContext, useEffect, useRef, useState } from "react";
import "./SquareGrid.css";
import { GridContext } from "../Contexts";
import ButtonSound2 from "../NewNavbar/ButtonSound/button1.mp3";
import background from "../background.jpg";
import GridComponent from "./GridComponent";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Button } from "@mui/material";

function SquareGrid() {
  const typeOfChange = useRef("");
  const { state, dispatch } = useContext(GridContext);

  const InitialRender1 = useRef(true); //Initial Render 1 for initial render of first useEffect and so on for others useEffect
  const InitialRender2 = useRef(true);
  const InitialRender0 = useRef(true);
  const dataFetched = useRef(false);
  let timeOut;

  // const audio2 = new Audio(ButtonSound2);
  let updateDocState = async (obj) => {
    console.log("line 33", obj, typeof obj);
    await updateDoc(doc(db, "users", state.enterRoomId || state.roomId), obj)
      .then((res) => {
        console.log("line 36", "updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
        btncolor: "lightgrey",
        active: false,
      });
    }

    for (let i = 0; i < row * col + row; i++) {
      vertical.push({
        key: i,
        type: "vertical",
        isClicked: false,
        btncolor: "lightgrey",
        active: false,
      });
    }

    for (let i = 0; i < row * col; i++) {
      squares.push({ allClicked: false, squarecolor: "grey", active: false });
    }
    return {
      horizontalButtons: horizontal,
      verticalButtons: vertical,
      squaresColors: squares,
      Box: arr,
    };
  };

  useEffect(
    () => {
      console.log("0");
      let interval;
      let unsub;
      if (!state.Routed && InitialRender0.current) {
        InitialRender0.current = false;
      } else if (!state.Routed && !InitialRender0.current) {
        if (state.playerEnteredRoom) {
          console.log("on line 88 for fetching real-time data");
          // interval = setTimeout(() => {
          let changes = [];
          const q = query(collection(db, "users"));
          onSnapshot(
            //unsub = onSnapshot
            q,
            (querySnapshot) => {
              changes = querySnapshot //changes is array of docs added or modified in collection
                .docChanges();
              let targetDoc;
              for (let i = 0; i < changes.length; i++) {
                // const idArr=changes[i]?.doc["_key"]?.path?.segments
                const id = changes[i].doc.id;
                if (id === (state.roomId || state.enterRoomId)) {
                  targetDoc = changes[i].doc.data();
                  typeOfChange.current = changes[i].type;
                  // setTypeOfChange(changes[i].type)
                  break;
                }
              }
              console.log("line 109", targetDoc, typeof targetDoc);
              if (!state.changesAdded && targetDoc) {
                dispatch({
                  type: "SetStates",
                  payload: { ...targetDoc, changesAdded: true },
                });
              } else if (
                typeOfChange.current === "modified"
              ) {
                // setTypeOfChange("")
                typeOfChange.current = "";
                dispatch({ type: "SetStates", payload: targetDoc });
                dataFetched.current = true;
              }
  
              console.log("line 124", changes[0]);
              // console.log("changes", changes[0].doc.data());
            },
            (error) => {
              console.log(error);
            }
          );
          // }, [2000]);
        }
      }
      
      // return () => {
      //   // unsub();
      //   clearTimeout(interval);
      // };
    },
    // []
    [
      state.horizontalButtons,
      state.verticalButtons,
      state.squaresColors,
      state.won,
      state.playerEnteredRoom,
    ]
  );

  useEffect(() => {
    console.log(3);
    console.log("line 229: state.sel", state.sel);
    if (!state.Routed && InitialRender1.current) {
      InitialRender1.current = false;
    } else if (
      !state.Routed &&
      !InitialRender1.current &&
      state.numberOfSquares > 0 &&
      state.numberOfSquares === state.row * state.col
    ) {
      if (state.playerEnteredRoom) {
        console.log("line 239", "doc updated");
        updateDocState({
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
        });
      } else {
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
    }
  }, [state.numberOfSquares]);

  useEffect(() => {
    console.log(4);
    if (!state.Routed && InitialRender2.current) {
      InitialRender2.current = false;
    } else if (state.Routed && InitialRender2.current) {
      dispatch({ type: "SetStates", payload: { Routed: false } });
      InitialRender0.current = false;
      InitialRender1.current = false;
      InitialRender2.current = false;
    } else if (
      !state.Routed &&
      !InitialRender2.current &&
      state.won &&
      state.start
    ) {
      if (state.playerEnteredRoom) {
        updateDocState({ won: "" });
        console.log("line 296", "doc updated");
      } else {
        console.log("dispatching on line 299");
        dispatch({ type: "SetStates", payload: { won: "" } });
      }
    } else if (!state.Routed && !InitialRender2.current && state.won) {
      if (state.playerEnteredRoom) {
        timeOut = setTimeout(() => {
          const temp = async () => {
            await deleteDoc(
              doc(db, "users", state.roomId || state.enterRoomId)
            ).then(() => {
              console.log("line 229");
              dispatch({
                type: "SetStates",
                payload: {
                  won: "",
                  sel: "Select size here",
                  playerEnteredRoom: false,
                  roomId: "",
                  enterRoomId: "",
                  enterRoom: false,
                  horizontalButtons: [],
                  verticalButtons: [],
                  squaresColors: [],
                  numberOfSquares: 0,
                  player1Score: 0,
                  player2Score: 0,
                  player: "1",
                  playerFixed: "1",
                  changesAdded: false,
                },
              });
            });
          };
          temp();
        }, [60000]);

        // dispatch({ type: "SetStates", payload: { won: "" } });
        // updateDocState({ won: "" });
        console.log("line 235", "doc updated");
      }
    }
    return () => {
      if (timeOut && !state.playerEnteredRoom) clearTimeout(timeOut);
    };
  }, [state.start, state.won]);

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
        <GridComponent />
      ) : state.sel === "Select size here" && state.won ? (
        <div>
          <br />
          <h3 className="result">{state.won}</h3>
        </div>
      ) : state.sel !== "Select size here" && state.won ? (
        ""
      ) : state?.playerEnteredRoom ? (
        <GridComponent />
      ) : state.enterRoom ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("line 314 newnavbar", state.enterRoomId);
            dispatch({
              type: "SetStates",
              payload: { playerEnteredRoom: true, playerFixed: "2" },
            });
            updateDocState({
              playerEnteredRoom: true,
            });
          }}
        >
          <input
            placeholder="Enter id"
            value={state.enterRoomId}
            onChange={(e) => {
              dispatch({
                type: "SetStates",
                payload: { enterRoomId: e.target.value },
              });
              // setEnterRoomId(e.target.value)
            }}
          />
          <Button variant="contained" type="submit">
            Enter room
          </Button>
        </form>
      ) : state.roomId || state.enterRoomId ? (
        <p>Creating Room</p>
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
                  row: 2,
                  col: 3,
                  ...obj,
                  sel: "2*3",
                  gridWidth: 320,
                  gridHeight: 240,
                },
              });
            }
            if (state.playerEnteredRoom)
              updateDocState({
                row: 2,
                col: 3,
                ...obj,
                sel: "2*3",
                gridWidth: 320,
                gridHeight: 240,
              });
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
