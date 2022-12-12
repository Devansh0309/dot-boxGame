import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useContext } from 'react';
import { GridContext } from "../Contexts";
import SettingsIcon from '@mui/icons-material/Settings';
import { ListItemIcon } from '@mui/material';

function MyVerticallyCenteredModal() {
    // const {modalShow,setModalShow}=useContext(GridContext)
    const {state,dispatch} = useContext(GridContext)

    const onHide=() => dispatch({type:'SetStates',payload:{...state,modalShow:false}})
    // setModalShow(false)
  return (
    <Modal
      show={state.modalShow} size="lg" aria-labelledby="contained-modal-title-vcenter" style={{
      zIndex:'1800'
    }}
      centered
      >
      <Modal.Header onClick={onHide} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        <ListItemIcon style={{display:'flex',alignItems:'center',gap:'3px',color:'black'}}>
          <SettingsIcon/>
          Options
        </ListItemIcon>
        
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default MyVerticallyCenteredModal;