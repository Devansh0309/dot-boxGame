import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useContext } from 'react';
import { GridContext } from "../Contexts";
import GroupIcon from '@mui/icons-material/Group';
import { Grid, ListItemIcon, TextField,Typography } from '@mui/material';


function VerticallyCenteredModal() {

    const {state,dispatch} = useContext(GridContext)
    const onHide=() => dispatch({type:'SetStates',payload:{...state,modalShow2:false}})
    const save=()=> alert('Changes made successfully')

  return (
    <Modal
      show={state.modalShow2} size="lg" aria-labelledby="contained-modal-title-vcenter" style={{
      zIndex:'4000'
    }}
      centered
      >
      <Modal.Header onClick={onHide} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        <ListItemIcon style={{display:'flex',alignItems:'center',gap:'3px',color:'black'}}>
          <GroupIcon/>
          Player Names
        </ListItemIcon>
        
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Typography variant='h6' title='Enter Name'>Player 1:</Typography>
                <TextField value={state.player1Name} onChange={e=>dispatch({type:'SetStates',payload:{player1Name:e.target.value}})}/>
            </Grid>
            <Grid item  xs={12} sm={6}>
                <Typography variant='h6'  title='Enter Name'>Player 2:</Typography>
                <TextField value={state.player2Name}  onChange={e=>dispatch({type:'SetStates',payload:{player2Name:e.target.value}})}/>
            </Grid>
        </Grid>
        </form>
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={save}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default VerticallyCenteredModal;