import Modal from "react-bootstrap/Modal";
import { useContext } from "react";
import { GridContext } from "../Contexts";
import {
  Grid,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import ButtonSound2 from "../NewNavbar/ButtonSound/button1.mp3";
import "../NewNavbar/NewNavbar.css";

function VerticallyCenteredModal() {
  const { state, dispatch, updateDocState, checkDocs } = useContext(GridContext);
  const audio2 = new Audio(ButtonSound2);
  const onHide = () =>
    dispatch({ type: "SetStates", payload: { modalShow: false } });
  const save = () => alert("Changes made successfully");
  
  return (
    <Modal
      show={state.modalShow}
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
          {(state.roomId || state.playerEnteredRoom) ? (
            state.playerFixed === "1" ? (
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
            ) : (
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
            )
          ) : (
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
          )}
        </form>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {state.roomId ? null :state.enterRoom ? null : (
            <Button
              // sx={{
              //   display: { xs: "none", sm: "block" },
              //   overflow: "visible",
              // }}
              variant="contained"
              onClick={() => {
                onHide();
                const enterRoomId = uuidv4();
                checkDocs(enterRoomId).then((create) => {
                  if (create) {
                    dispatch({
                      type: "SetStates",
                      payload: { start: true, roomId: enterRoomId, modalShow:true },
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
                onHide();
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
        <Button onClick={()=>{
          if(state.playerEnteredRoom){
            updateDocState({
              player2Name: state.player2Name
            });
          }
          save()
        }}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default VerticallyCenteredModal;
