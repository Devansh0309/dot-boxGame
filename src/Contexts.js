import React, { useReducer, createContext } from "react";
import SquareSound from "./NewNavbar/ButtonSound/shortSuccess.mp3";
import { collection, doc, getDoc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
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
  row: states ? states.row : "0",
  col: states ? states.col : "0",
  Box: states ? states.Box : [],
  horizontalButtons: states ? states.horizontalButtons : [],
  verticalButtons: states ? states.verticalButtons : [],
  squaresColors: states ? states.squaresColors : [],
  numberOfSquares: states ? states.numberOfSquares : "0",
  player1Score: states ? states.player1Score : "0",
  player2Score: states ? states.player2Score : "0",
  player: states ? states.player : "1",
  player1Name: states ? states.player1Name : "Player 1",
  player2Name: states ? states.player2Name : "Player 2",
  won: states ? states.won : "",
  modalShow: states ? states.modalShow : false,
  modalShow2: states ? states.modalShow2 : true,
  start: states ? states.start : false,
  Routed: states ? states.Routed : false, //Routed means route changed
  roomId: states ? states.roomId : "",
  enterRoom: states ? states.enterRoom : false,
  playerEnteredRoom: states ? states.playerEnteredRoom : false,
  enterRoomId: states ? states.enterRoomId : "",
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
  if (state?.enterRoomId || state?.roomId) {
    console.log("line 64");
    let interval = setInterval(() => {
      let changes = [];
      const q = query(collection(db, "users"));
      const unsub2 = onSnapshot(
        q,
        (querySnapshot) => {
          changes = querySnapshot //changes is array of docs added or modified in collection
            .docChanges()
          
          let targetDoc  
          for(let i=0;i<changes.length;i++){
            // const idArr=changes[i]?.doc["_key"]?.path?.segments
            const id=changes[i].doc.id
            if(id===(state.roomId || state.enterRoomId)){
              targetDoc=changes[i].doc.data()
              break
            }
          }
          console.log("line 176",targetDoc,typeof targetDoc)
          dispatch({type: "SetStates",
          payload: targetDoc})
          console.log("line 180",changes) 
          // console.log("changes", changes[0].doc.data());
        },
        (error) => {
          console.log(error);
        },
        // unsub2()
      );
      return () => {
        unsub2();
        clearInterval(interval);
      };
    }, [30000]);
  }

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
            temp[id].squarecolor = "#eb5d5d";
          } else {
            temp[id].squarecolor = "#42c442";
          }
          const player = `player${state.player}Score`
          dispatch({
            type: "SetStates",
            payload: {
              [player]: state[player] + 1,
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares + 1,
            },
          });
          let updateDocState = async()=>{
            await updateDoc(doc(db, "users", state.enterRoomId || state.roomId),{
              [player]: state[player],
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares 
            }).then((res)=>{
              console.log(res,"updated")
            }).catch((err)=>{console.log(err)})
          }
          if(state.playerEnteredRoom) updateDocState()
          audio3.play();
        } else {
          dispatch({
            type: "SetStates",
            payload: { player: state.player === "1" ? "2" : "1" },
          });
          let updateDocState = async()=>{
            await updateDoc(doc(db, "users", state.enterRoomId || state.roomId),{
              player: state.player
            }).then((res)=>{
              console.log(res,"updated",state.player)
            }).catch((err)=>{console.log(err)})
          }
          if(state.playerEnteredRoom) updateDocState()
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
            temp[id - state.col].squarecolor = "#eb5d5d";
          } else {
            temp[id - state.col].squarecolor = "#42c442";
          }
          const player=`player${state.player}Score`
          dispatch({
            type: "SetStates",
            payload: {
              [player]: state[player] + 1,
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares + 1,
            },
          });
          let updateDocState = async()=>{
            await updateDoc(doc(db, "users", state.enterRoomId || state.roomId),{
              [player]: state[player],
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares 
            }).then((res)=>{
              console.log(res,"updated")
            }).catch((err)=>{console.log(err)})
          }
          if(state.playerEnteredRoom) updateDocState()
          audio3.play();
        } else {
          dispatch({
            type: "SetStates",
            payload: { player: state.player === "1" ? "2" : "1" },
          });
          let updateDocState = async()=>{
            await updateDoc(doc(db, "users", state.enterRoomId || state.roomId),{
              player: state.player
            }).then((res)=>{
              console.log(res,"updated",state.player)
            }).catch((err)=>{console.log(err)})
          }
          if(state.playerEnteredRoom) updateDocState()
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
            temp[id - state.col].squarecolor = "#eb5d5d";
          } else {
            temp[id - state.col].squarecolor = "#42c442";
          }
          const player=`player${state.player}Score`
          dispatch({
            type: "SetStates",
            payload: {
              [player]: state[player] + 1,
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares + 1,
            },
          });
          let updateDocState = async()=>{
            await updateDoc(doc(db, "users", state.enterRoomId || state.roomId),{
              [player]: state[player],
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares 
            }).then((res)=>{
              console.log(res,"updated")
            }).catch((err)=>{console.log(err)})
          }
          if(state.playerEnteredRoom) updateDocState()
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
            temp[id].squarecolor = "#eb5d5d";
          } else {
            temp[id].squarecolor = "#42c442";
          }
          const player=`player${state.player}Score`
          dispatch({
            type: "SetStates",
            payload: {
              [player]: state[player] + 1,
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares + 1,
            },
          });
          let updateDocState = async()=>{
            await updateDoc(doc(db, "users", state.enterRoomId || state.roomId),{
              [player]: state[player],
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares 
            }).then((res)=>{
              console.log(res,"updated")
            }).catch((err)=>{console.log(err)})
          }
          if(state.playerEnteredRoom) updateDocState()
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
            temp[id].squarecolor = "#eb5d5d";
            temp[id - state.col].squarecolor = "#eb5d5d";
          } else {
            temp[id].squarecolor = "#42c442";
            temp[id - state.col].squarecolor = "#42c442";
          }
          const player=`player${state.player}Score`
          dispatch({
            type: "SetStates",
            payload: {
              [player]: state[player] + 2,
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares + 2,
            },
          });
          let updateDocState = async()=>{
            await updateDoc(doc(db, "users", state.enterRoomId || state.roomId),{
              [player]: state[player],
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares 
            }).then((res)=>{
              console.log(res,"updated")
            }).catch((err)=>{console.log(err)})
          }
          if(state.playerEnteredRoom) updateDocState()
          audio3.play();
        } else {
          dispatch({
            type: "SetStates",
            payload: { player: state.player === "1" ? "2" : "1" },
          });
          let updateDocState = async()=>{
            await updateDoc(doc(db, "users", state.enterRoomId || state.roomId),{
              player: state.player
            }).then((res)=>{
              console.log(res,"updated",state.player)
            }).catch((err)=>{console.log(err)})
          }
          if(state.playerEnteredRoom) updateDocState()
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
            temp[id - Math.floor(id / (state.col + 1))].squarecolor = "#eb5d5d";
          } else {
            temp[id - Math.floor(id / (state.col + 1))].squarecolor = "#42c442";
          }
          audio3.play();
          const player=`player${state.player}Score`
          dispatch({
            type: "SetStates",
            payload: {
              [player]: state[player] + 1,
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares + 1,
            },
          });
          let updateDocState = async()=>{
            await updateDoc(doc(db, "users", state.enterRoomId || state.roomId),{
              [player]: state[player],
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares 
            }).then((res)=>{
              console.log(res,"updated")
            }).catch((err)=>{console.log(err)})
          }
          if(state.playerEnteredRoom) updateDocState()
        } else {
          dispatch({
            type: "SetStates",
            payload: { player: state.player === "1" ? "2" : "1" },
          });
          let updateDocState = async()=>{
            await updateDoc(doc(db, "users", state.enterRoomId || state.roomId),{
              player: state.player
            }).then((res)=>{
              console.log(res,"updated",state.player)
            }).catch((err)=>{console.log(err)})
          }
          if(state.playerEnteredRoom) updateDocState()
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
            temp[id - Math.ceil(id / (state.col + 1))].squarecolor = "#eb5d5d";
          } else {
            temp[id - Math.ceil(id / (state.col + 1))].squarecolor = "#42c442";
          }
          audio3.play();
          const player=`player${state.player}Score`
          dispatch({
            type: "SetStates",
            payload: {
              [player]: state[player] + 1,
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares + 1,
            },
          });
          let updateDocState = async()=>{
            await updateDoc(doc(db, "users", state.enterRoomId || state.roomId),{
              [player]: state[player],
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares 
            }).then((res)=>{
              console.log(res,"updated")
            }).catch((err)=>{console.log(err)})
          }
          if(state.playerEnteredRoom) updateDocState()
        } else {
          dispatch({
            type: "SetStates",
            payload: { player: state.player === "1" ? "2" : "1" },
          });
          let updateDocState = async()=>{
            await updateDoc(doc(db, "users", state.enterRoomId || state.roomId),{
              player: state.player
            }).then((res)=>{
              console.log(res,"updated",state.player)
            }).catch((err)=>{console.log(err)})
          }
          if(state.playerEnteredRoom) updateDocState()
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
            temp[id - Math.floor(id / (state.col + 1))].squarecolor = "#eb5d5d";
          } else {
            temp[id - Math.floor(id / (state.col + 1))].squarecolor = "#42c442";
          }
          audio3.play();
          const player=`player${state.player}Score`
          dispatch({
            type: "SetStates",
            payload: {
              [player]: state[player] + 1,
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares + 1,
            },
          });
          let updateDocState = async()=>{
            await updateDoc(doc(db, "users", state.enterRoomId || state.roomId),{
              [player]: state[player],
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares 
            }).then((res)=>{
              console.log(res,"updated")
            }).catch((err)=>{console.log(err)})
          }
          if(state.playerEnteredRoom) updateDocState()
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
            temp[id - Math.ceil(id / (state.col + 1))].squarecolor = "#eb5d5d";
          } else {
            temp[id - Math.ceil(id / (state.col + 1))].squarecolor = "#42c442";
          }
          audio3.play();
          const player=`player${state.player}Score`
          dispatch({
            type: "SetStates",
            payload: {
              [player]: state[player] + 1,
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares + 1,
            },
          });
          let updateDocState = async()=>{
            await updateDoc(doc(db, "users", state.enterRoomId || state.roomId),{
              [player]: state[player],
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares 
            }).then((res)=>{
              console.log(res,"updated")
            }).catch((err)=>{console.log(err)})
          }
          if(state.playerEnteredRoom) updateDocState()
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
            temp[id - Math.floor(id / (state.col + 1))].squarecolor = "#eb5d5d";
            temp[id - Math.ceil(id / (state.col + 1))].squarecolor = "#eb5d5d";
          } else {
            temp[id - Math.floor(id / (state.col + 1))].squarecolor = "#42c442";
            temp[id - Math.ceil(id / (state.col + 1))].squarecolor = "#42c442";
          }
          audio3.play();
          const player=`player${state.player}Score`
          dispatch({
            type: "SetStates",
            payload: {
              [player]: state[player] + 2,
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares + 2,
            },
          });
          let updateDocState = async()=>{
            await updateDoc(doc(db, "users", state.enterRoomId || state.roomId),{
              [player]: state[player],
              squaresColors: temp,
              numberOfSquares: state.numberOfSquares 
            }).then((res)=>{
              console.log(res,"updated")
            }).catch((err)=>{console.log(err)})
          }
          if(state.playerEnteredRoom) updateDocState()
        } else {
          dispatch({
            type: "SetStates",
            payload: { player: state.player === "1" ? "2" : "1" },
          });
          let updateDocState = async()=>{
            await updateDoc(doc(db, "users", state.enterRoomId || state.roomId),{
              player: state.player
            }).then((res)=>{
              console.log(res,"updated",state.player)
            }).catch((err)=>{console.log(err)})
          }
          if(state.playerEnteredRoom) updateDocState()
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
        temp[id].btncolor = "red";
      } else {
        temp[id].btncolor = "green";
      }
      dispatch({ type: "SetStates", payload: { horizontalButtons: temp } });
      let updateDocState = async()=>{
        await updateDoc(doc(db, "users", state.enterRoomId || state.roomId),{
          horizontalButtons: temp 
        }).then((res)=>{
          console.log(res,"updated")
        }).catch((err)=>{console.log(err)})
      }
      if(state.playerEnteredRoom) updateDocState()
      // setHorizontalButtons(temp)
      //or this?
      // setHorizontalButtons(...horizontalButtons,{key:id,type:'horizontal',isClicked:true})
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
        temp[id].btncolor = "red";
      } else {
        temp[id].btncolor = "green";
      }
      dispatch({ type: "SetStates", payload: { verticalButtons: temp } });
      let updateDocState = async()=>{
        await updateDoc(doc(db, "users", state.enterRoomId || state.roomId),{
          verticalButtons: temp
        }).then((res)=>{
          console.log(res,"updated")
        }).catch((err)=>{console.log(err)})
      }
      if(state.playerEnteredRoom) updateDocState()
      // setVerticalButtons(temp)
      //or this?
      // setHorizontalButtons(...horizontalButtons,{key:id,type:'horizontal',isClicked:true})
    }
  };
  return (
    <GridContext.Provider value={{ state, dispatch, areAllClicked, setClick }}>
      {props.children}
    </GridContext.Provider>
  );
}
export default Contexts;
