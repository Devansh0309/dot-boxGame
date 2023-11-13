import Contexts from "./Contexts";
import SquareGrid from "./Square Grid Box/SquareGrid";
import { Route, Routes } from "react-router-dom";
import HowToPlay from "./AboutGame/HowToPlay";
// import Auth from "./Auth";
// import Saves from './SavedGames/Saves'
import VerticallyCenteredModal from './StartDialog/index'
import NewNavbar2 from "./NewNavbar/AboutNavbar";
import NewNavbar from "./NewNavbar/NewNavbar";
import Auth from "./Auth/index"

function App() {
  
  return (
    <div className="App" style={{
      minHeight:'100vh',minWidth:'100vw'}}>
      <Routes>
      <Route path="/" 
      element={<Contexts>
         <NewNavbar/>
         <VerticallyCenteredModal/>
         <SquareGrid />
        </Contexts>}/>
      <Route path="/aboutgame" 
      element={<Contexts>
        <NewNavbar2 />
        <HowToPlay/>
      </Contexts>}/>  
      <Route path="/signIn"  element={<Auth/>}/> 
      {/* <Route path="/savedGames"  element={<Saves/>}/> */}
      </Routes>
    </div>
  );
}
export default App;
