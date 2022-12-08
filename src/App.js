import LeftDrawer from "./Drawer";
import Contexts from "./Contexts";
import SquareGrid from "./SquareGrid";
import { Route, Routes } from "react-router-dom";
import HowToPlay from "./AboutGame/HowToPlay";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Contexts> <LeftDrawer /><br /><SquareGrid /></Contexts>}/>
          <Route path="/aboutgame" element={<Contexts><LeftDrawer /><HowToPlay/></Contexts>}/>

           
       
      </Routes>
    </div>
  );
}
export default App;
