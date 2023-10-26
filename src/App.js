import Contexts from "./Contexts";
import SquareGrid from "./Square Grid Box/SquareGrid";
import { Route, Routes } from "react-router-dom";
import HowToPlay from "./AboutGame/HowToPlay";
import MyVerticallyCenteredModal from "./NewNavbar/OptionsDialogBox"
// import Auth from "./Auth";
// import Saves from './SavedGames/Saves'
import VerticallyCenteredModal from './StartDialog/index'
import NewNavbar2 from "./NewNavbar/AboutNavbar";
import NewNavbar from "./NewNavbar/NewNavbar";

function App() {
  
  return (
    <div className="App" style={{
      height:'100vh',width:'100vw'}}>
      <Routes>
      <Route path="/" 
      element={<Contexts>
         <NewNavbar/>
         <VerticallyCenteredModal/>
         <MyVerticallyCenteredModal/>
         <SquareGrid />
        </Contexts>}/>
      <Route path="/aboutgame" 
      element={<Contexts>
        <NewNavbar2 />
        <MyVerticallyCenteredModal/>
        <HowToPlay/>
      </Contexts>}/>  
      {/* <Route path="/signIn"  element={<Auth/>}/> 
      <Route path="/savedGames"  element={<Saves/>}/> */}
      </Routes>
    </div>
  );
}
export default App;
