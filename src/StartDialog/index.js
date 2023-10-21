import Modal from "react-bootstrap/Modal";
import { useContext } from "react";
import { GridContext } from "../Contexts";
import GroupIcon from "@mui/icons-material/Group";
import {
  Grid,
  ListItemIcon,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ButtonSound2 from "../NewNavbar/ButtonSound/button1.mp3";
import "../NewNavbar/NewNavbar.css";

function VerticallyCenteredModal() {
  const { state, dispatch } = useContext(GridContext);
  const audio2 = new Audio(ButtonSound2);
  const onHide = () =>
    dispatch({ type: "SetStates", payload: { ...state, modalShow2: false } });
  const save = () => alert("Changes made successfully");
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

  return (
    <Modal
      show={state.modalShow2}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      style={{
        zIndex: "4000",
      }}
      centered
    >
      <Modal.Header onClick={onHide} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {/* <ListItemIcon
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
              color: "black",
            }}
          >
            <GroupIcon />
            Player Names
          </ListItemIcon> */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" title="Enter Name">
                Player 1:
              </Typography>
              <TextField
                value={state.player1Name}
                onChange={(e) =>
                  dispatch({
                    type: "SetStates",
                    payload: { player1Name: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" title="Enter Name">
                Player 2:
              </Typography>
              <TextField
                value={state.player2Name}
                onChange={(e) =>
                  dispatch({
                    type: "SetStates",
                    payload: { player2Name: e.target.value },
                  })
                }
              />
            </Grid>
          </Grid>
        </form>
        <br/>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap"}}>
          {state.enterRoom ? null : (
            <Button
              // sx={{
              //   display: { xs: "none", sm: "block" },
              //   overflow: "visible",
              // }}
              variant="contained"
              onClick={() => {
                onHide()
                const enterRoomId = uuidv4();
                checkDocs(enterRoomId).then((create) => {
                  if (create) {
                    dispatch({
                      type: "SetStates",
                      payload: { start: true, roomId: enterRoomId },
                    });
                  }
                  
                });
                alert("Select size to start creating room");
                audio2.play();
              }}
            >
              Create Room
            </Button>
          )}

          {state.roomId ? null : state.enterRoom ? null : (
            <Button
              // sx={{
              //   display: { xs: "none", sm: "block" },
              //   overflow: "visible",
              // }}
              variant="contained"
              onClick={() => {
                onHide()
                dispatch({
                  type: "SetStates",
                  payload: { enterRoom: true, sel: "Select size here" },
                });
                audio2.play();
                
              }}
            >
              Enter Room
            </Button>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={save}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default VerticallyCenteredModal;
