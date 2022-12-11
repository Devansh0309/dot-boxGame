import LeftDrawer from "./NewNavbar/NewNavbar";
import Contexts from "./Contexts";
import SquareGrid from "./Square Grid Box/SquareGrid";
import { Route, Routes } from "react-router-dom";
import HowToPlay from "./AboutGame/HowToPlay";
import MyVerticallyCenteredModal from "./NewNavbar/OptionsDialogBox"
import NewNavbar from "./NewNavbar/NewNavbar";

function App() {
  return (
    <div className="App" style={{backgroundColor:'wheat',minHeight:'100vh'}}>
      <Routes>
      <Route path="/" element={<Contexts> <NewNavbar /><br /><MyVerticallyCenteredModal/><SquareGrid /></Contexts>}/>
      <Route path="/aboutgame" element={<Contexts><NewNavbar /><MyVerticallyCenteredModal/><HowToPlay/></Contexts>}/>       
      </Routes>
    </div>
  );
}
export default App;
