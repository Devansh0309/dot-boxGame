<<<<<<< HEAD
import LeftDrawer from "./Drawer";
import Contexts from "./Contexts";
import SquareGrid from "./SquareGrid";
import { Route, Routes } from "react-router-dom";
import HowToPlay from "./AboutGame/HowToPlay";
=======
import LeftDrawer from './Drawer';
import Contexts from './Contexts';
import SquareGrid from './SquareGrid';
import MyVerticallyCenteredModal from './OptionsDialogBox';
>>>>>>> fe5d2bd418721653380df29769707ceffb8b983b


function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<Contexts> <LeftDrawer /><br /><SquareGrid /></Contexts>}/>
          <Route path="/aboutgame" element={<Contexts><LeftDrawer /><HowToPlay/></Contexts>}/>

           
       
      </Routes>
=======
      <Contexts>
        <LeftDrawer/>
        <br/>
        <MyVerticallyCenteredModal/>
        <SquareGrid/>
      </Contexts>
>>>>>>> fe5d2bd418721653380df29769707ceffb8b983b
    </div>
  );
}
export default App;
