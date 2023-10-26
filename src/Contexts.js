import React, { useReducer, createContext } from "react";
import SquareSound from "./NewNavbar/ButtonSound/shortSuccess.mp3";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import {
  collection,
  query,
  getDocs
} from "firebase/firestore";

export const GridContext = createContext();

const dataFromLocal =
  typeof window !== "undefined" && window.localStorage
    ? localStorage.getItem("states")
    : "{}";
const states = JSON.parse(dataFromLocal);

//States

// console.log("contexts line 8: ",states.sel)
const initialState = {
  sel: states ? states.sel : "Select size here",
  row: states ? states.row : 0,
  col: states ? states.col : 0,
  Box: states ? states.Box : [],
  horizontalButtons: states ? states.horizontalButtons : [],
  verticalButtons: states ? states.verticalButtons : [],
  squaresColors: states ? states.squaresColors : [],
  numberOfSquares: states ? states.numberOfSquares : 0,
  player1Score: states ? states.player1Score : 0,
  player2Score: states ? states.player2Score : 0,
  player: states ? states.player : "1",
  player1Name: states ? states.player1Name : "Player 1",
  player2Name: states ? states.player2Name : "Player 2",
  won: states ? states.won : "",
  modalShow: states ? states.modalShow : true,
  start: states ? states.start : false,
  Routed: states ? states.Routed : false, //Routed means route changed
  roomId: states ? states.roomId : "",
  enterRoom: states ? states.enterRoom : false,
  playerEnteredRoom: states ? states.playerEnteredRoom : false,
  enterRoomId: states ? states.enterRoomId : "",
  changesAdded: states ? states.changesAdded : false,
  gridWidth: states ? states.gridWidth : 0,
  gridHeight: states ? states.gridHeight : 0,
  playerFixed: states ? states.playerFixed : "1",
  alertForHome : states? states.alertForHome : {},
  playerRequesting: states? states.playerRequesting : "",
  changeGame: states? states.changeGame : false,
  player1Live: states? states.player1Live : false
};
function reducer(state, action) {
  // console.log("line 34 in context",state)
  switch (action.type) {
    // case 'SaveGame':
    //     localStorage.setItem('saves',JSON.stringify(action.payload))
    //     return{
    //         user:action.payload
    //     }
    case "SetStates":
      localStorage.setItem(
        "states",
        JSON.stringify({ ...state, ...action.payload })
      );
      // console.log("contexts line 38: ",states.sel)
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}
function Contexts(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const audio3 = new Audio(SquareSound);
  //Functions
  const updateDocState = async (obj) => {
    await updateDoc(doc(db, "users", state.enterRoomId || state.roomId), obj)
      .then((res) => {
        console.log(res, "updated");
      })
      .catch((err) => {
        alert("Room does not exits, again enter room id");
        console.log(err);
      });
  };
  const areAllClicked = (id, type) => {
    //type:'vertical' or 'horizontal'
    // id : key of buttons
    //put square formed function in dotsAndDashes.java
    // console.log('Inside areAllClicked')

    if (type === "horizontal") {
      if (Math.floor(id / state.col) === 0) {
        if (
          state.horizontalButtons[id].isClicked &&
          state.horizontalButtons[id + state.col].isClicked &&
          state.verticalButtons[id].isClicked &&
          state.verticalButtons[id + 1].isClicked
        ) {
          let temp = [...state.squaresColors];
          temp[id].allClicked = true;
          temp[id].active = true;
          for (let i = 0; i < temp.length; i++) {
            if (i !== id) {
              temp[i].active = false;
            }
          }
          if (state.player === "1") {
            temp[id].squarecolor = "red";
          } else {
            temp[id].squarecolor = "green";
          }
          const player = `player${state.player}Score`;
          const playerScore = state[player];
          const noOfSquares = state.numberOfSquares;
          console.log("line 130 ", state[player], state.numberOfSquares);
          dispatch({
            type: "SetStates",
            payload: {
              [player]: state[player] + 1,
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares + 1,
            },
          });
          console.log("line 138 ", state[player], state.numberOfSquares);
          if (state.playerEnteredRoom)
            updateDocState({
              [player]: playerScore + 1,
              squaresColors: temp,
              numberOfSquares: noOfSquares + 1,
            });
          audio3.play();
        } else {
          const playerChance = state.player === "1" ? "2" : "1";
          dispatch({
            type: "SetStates",
            payload: { player: state.player === "1" ? "2" : "1" },
          });

          if (state.playerEnteredRoom) {
            updateDocState({ player: playerChance });
          }
        }
      } else if (Math.floor(id / state.col) === state.row) {
        if (
          state.horizontalButtons[id - state.col].isClicked &&
          state.horizontalButtons[id].isClicked &&
          state.verticalButtons[id - state.col + state.row - 1].isClicked &&
          state.verticalButtons[id - state.col + state.row].isClicked
        ) {
          let temp = [...state.squaresColors];
          temp[id - state.col].allClicked = true;
          temp[id - state.col].active = true;
          for (let i = 0; i < temp.length; i++) {
            if (i !== id - state.col) {
              temp[i].active = false;
            }
          }
          if (state.player === "1") {
            temp[id - state.col].squarecolor = "red";
          } else {
            temp[id - state.col].squarecolor = "green";
          }
          const player = `player${state.player}Score`;
          const playerScore = state[player];
          const noOfSquares = state.numberOfSquares;
          dispatch({
            type: "SetStates",
            payload: {
              [player]: state[player] + 1,
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares + 1,
            },
          });
          if (state.playerEnteredRoom)
            updateDocState({
              [player]: playerScore + 1,
              squaresColors: temp,
              numberOfSquares: noOfSquares + 1,
            });
          audio3.play();
        } else {
          const playerChance = state.player === "1" ? "2" : "1";
          dispatch({
            type: "SetStates",
            payload: { player: state.player === "1" ? "2" : "1" },
          });

          if (state.playerEnteredRoom) {
            updateDocState({ player: playerChance });
          }
        }
      } else {
        if (
          state.horizontalButtons[id - state.col].isClicked &&
          state.horizontalButtons[id].isClicked &&
          state.verticalButtons[id - state.col + Math.floor(id / state.col) - 1]
            .isClicked &&
          state.verticalButtons[id - state.col + Math.floor(id / state.col)]
            .isClicked &&
          (!state.horizontalButtons[id].isClicked ||
            !state.horizontalButtons[id + state.col].isClicked ||
            !state.verticalButtons[id + Math.floor(id / state.col)].isClicked ||
            !state.verticalButtons[id + Math.floor(id / state.col) + 1]
              .isClicked)
        ) {
          //first row upper btn id provided
          let temp = [...state.squaresColors];
          temp[id - state.col].allClicked = true;
          temp[id - state.col].active = true;
          for (let i = 0; i < temp.length; i++) {
            if (i !== id - state.col) {
              temp[i].active = false;
            }
          }
          if (state.player === "1") {
            temp[id - state.col].squarecolor = "red";
          } else {
            temp[id - state.col].squarecolor = "green";
          }
          const player = `player${state.player}Score`;
          const playerScore = state[player];
          const noOfSquares = state.numberOfSquares;
          dispatch({
            type: "SetStates",
            payload: {
              [player]: state[player] + 1,
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares + 1,
            },
          });
          if (state.playerEnteredRoom)
            updateDocState({
              [player]: playerScore + 1,
              squaresColors: temp,
              numberOfSquares: noOfSquares + 1,
            });
          audio3.play();
        } else if (
          (!state.horizontalButtons[id - state.col].isClicked ||
            !state.horizontalButtons[id].isClicked ||
            !state.verticalButtons[
              id - state.col + Math.floor(id / state.col) - 1
            ].isClicked ||
            !state.verticalButtons[id - state.col + Math.floor(id / state.col)]
              .isClicked) &&
          state.horizontalButtons[id].isClicked &&
          state.horizontalButtons[id + state.col].isClicked &&
          state.verticalButtons[id + Math.floor(id / state.col)].isClicked &&
          state.verticalButtons[id + Math.floor(id / state.col) + 1].isClicked
        ) {
          //last row lower btn id provided
          let temp = [...state.squaresColors];
          temp[id].allClicked = true;
          temp[id].active = true;
          for (let i = 0; i < temp.length; i++) {
            if (i !== id) {
              temp[i].active = false;
            }
          }
          if (state.player === "1") {
            temp[id].squarecolor = "red";
          } else {
            temp[id].squarecolor = "green";
          }
          const player = `player${state.player}Score`;
          const playerScore = state[player];
          const noOfSquares = state.numberOfSquares;
          dispatch({
            type: "SetStates",
            payload: {
              [player]: state[player] + 1,
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares + 1,
            },
          });
          if (state.playerEnteredRoom)
            updateDocState({
              [player]: playerScore + 1,
              squaresColors: temp,
              numberOfSquares: noOfSquares + 1,
            });
          audio3.play();
        } else if (
          state.horizontalButtons[id - state.col].isClicked &&
          state.horizontalButtons[id].isClicked &&
          state.verticalButtons[id - state.col + Math.floor(id / state.col) - 1]
            .isClicked &&
          state.verticalButtons[id - state.col + Math.floor(id / state.col)]
            .isClicked &&
          state.horizontalButtons[id].isClicked &&
          state.horizontalButtons[id + state.col].isClicked &&
          state.verticalButtons[id + Math.floor(id / state.col)].isClicked &&
          state.verticalButtons[id + Math.floor(id / state.col) + 1].isClicked
        ) {
          //middle row (not first and not last) btn id provided
          let temp = [...state.squaresColors];
          temp[id].allClicked = true;
          temp[id - state.col].allClicked = true;
          temp[id].active = true;
          temp[id - state.col].active = true;
          for (let i = 0; i < temp.length; i++) {
            if (i !== id && i !== id - state.col) {
              temp[i].active = false;
            }
          }
          if (state.player === "1") {
            temp[id].squarecolor = "red";
            temp[id - state.col].squarecolor = "red";
          } else {
            temp[id].squarecolor = "green";
            temp[id - state.col].squarecolor = "green";
          }
          const player = `player${state.player}Score`;
          const playerScore = state[player];
          const noOfSquares = state.numberOfSquares;
          dispatch({
            type: "SetStates",
            payload: {
              [player]: state[player] + 2,
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares + 2,
            },
          });
          if (state.playerEnteredRoom)
            updateDocState({
              [player]: playerScore + 2,
              squaresColors: temp,
              numberOfSquares: noOfSquares + 2,
            });
          audio3.play();
        } else {
          const playerChance = state.player === "1" ? "2" : "1";
          dispatch({
            type: "SetStates",
            payload: { player: state.player === "1" ? "2" : "1" },
          });

          if (state.playerEnteredRoom) {
            updateDocState({ player: playerChance });
          }
        }
      }
    } else {
      if (id % (state.col + 1) === 0) {
        //first column left vertical btn id provided
        if (
          state.horizontalButtons[id - Math.floor(id / (state.col + 1))]
            .isClicked &&
          state.horizontalButtons[
            id - Math.floor(id / (state.col + 1)) + state.col
          ].isClicked &&
          state.verticalButtons[id].isClicked &&
          state.verticalButtons[id + 1].isClicked
        ) {
          let temp = [...state.squaresColors];
          temp[id - Math.floor(id / (state.col + 1))].allClicked = true;
          temp[id - Math.floor(id / (state.col + 1))].active = true;
          for (let i = 0; i < temp.length; i++) {
            if (i !== id - Math.floor(id / (state.col + 1))) {
              temp[i].active = false;
            }
          }
          if (state.player === "1") {
            temp[id - Math.floor(id / (state.col + 1))].squarecolor = "red";
          } else {
            temp[id - Math.floor(id / (state.col + 1))].squarecolor = "green";
          }
          audio3.play();
          const player = `player${state.player}Score`;
          const playerScore = state[player];
          const noOfSquares = state.numberOfSquares;
          dispatch({
            type: "SetStates",
            payload: {
              [player]: state[player] + 1,
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares + 1,
            },
          });
          if (state.playerEnteredRoom)
            updateDocState({
              [player]: playerScore + 1,
              squaresColors: temp,
              numberOfSquares: noOfSquares + 1,
            });
        } else {
          const playerChance = state.player === "1" ? "2" : "1";
          dispatch({
            type: "SetStates",
            payload: { player: state.player === "1" ? "2" : "1" },
          });

          if (state.playerEnteredRoom) {
            updateDocState({ player: playerChance });
          }
        }
      } else if (id % (state.col + 1) === state.col) {
        //last column right vertical btn id provided
        if (
          state.horizontalButtons[id - Math.ceil(id / (state.col + 1))]
            .isClicked &&
          state.horizontalButtons[
            id + state.col - Math.ceil(id / (state.col + 1))
          ].isClicked &&
          state.verticalButtons[id - 1].isClicked &&
          state.verticalButtons[id].isClicked
        ) {
          let temp = [...state.squaresColors];
          temp[id - Math.ceil(id / (state.col + 1))].allClicked = true;
          temp[id - Math.ceil(id / (state.col + 1))].active = true;
          for (let i = 0; i < temp.length; i++) {
            if (i !== id - Math.ceil(id / (state.col + 1))) {
              temp[i].active = false;
            }
          }
          if (state.player === "1") {
            temp[id - Math.ceil(id / (state.col + 1))].squarecolor = "red";
          } else {
            temp[id - Math.ceil(id / (state.col + 1))].squarecolor = "green";
          }
          audio3.play();
          const player = `player${state.player}Score`;
          const playerScore = state[player];
          const noOfSquares = state.numberOfSquares;
          dispatch({
            type: "SetStates",
            payload: {
              [player]: state[player] + 1,
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares + 1,
            },
          });
          if (state.playerEnteredRoom)
            updateDocState({
              [player]: playerScore + 1,
              squaresColors: temp,
              numberOfSquares: noOfSquares + 1,
            });
        } else {
          const playerChance = state.player === "1" ? "2" : "1";
          dispatch({
            type: "SetStates",
            payload: { player: state.player === "1" ? "2" : "1" },
          });

          if (state.playerEnteredRoom) {
            updateDocState({ player: playerChance });
          }
        }
      } else {
        //middle column (not first and not last) btn id provided
        if (
          state.horizontalButtons[id - Math.floor(id / (state.col + 1))]
            .isClicked &&
          state.horizontalButtons[
            id + state.col - Math.floor(id / (state.col + 1))
          ].isClicked &&
          state.verticalButtons[id].isClicked &&
          state.verticalButtons[id + 1].isClicked &&
          (!state.horizontalButtons[id - Math.ceil(id / (state.col + 1))]
            .isClicked ||
            !state.horizontalButtons[
              id + state.col - Math.ceil(id / (state.col + 1))
            ].isClicked ||
            !state.verticalButtons[id - 1].isClicked ||
            !state.verticalButtons[id].isClicked)
        ) {
          //first row upper btn id provided
          let temp = [...state.squaresColors];
          temp[id - Math.floor(id / (state.col + 1))].allClicked = true;
          temp[id - Math.floor(id / (state.col + 1))].active = true;
          for (let i = 0; i < temp.length; i++) {
            if (i !== id - Math.floor(id / (state.col + 1))) {
              temp[i].active = false;
            }
          }
          if (state.player === "1") {
            temp[id - Math.floor(id / (state.col + 1))].squarecolor = "red";
          } else {
            temp[id - Math.floor(id / (state.col + 1))].squarecolor = "green";
          }
          audio3.play();
          const player = `player${state.player}Score`;
          const playerScore = state[player];
          const noOfSquares = state.numberOfSquares;
          dispatch({
            type: "SetStates",
            payload: {
              [player]: state[player] + 1,
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares + 1,
            },
          });
          if (state.playerEnteredRoom)
            updateDocState({
              [player]: playerScore + 1,
              squaresColors: temp,
              numberOfSquares: noOfSquares + 1,
            });
        } else if (
          (!state.horizontalButtons[id - Math.floor(id / (state.col + 1))]
            .isClicked ||
            !state.horizontalButtons[
              id + state.col - Math.floor(id / (state.col + 1))
            ].isClicked ||
            !state.verticalButtons[id].isClicked ||
            !state.verticalButtons[id + 1].isClicked) &&
          state.horizontalButtons[id - Math.ceil(id / (state.col + 1))]
            .isClicked &&
          state.horizontalButtons[
            id + state.col - Math.ceil(id / (state.col + 1))
          ].isClicked &&
          state.verticalButtons[id - 1].isClicked &&
          state.verticalButtons[id].isClicked
        ) {
          //last row lower btn id provided
          let temp = [...state.squaresColors];
          temp[id - Math.ceil(id / (state.col + 1))].allClicked = true;
          temp[id - Math.ceil(id / (state.col + 1))].active = true;
          for (let i = 0; i < temp.length; i++) {
            if (i !== id - Math.ceil(id / (state.col + 1))) {
              temp[i].active = false;
            }
          }
          if (state.player === "1") {
            temp[id - Math.ceil(id / (state.col + 1))].squarecolor = "red";
          } else {
            temp[id - Math.ceil(id / (state.col + 1))].squarecolor = "green";
          }
          audio3.play();
          const player = `player${state.player}Score`;
          const playerScore = state[player];
          const noOfSquares = state.numberOfSquares;
          dispatch({
            type: "SetStates",
            payload: {
              [player]: state[player] + 1,
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares + 1,
            },
          });
          if (state.playerEnteredRoom)
            updateDocState({
              [player]: playerScore + 1,
              squaresColors: temp,
              numberOfSquares: noOfSquares + 1,
            });
        } else if (
          state.horizontalButtons[id - Math.floor(id / (state.col + 1))]
            .isClicked &&
          state.horizontalButtons[
            id + state.col - Math.floor(id / (state.col + 1))
          ].isClicked &&
          state.verticalButtons[id].isClicked &&
          state.verticalButtons[id + 1].isClicked &&
          state.horizontalButtons[id - Math.ceil(id / (state.col + 1))]
            .isClicked &&
          state.horizontalButtons[
            id + state.col - Math.ceil(id / (state.col + 1))
          ].isClicked &&
          state.verticalButtons[id - 1].isClicked &&
          state.verticalButtons[id].isClicked
        ) {
          //middle row (not first and not last) btn id provided
          let temp = [...state.squaresColors];
          temp[id - Math.floor(id / (state.col + 1))].allClicked = true;
          temp[id - Math.ceil(id / (state.col + 1))].allClicked = true;
          temp[id - Math.floor(id / (state.col + 1))].active = true;
          temp[id - Math.ceil(id / (state.col + 1))].active = true;
          for (let i = 0; i < temp.length; i++) {
            if (
              i !== id - Math.floor(id / (state.col + 1)) &&
              i !== id - Math.ceil(id / (state.col + 1))
            ) {
              temp[i].active = false;
            }
          }
          if (state.player === "1") {
            temp[id - Math.floor(id / (state.col + 1))].squarecolor = "red";
            temp[id - Math.ceil(id / (state.col + 1))].squarecolor = "red";
          } else {
            temp[id - Math.floor(id / (state.col + 1))].squarecolor = "green";
            temp[id - Math.ceil(id / (state.col + 1))].squarecolor = "green";
          }
          audio3.play();
          const player = `player${state.player}Score`;
          const playerScore = state[player];
          const noOfSquares = state.numberOfSquares;
          dispatch({
            type: "SetStates",
            payload: {
              [player]: state[player] + 2,
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares + 2,
            },
          });
          if (state.playerEnteredRoom)
            updateDocState({
              [player]: playerScore + 2,
              squaresColors: temp,
              numberOfSquares: noOfSquares + 2,
            });
        } else {
          const playerChance = state.player === "1" ? "2" : "1";
          dispatch({
            type: "SetStates",
            payload: { player: state.player === "1" ? "2" : "1" },
          });

          if (state.playerEnteredRoom) {
            updateDocState({ player: playerChance });
          }
        }
      }
    }
  };
  const setClick = (id, type) => {
    // console.log('Inside setClick')
    if (type === "horizontal") {
      let temp = [...state.horizontalButtons];
      let temp2 = [...state.verticalButtons];
      temp[id].isClicked = true;
      temp[id].active = true;
      for (let i = 0; i < temp.length; i++) {
        if (i !== id) {
          temp[i].active = false;
        }
      }
      for (let i = 0; i < temp2.length; i++) {
        temp2[i].active = false;
      }
      if (state.player === "1") {
        temp[id].btncolor = "#eb5d5d";
        // red
      } else {
        temp[id].btncolor = "#42c442";
        // green
      }
      dispatch({ type: "SetStates", payload: { horizontalButtons: temp } });
      if (state.playerEnteredRoom)
        updateDocState({
          horizontalButtons: temp,
        });
    } else {
      let temp = [...state.verticalButtons];
      let temp2 = [...state.horizontalButtons];
      temp[id].isClicked = true;
      temp[id].active = true;
      for (let i = 0; i < temp.length; i++) {
        if (i !== id) {
          temp[i].active = false;
        }
      }
      for (let i = 0; i < temp2.length; i++) {
        temp2[i].active = false;
      }
      if (state.player === "1") {
        temp[id].btncolor = "#eb5d5d";
      } else {
        temp[id].btncolor = "#42c442";
      }
      dispatch({ type: "SetStates", payload: { verticalButtons: temp } });
      if (state.playerEnteredRoom)
        updateDocState({
          verticalButtons: temp,
        });
    }
  };
  const checkDocs = async (enterRoomId) => {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    console.log("line 129", querySnapshot);
    if (querySnapshot.docs.length === 10) {
      //max 10 rooms allowed at a time in db
      alert("Wait for rooms to be available, try after some time!");
      return false;
    }
    querySnapshot.forEach((doc) => {
      console.log("line 135", doc);
      // doc.data() is never undefined for query doc snapshots
      if (doc.id === enterRoomId) {
        alert("Room already exits and is filled, again create room");
        return false;
      }
    });
    return true;
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

  return (
    <GridContext.Provider value={{ state, dispatch, areAllClicked, setClick, updateDocState, checkDocs, setStatesAfterSel }}>
      {props.children}
    </GridContext.Provider>
  );
}
export default Contexts;
