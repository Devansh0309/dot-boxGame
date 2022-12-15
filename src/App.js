import LeftDrawer from "./NewNavbar/NewNavbar";
import Contexts from "./Contexts";
import SquareGrid from "./Square Grid Box/SquareGrid";
import { Route, Routes } from "react-router-dom";
import HowToPlay from "./AboutGame/HowToPlay";
import MyVerticallyCenteredModal from "./NewNavbar/OptionsDialogBox"
import NewNavbar from "./NewNavbar/NewNavbar";
import Auth from "./Auth";
import Saves from './SavedGames/Saves'

function App() {
  return (
    <div className="App" style={{backgroundColor:'wheat',minHeight:'100vh'}}>
      <Routes>
      <Route path="/" element={<Contexts> <NewNavbar /><MyVerticallyCenteredModal/><SquareGrid /></Contexts>}/>
      <Route path="/aboutgame" element={<Contexts><NewNavbar /><MyVerticallyCenteredModal/><HowToPlay/></Contexts>}/>  
      <Route path="/signIn"  element={<Auth/>}/> 
      <Route path="/savedGames"  element={<Saves/>}/>
      </Routes>
    </div>
  );
}
export default App;
